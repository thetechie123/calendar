const retiredPath = /^\/(?:references|temples|faqs)\/*$/;

export default {
  fetch(request) {
    if (!retiredPath.test(new URL(request.url).pathname)) {
      return globalThis.fetch(request);
    }

    return new Response(request.method === 'HEAD' ? null : 'This page has been permanently removed.\n', {
      status: 410,
      statusText: 'Gone',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  },
};
