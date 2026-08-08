# deborahmoyaki.github.io

Personal site for Deborah Moyaki — engineering educator and researcher working at the
intersection of technology, learning, and UX. Plain HTML/CSS/JS — no build step, no
framework, so it deploys as-is on GitHub Pages.

## Preview locally

```
cd deborah-moyaki-site
python3 -m http.server 8000
```

Then open http://localhost:8000. **You must use a local server, not double-clicking
`index.html`** — pages use root-relative links (`/research.html`) and fetch the shared
header/footer from `/partials/`, both of which require `http://`, not `file://`.

## Structure

```
index.html            Home — hero, 3 selected papers, full bio (no separate About page), news preview
research.html          Focus areas + a filterable grid of real papers by theme
publications.html      Real papers grouped by year/type, each with a "Read Paper" link where available
news.html               Full chronological feed of papers, talks & awards (no paper links — those live in Publications)
service.html            Leadership, mentorship & outreach, peer review service
teaching.html           Courses & workshops
cv.html                 Inline CV (experience, education, awards, skills) + PDF download
contact.html            Contact + social links
partials/header.html, footer.html   Shared nav/footer, injected by main.js on every page
assets/css/style.css    All styling
assets/js/main.js       Partial injection, active-nav, mobile nav, scroll-reveal, tag filter
cv/Deborah_Moyaki_CV_EMEE.pdf   The actual CV file, linked from cv.html
```

There's no `about.html` — the full bio lives directly on the homepage.

### Adding a publication to a Focus Area on the Research page

Add a card to the `.case-grid` in `research.html` with a `data-tags="..."` value
matching one of the filter pills (`vr-learning`, `ai-education`,
`motivation-persistence`, `human-centered-ux`), or add a new pill for a new theme.

### Editing the nav

Only edit `partials/header.html` and `partials/footer.html` — every page pulls
these in at runtime, so there's nothing to keep in sync manually.

## Placeholder content to replace

Everything tagged `[Placeholder ...]` needs a real value. Checklist:

- [x] Home hero, "About" bio — real copy now in place (`index.html`)
- [ ] Social links: Google Scholar, ORCID, LinkedIn, GitHub still `href="#"` on the homepage About section and `contact.html` — drop in the real profile URLs
- [x] Research page — rebuilt around 4 real focus areas (derived from the publication list) with a filterable grid of real papers, each linking to the actual paper (`research.html`)
- [x] Publications list — pulled from [Google Scholar](https://scholar.google.com/citations?user=aR3IIAMAAAAJ&hl=en), grouped by year/type, each with a "Read Paper" button linking to the actual paper where a public link exists (`publications.html`). 5 very recent FIE 2025 / FIE 2024 conference papers aren't publicly indexed yet, so those are missing a link — add one once they're up.
- [x] News feed — 20 publications (real dates, verified against Springer/Taylor & Francis/ASEE where possible; conference-paper months inferred from each conference's known month — June for ASEE, October for FIE) plus the 10 awards/grants you provided (`news.html`, top 8 mirrored on `index.html`). Worth a once-over to confirm the inferred conference-paper dates are right.
- [x] Service page — leadership, mentorship/outreach, and peer-review roles from what you sent (`service.html`). Two date ranges from your notes ("Jan 2025 – May 2025" and "Nov. 2018 – Nov. 2019") weren't clearly attached to a specific role, so I left them out — let me know what they belong to and I'll add them.
- [ ] Teaching entries (`teaching.html`)
- [ ] CV page's Experience/Education/Awards timelines and Skills row (`cv.html`) are still placeholder — the actual PDF is wired up and downloadable, but the inline summary on the page isn't populated yet
- [ ] Contact email is currently `deborahmoyaki@gmail.com` — change if you'd rather use a different address (`contact.html`)

## Deploying to GitHub Pages (deborahmoyaki.github.io)

1. On GitHub, create a **new repository** named exactly `deborahmoyaki.github.io`
   (must match your GitHub username, public, no README/license — this repo already has one).
2. From this folder, connect it to that repo and push:

   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/deborahmoyaki/deborahmoyaki.github.io.git
   git push -u origin main
   ```

3. In the repo's **Settings → Pages**, set Source to "Deploy from a branch", branch
   `main`, folder `/ (root)`. Save.
4. Within a minute or two the site is live at `https://deborahmoyaki.github.io`.

No GitHub Actions or Jekyll config needed — GitHub Pages serves static files directly.

## Custom domain (optional)

If you buy a domain later, add a `CNAME` file at the repo root containing the
domain, and point its DNS at GitHub Pages per
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
