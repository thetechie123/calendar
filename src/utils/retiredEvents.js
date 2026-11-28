const RETIRED_WINDOW_ID = 'ttd-2026-12-vaikunta-ekadasi-spells';
const RETIRED_WINDOW_TITLE = /^tirumala vaikunth?a ekadasi 5[-– ]spell seva\s*&\s*darshan window\b/i;

export function isRetiredEvent(event) {
  return event?.id === RETIRED_WINDOW_ID
    || event?.id === 'ttd-2026-12-vaikuntha-dwara-dec22-29'
    || RETIRED_WINDOW_TITLE.test(event?.title || '');
}
