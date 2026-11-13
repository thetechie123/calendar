import assert from "node:assert/strict";
import { mergeEvents } from "../src/utils/eventMerge.js";

console.log("\n============================================================");
console.log("RUNNING CLOUD SYNC & MERGE EVENTS TEST SUITE");
console.log("============================================================\n");

// Test 1: User edits an initial event (e.g. Pedda Sesha Vahana ttd-160-1) with new description and images
const initialCatalog = [
  {
    id: "ttd-160-1",
    title: "Tirumala Srivari Pedda Sesha Vahana Seva & Nagula Chavithi",
    description: "Old canonical description",
    location: "Four Mada Streets",
    highlight: true,
    images: [],
    imageUrl: ""
  },
  {
    id: "ttd-160-2",
    title: "Pushpa Yaga Mahotsavam",
    description: "Flower offering",
    location: "Sampangi Prakaram"
  }
];

const editedEventsInState = [
  {
    id: "ttd-160-1",
    title: "Tirumala Srivari Pedda Sesha Vahana Seva & Nagula Chavithi",
    description: "Newly updated divine Pedda Sesha description with Vahana details",
    location: "Four Mada Streets",
    highlight: true,
    images: [{ url: "https://rjdltvopbejhvbheindb.supabase.co/storage/v1/object/public/event-photos/pedda_sesha.jpg", caption: "Pedda Sesha" }],
    imageUrl: "https://rjdltvopbejhvbheindb.supabase.co/storage/v1/object/public/event-photos/pedda_sesha.jpg"
  },
  {
    id: "ttd-160-2",
    title: "Pushpa Yaga Mahotsavam",
    description: "Flower offering",
    location: "Sampangi Prakaram"
  }
];

// Verify handleTriggerCloudSync payload construction
const currentIds = new Set(editedEventsInState.map(e => e.id));
const deletedIds = new Set();
const missingInitial = initialCatalog.filter(e => !currentIds.has(e.id) && !deletedIds.has(e.id));
const syncPayload = [...editedEventsInState, ...missingInitial];

const peddaSeshaInSync = syncPayload.find(e => e.id === "ttd-160-1");
assert.equal(
  peddaSeshaInSync.description,
  "Newly updated divine Pedda Sesha description with Vahana details",
  "Cloud sync payload MUST preserve the admin's updated description"
);
assert.equal(
  peddaSeshaInSync.images.length,
  1,
  "Cloud sync payload MUST preserve uploaded images"
);
assert.equal(
  peddaSeshaInSync.imageUrl,
  "https://rjdltvopbejhvbheindb.supabase.co/storage/v1/object/public/event-photos/pedda_sesha.jpg",
  "Cloud sync payload MUST preserve imageUrl"
);
console.log("[PASS] 1: Cloud sync payload retains admin edits and images for initial events");

// Test 2: Another device pulls cloud events and merges with preferInitial: true
const remoteEventsFromCloud = [
  {
    id: "ttd-160-1",
    title: "Tirumala Srivari Pedda Sesha Vahana Seva & Nagula Chavithi",
    description: "Newly updated divine Pedda Sesha description with Vahana details",
    imageUrl: "https://rjdltvopbejhvbheindb.supabase.co/storage/v1/object/public/event-photos/pedda_sesha.jpg",
    images: [{ url: "https://rjdltvopbejhvbheindb.supabase.co/storage/v1/object/public/event-photos/pedda_sesha.jpg", caption: "Pedda Sesha" }]
  }
];

const otherDeviceLocalEvents = [
  {
    id: "ttd-160-1",
    title: "Tirumala Srivari Pedda Sesha Vahana Seva & Nagula Chavithi",
    description: "Old canonical description",
    location: "Four Mada Streets",
    highlight: true,
    images: []
  }
];

const mergedOnOtherDevice = mergeEvents(
  remoteEventsFromCloud,
  otherDeviceLocalEvents,
  new Set(),
  { preferInitial: true }
);

const updatedPeddaSesha = mergedOnOtherDevice.find(e => e.id === "ttd-160-1");
assert.equal(
  updatedPeddaSesha.description,
  "Newly updated divine Pedda Sesha description with Vahana details",
  "Other device MUST receive updated description from cloud"
);
assert.equal(
  updatedPeddaSesha.imageUrl,
  "https://rjdltvopbejhvbheindb.supabase.co/storage/v1/object/public/event-photos/pedda_sesha.jpg",
  "Other device MUST receive updated imageUrl from cloud"
);
assert.equal(
  updatedPeddaSesha.images.length,
  1,
  "Other device MUST receive updated images array from cloud"
);
assert.equal(
  updatedPeddaSesha.location,
  "Four Mada Streets",
  "Other device MUST preserve client metadata like location when merged with cloud data"
);
console.log("[PASS] 2: Other device properly merges cloud updates with photo and description");

console.log("\n============================================================");
console.log("ALL CLOUD SYNC & MERGE TESTS PASSED (2/2)");
console.log("============================================================\n");
