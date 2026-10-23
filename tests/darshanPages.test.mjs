import assert from 'node:assert';
import {
  DARSHAN_TOPICS,
  DARSHAN_CATEGORIES,
  ALL_DARSHAN_SLUGS,
  getDarshanTopic
} from '../src/data/darshanTopics.js';
import { getRouteMetadata, SITE_ORIGIN } from '../src/utils/seoMetadata.js';
import { buildRouteStructuredData } from '../src/utils/structuredData.js';

console.log('--- Starting Darshan Pages Automated Verification ---');

// Test 1: Category registry integrity
assert(Array.isArray(DARSHAN_CATEGORIES), 'DARSHAN_CATEGORIES must be an array');
assert(DARSHAN_CATEGORIES.length >= 7, 'DARSHAN_CATEGORIES must include at least 7 categories');
console.log('✓ Category registry verified');

// Test 2: All 20 topics exist and have mandatory fields
const topicKeys = Object.keys(DARSHAN_TOPICS);
assert(topicKeys.length >= 20, `Expected at least 20 topics, found ${topicKeys.length}`);

for (const key of topicKeys) {
  const topic = DARSHAN_TOPICS[key];
  assert(topic.slug, `Topic ${key} must have a slug`);
  assert(topic.titleEn && topic.titleTe, `Topic ${key} must have bilingual titles`);
  assert(topic.subtitleEn && topic.subtitleTe, `Topic ${key} must have bilingual subtitles`);
  assert(topic.badgeEn && topic.badgeTe, `Topic ${key} must have bilingual badges`);
  assert(topic.cost, `Topic ${key} must have a cost value`);
  assert(topic.bookingModeEn, `Topic ${key} must have bookingModeEn`);
  assert(topic.bookingChannelEn, `Topic ${key} must have bookingChannelEn`);
  assert(topic.avgWaitTime, `Topic ${key} must have avgWaitTime`);
  assert(topic.reportingPointEn && topic.reportingPointTe, `Topic ${key} must have reporting points`);
  assert(topic.overviewEn && topic.overviewTe, `Topic ${key} must have overview`);
  assert(Array.isArray(topic.howToBook) && topic.howToBook.length >= 3, `Topic ${key} must have >= 3 booking steps`);
  const hasEligibility = (Array.isArray(topic.eligibility) && topic.eligibility.length >= 1) ||
                         (Array.isArray(topic.eligibilityTable) && topic.eligibilityTable.length >= 1);
  assert(hasEligibility, `Topic ${key} must have eligibility rules or eligibilityTable`);
  assert(Array.isArray(topic.mandatoryDocs) && topic.mandatoryDocs.length >= 1, `Topic ${key} must have mandatoryDocs`);
  assert(Array.isArray(topic.faqs) && topic.faqs.length >= 2, `Topic ${key} must have >= 2 faqs`);
  assert(Array.isArray(topic.relatedSlugs) && topic.relatedSlugs.length >= 2, `Topic ${key} must have relatedSlugs`);
  
  // Verify each related slug points to a valid topic
  for (const relSlug of topic.relatedSlugs) {
    const relTopic = getDarshanTopic(relSlug);
    assert(relTopic, `Topic ${key} references invalid relatedSlug: ${relSlug}`);
  }

  // Quota release verification
  assert(topic.quotaRelease, `Topic ${key} must have quotaRelease object`);
  const qr = topic.quotaRelease;
  const validStatuses = ['confirmed', 'offline_daily', 'walkin_daily', 'not_announced', 'estimated', 'past'];
  assert(validStatuses.includes(qr.status), `Topic ${key} quotaRelease status "${qr.status}" is invalid`);
  if (key !== 'sarva-darshanam') {
    assert(qr.officialSource, `Topic ${key} quotaRelease must have officialSource`);
  }
  assert(qr.lastVerified, `Topic ${key} quotaRelease must have lastVerified`);

  if (qr.status === 'not_announced') {
    assert(qr.fallbackMessageEn && qr.fallbackMessageEn.includes('The next release schedule has not been officially confirmed'),
      `Topic ${key} must show exact unconfirmed fallback message`);
  }
}
console.log(`✓ All ${topicKeys.length} topics thoroughly validated`);

// Test 3: Required URL routes & aliases resolution
const testRoutes = [
  { url: '/darshan/sarva-darshanam', expectedSlug: 'sarva-darshanam' },
  { url: '/darshan/special-entry-darshan', expectedSlug: 'special-entry-300' },
  { url: '/darshan/special-entry-300', expectedSlug: 'special-entry-300' },
  { url: '/darshan/divya-darshan', expectedSlug: 'divya-darshan' },
  { url: '/darshan/ssd-tokens', expectedSlug: 'ssd-tokens' },
  { url: '/darshan/dd-tokens', expectedSlug: 'divya-darshan' },
  { url: '/darshan/e-dip', expectedSlug: 'online-lucky-dip' },
  { url: '/darshan/online-lucky-dip', expectedSlug: 'online-lucky-dip' },
  { url: '/darshan/offline-cro-lucky-dip', expectedSlug: 'offline-lucky-dip' },
  { url: '/darshan/offline-lucky-dip', expectedSlug: 'offline-lucky-dip' },
  { url: '/darshan/senior-citizens', expectedSlug: 'senior-citizens' },
  { url: '/darshan/physically-challenged', expectedSlug: 'differently-abled' },
  { url: '/darshan/differently-abled', expectedSlug: 'differently-abled' },
  { url: '/darshan/infant-darshan', expectedSlug: 'infant-darshan' },
  { url: '/darshan/nri-darshan', expectedSlug: 'nri-darshan' },
  { url: '/darshan/defence-personnel', expectedSlug: 'defence-darshan' },
  { url: '/darshan/defence-darshan', expectedSlug: 'defence-darshan' },
  { url: '/darshan/arjitha-sevas', expectedSlug: 'arjitha-sevas' },
  { url: '/darshan/virtual-sevas', expectedSlug: 'virtual-sevas' },
  { url: '/darshan/srivani-trust', expectedSlug: 'srivani-trust' },
  { url: '/darshan/major-donors', expectedSlug: 'major-donors' },
  { url: '/darshan/recommendation-letters', expectedSlug: 'recommendation-letters' },
  { url: '/darshan/angapradakshinam', expectedSlug: 'angapradakshinam' },
  { url: '/darshan/blood-donation', expectedSlug: 'blood-donation' },
  { url: '/darshan/govinda-nama-koti', expectedSlug: 'govinda-nama-koti' },
  { url: '/darshan/srinivasa-divyaanugraha-homam', expectedSlug: 'srinivasa-divyaanugraha-homam' }
];

for (const { url, expectedSlug } of testRoutes) {
  const slug = url.replace('/darshan/', '');
  const topic = getDarshanTopic(slug);
  assert(topic, `Route ${url} failed to resolve to a topic`);
  assert.strictEqual(topic.slug, expectedSlug, `Route ${url} resolved to ${topic.slug}, expected ${expectedSlug}`);
}
console.log(`✓ All ${testRoutes.length} route endpoints and aliases resolved successfully`);

// Test 4: SEO Metadata Verification
for (const { url, expectedSlug } of testRoutes) {
  const meta = getRouteMetadata(url);
  assert(meta, `No SEO metadata returned for ${url}`);
  assert(meta.title && meta.title.includes('The Tirumala Verse'), `Title for ${url} missing branding: ${meta.title}`);
  assert(meta.description && meta.description.length > 20, `Description for ${url} too short`);
  assert.strictEqual(meta.canonical, `${SITE_ORIGIN}/darshan/${expectedSlug}`, `Canonical for ${url} must point to ${expectedSlug}`);
}
console.log('✓ SEO Metadata verified for all routes');

// Test 5: Structured Data (Schema.org JSON-LD) Verification
for (const { url, expectedSlug } of testRoutes) {
  const sd = buildRouteStructuredData(url);
  assert(sd, `No structured data returned for ${url}`);
  assert.strictEqual(sd['@context'], 'https://schema.org');
  assert(Array.isArray(sd['@graph']), `Expected @graph array in structured data for ${url}`);

  const webpage = sd['@graph'].find((item) => item['@type'] === 'WebPage');
  assert(webpage, `Missing WebPage schema for ${url}`);
  assert.strictEqual(webpage.url, `${SITE_ORIGIN}/darshan/${expectedSlug}`);

  const breadcrumbs = sd['@graph'].find((item) => item['@type'] === 'BreadcrumbList');
  assert(breadcrumbs, `Missing BreadcrumbList schema for ${url}`);
  assert(breadcrumbs.itemListElement.length >= 3, `BreadcrumbList for ${url} must have >= 3 crumbs`);

  const faqSchema = sd['@graph'].find((item) => item['@type'] === 'FAQPage');
  assert(faqSchema, `Missing FAQPage schema for ${url}`);
  assert(faqSchema.mainEntity.length >= 2, `FAQPage schema for ${url} must contain >= 2 questions`);
}
console.log('✓ Structured Data (WebPage, BreadcrumbList, FAQPage) verified for all routes');

console.log('\n--- ALL DARSHAN TESTS PASSED SUCCESSFULLY! ---');
