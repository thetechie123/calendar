import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from '../cloudflare/retired-pages.mjs';

const origin = 'https://thetirumalaverse.in';

test('The Worker returns 410 for each retired route without fetching the origin', async t => {
  const upstream = t.mock.method(globalThis, 'fetch', () => assert.fail('Unexpected origin fetch'));

  for (const path of ['/references', '/temples', '/faqs']) {
    for (const suffix of ['', '/', '?source=test', '/?source=test']) {
      const url = `${origin}${path}${suffix}`;
      const response = await worker.fetch(new Request(url));
      assert.equal(response.status, 410, url);
      assert.equal(response.statusText, 'Gone', url);
      assert.match(await response.text(), /permanently removed/);

      const head = await worker.fetch(new Request(url, { method: 'HEAD' }));
      assert.equal(head.status, 410, url);
      assert.equal(await head.text(), '');
    }
  }

  assert.equal(upstream.mock.callCount(), 0);
});

test('The Worker forwards original requests and returns origin responses unchanged', async t => {
  const originResponse = new Response(null, { status: 302, headers: { Location: '/calendar' } });
  const upstream = t.mock.method(globalThis, 'fetch', async () => originResponse);
  const requests = [
    new Request(`${origin}/about`),
    new Request(`${origin}/calendar?search=Garuda`),
    new Request(`${origin}/calendar?event=123`),
    new Request(`${origin}/references-guide`),
    new Request(`${origin}/temples/tirumala`),
    new Request(`${origin}/faqs-feedback?section=darshan`, { method: 'POST', body: 'feedback' }),
  ];

  for (const request of requests) {
    assert.equal(await worker.fetch(request), originResponse);
  }
  assert.equal(upstream.mock.callCount(), requests.length);
  for (const [index, call] of upstream.mock.calls.entries()) {
    assert.equal(call.arguments[0], requests[index]);
  }
});
