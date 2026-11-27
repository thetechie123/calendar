#  The Tirumala Verse — Utsav Calendar & Pilgrim Guide

A modern web application built for pilgrims visiting Tirumala and Tirupati temples. Features digitized TTD Panchangam festival schedules, interactive 16-month grid view, live festival countdowns, 1-click Google Calendar & WhatsApp sharing, daily Nitya Seva timetables, and bilingual support.

---

## 🌟 Key Highlights

- **📅 16-Month Utsavam Calendar**: Interactive month-by-month grid across 2026–2027.
- **🔍 Live Real-Time Search & Temple Filters**: Filter by festival title, location, Vahanam, or temple shrine.
- **🎯 1-Click Reminders & WhatsApp Share**: Direct Google Calendar event creation and 1-click WhatsApp event sharing.
- **🛕 Daily Nitya Seva Timetables**: Complete daily ritual schedules for Monday through Sunday.
- **⏳ Live Festival Countdown**: Real-time 1-second ticking clock to the next major upcoming festival.
- **🌐 Bilingual & Dual Theme**: Toggle between English and Telugu (`తెలుగు`) and Dark/Light mode.

---

## Production build

Use a clean Git checkout and run `npm ci`, `npm test`, and `npm run build`. Publish `dist/`. The prebuild check ensures only approved files from `public/` enter the build. Keep local READMEs, credentials, and handoff files outside that directory. Configure the production Supabase URL and public anon key in Render. Keep service-role keys and server credentials out of `VITE_*` variables.

## Render routing

The build emits `about.html` with About-specific SEO metadata. In the Render dashboard, keep the `/about` → `/about.html` rewrite above the SPA fallback (`/*` → `/index.html`). If exact rewrites for `/references`, `/temples`, or `/faqs` were added previously, remove them from the Render dashboard. [Render rewrite documentation](https://render.com/docs/redirects-rewrites)

## Cloudflare Worker for retired pages

1. In Cloudflare, select the `thetirumalaverse.in` zone and open **DNS → Records**. Confirm the apex record for `thetirumalaverse.in` is **Proxied** and points to the existing Render origin.
2. Open **Workers & Pages → Create application**, choose the **Hello World** template, name the Worker `tirumala-retired-pages`, and select **Deploy** to create it.
3. Open `tirumala-retired-pages` and select **Edit code**. Replace the template's entry file with the full contents of [retired-pages.mjs](cloudflare/retired-pages.mjs), then select **Deploy** in the editor. The Worker uses no bindings or environment variables. [Cloudflare dashboard editor](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/#via-the-cloudflare-dashboard)
4. Open **Settings → Domains & Routes → Add → Route**. Select the `thetirumalaverse.in` zone and add each pattern individually using **Add route**. [Cloudflare route setup](https://developers.cloudflare.com/workers/configuration/routing/routes/#set-up-a-route-in-the-dashboard)

   ```text
   thetirumalaverse.in/references*
   thetirumalaverse.in/temples*
   thetirumalaverse.in/faqs*
   ```

The ending `*` lets Cloudflare match query strings and trailing slashes. It can also match paths such as `/references-guide`, so the Worker checks the pathname and forwards other requests to Render unchanged. These three patterns keep the homepage, About, calendar, and normal asset requests outside the Worker. The rules apply on the proxied apex hostname. Direct requests to the Render `onrender.com` hostname bypass Cloudflare. [Cloudflare route matching](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior)

### Verify production after both deployments

In PowerShell, run these GET and HEAD checks without following redirects. Every line in the first block should report `410`.

```powershell
$site = 'https://thetirumalaverse.in'
foreach ($retiredPage in 'references', 'temples', 'faqs') {
  foreach ($suffix in '', '/', '?source=verify', '/?source=verify') {
    curl.exe -sS -o NUL -w '%{http_code} %{url_effective}\n' "$site/$retiredPage$suffix"
  }
  curl.exe -sSI -o NUL -w '%{http_code} %{url_effective}\n' "$site/$retiredPage"
}
```

Each active URL should return `200`, and `/about` should show one self-referencing canonical and `index, follow` in the initial HTML.

```powershell
foreach ($activePath in '/', '/about', '/calendar?search=Garuda', '/calendar?event=123', '/festivals/garuda-vahanam', '/sitemap.xml', '/sitemap_index.xml') {
  curl.exe -sS -o NUL -w '%{http_code} %{url_effective}\n' "$site$activePath"
}
curl.exe -fsS "$site/about" | Select-String -Pattern '<title>', 'name="robots"', 'rel="canonical"', 'property="og:url"'
curl.exe -fsS "$site/sitemap.xml" "$site/sitemap_index.xml" | Select-String -Pattern '<loc>https://thetirumalaverse\.in/(about|references|temples|faqs)/?</loc>'
```

The sitemap check should print only the `/about` entry. In a browser, also open a known calendar event share URL and confirm the event opens with the base calendar canonical. Use Search Console's live URL inspection to verify the About page and the three retired URLs after the HTTP checks pass.
