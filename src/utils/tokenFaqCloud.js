import { supabase } from "./supabaseClient";
import { TOKEN_FAQS } from "../data/tokenFaqData";

/**
 * Fetch all Token FAQs from Supabase ordered by sort_order.
 * Falls back to static TOKEN_FAQS if the table is unavailable or empty.
 */
export async function pullTokenFaqsFromCloud() {
  try {
    const { data, error } = await supabase
      .from("token_faqs")
      .select("id, question, answer, question_te, answer_te, sort_order, is_active, created_at, updated_at")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Could not fetch token FAQs from cloud:", error.message);
      return {
        success: false,
        faqs: TOKEN_FAQS.map((f, idx) => ({
          id: f.id,
          question: f.question,
          questionTe: f.questionTe || "",
          answer: f.answer,
          answerTe: f.answerTe || "",
          sortOrder: idx + 1,
          isActive: true
        })),
        message: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        success: true,
        faqs: TOKEN_FAQS.map((f, idx) => ({
          id: f.id,
          question: f.question,
          questionTe: f.questionTe || "",
          answer: f.answer,
          answerTe: f.answerTe || "",
          sortOrder: idx + 1,
          isActive: true
        })),
        isFallback: true,
      };
    }

    const validData = data.filter(
      (item) =>
        item.id !== "brahmotsavam-pause" &&
        !item.question?.toLowerCase().includes("brahmotsavam")
    );

    const cloudMap = new Map(
      validData.map((item, index) => [
        item.id,
        {
          id: item.id,
          question:
            item.id === "dd-token-meaning"
              ? "What does DD mean?"
              : item.question,
          questionTe:
            item.id === "dd-token-meaning"
              ? "DD అంటే ఏమిటి?"
              : item.question_te || "",
          answer: item.answer,
          answerTe: item.answer_te || "",
          sortOrder: item.sort_order ?? index + 1,
          isActive: item.is_active !== false,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        },
      ])
    );

    const resultFaqs = [...cloudMap.values()];

    // Merge any canonical baseline FAQs that are not yet in the cloud database
    TOKEN_FAQS.forEach((baselineFaq, baselineIndex) => {
      if (!cloudMap.has(baselineFaq.id)) {
        let insertIndex = -1;
        for (let i = baselineIndex - 1; i >= 0; i--) {
          const prevId = TOKEN_FAQS[i].id;
          const foundIdx = resultFaqs.findIndex((f) => f.id === prevId);
          if (foundIdx !== -1) {
            insertIndex = foundIdx + 1;
            break;
          }
        }

        const newFaq = {
          id: baselineFaq.id,
          question: baselineFaq.question,
          questionTe: baselineFaq.questionTe || "",
          answer: baselineFaq.answer,
          answerTe: baselineFaq.answerTe || "",
          sortOrder: baselineIndex + 1,
          isActive: true,
        };

        if (insertIndex !== -1) {
          resultFaqs.splice(insertIndex, 0, newFaq);
        } else {
          resultFaqs.push(newFaq);
        }
      }
    });

    return {
      success: true,
      faqs: resultFaqs,
    };
  } catch (err) {
    console.warn("Exception pulling token FAQs from cloud:", err);
    return {
      success: false,
      faqs: TOKEN_FAQS.map((f, idx) => ({
        id: f.id,
        question: f.question,
        questionTe: f.questionTe || "",
        answer: f.answer,
        answerTe: f.answerTe || "",
        sortOrder: idx + 1,
        isActive: true
      })),
      message: err.message,
    };
  }
}

/**
 * Insert or update a single Token FAQ in Supabase.
 * Requires authenticated admin session.
 */
export async function saveTokenFaqToCloud(faq) {
  if (!faq || !faq.id) {
    return {
      success: false,
      message: "FAQ data with a valid ID is required.",
    };
  }

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error("Admin authentication session not found. Please log in again.");
    }

    const payload = {
      id: faq.id,
      question: faq.question || "",
      question_te: faq.questionTe || faq.question_te || "",
      answer: faq.answer || "",
      answer_te: faq.answerTe || faq.answer_te || "",
      sort_order: faq.sortOrder ?? faq.sort_order ?? 1,
      is_active: faq.isActive !== false && faq.is_active !== false,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("token_faqs")
      .upsert(payload, { onConflict: "id" })
      .select();

    if (error) {
      console.error("Supabase token FAQ save error:", error);
      throw new Error(error.message || "Supabase token FAQ save failed.");
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("saveTokenFaqToCloud error:", err);
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * Delete a Token FAQ from Supabase by ID.
 * Requires authenticated admin session.
 */
export async function deleteTokenFaqFromCloud(id) {
  if (!id) {
    return {
      success: false,
      message: "FAQ ID is required for deletion.",
    };
  }

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error("Admin authentication session not found. Please log in again.");
    }

    const { error } = await supabase
      .from("token_faqs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase token FAQ delete error:", error);
      throw new Error(error.message || "Supabase token FAQ delete failed.");
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error("deleteTokenFaqFromCloud error:", err);
    return {
      success: false,
      message: err.message,
    };
  }
}

/**
 * Persist the ordering and status of an entire array of Token FAQs to Supabase.
 * Updates sort_order and is_active for each item.
 */
export async function saveTokenFaqOrderToCloud(faqs) {
  if (!Array.isArray(faqs)) {
    return {
      success: false,
      message: "An array of FAQs is required.",
    };
  }

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error("Admin authentication session not found. Please log in again.");
    }

    const updates = faqs.map((faq, index) => ({
      id: faq.id,
      question: faq.question || "",
      question_te: faq.questionTe || faq.question_te || "",
      answer: faq.answer || "",
      answer_te: faq.answerTe || faq.answer_te || "",
      sort_order: index + 1,
      is_active: faq.isActive !== false && faq.is_active !== false,
      updated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("token_faqs")
      .upsert(updates, { onConflict: "id" })
      .select();

    if (error) {
      console.error("Supabase token FAQ order save error:", error);
      throw new Error(error.message || "Supabase token FAQ order update failed.");
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("saveTokenFaqOrderToCloud error:", err);
    return {
      success: false,
      message: err.message,
    };
  }
}
