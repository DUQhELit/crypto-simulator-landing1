# SEO Checklist

This document lists the search engine optimisation practices implemented for Simulated Crypto.

## On‑Page SEO

* Each page defines a unique `<title>` and `<meta name="description">` using the `SEO` component or Next.js metadata.
* Canonical tags point to the preferred URL (defined by `NEXT_PUBLIC_SITE_URL`).
* Open Graph and Twitter Card metadata provide rich previews on social media.
* Alt text is supplied for all images.
* Semantic HTML tags (`<header>`, `<main>`, `<article>`, `<section>`) convey structure.
* Lazy loading is used for images via Next.js `<Image>` and dynamic imports.

## Structured Data

* `sitemap.xml` is generated dynamically at `/sitemap.xml` via `app/sitemap.ts`.
* `robots.txt` allows crawlers and points to the sitemap.
* Future enhancements could include JSON‑LD for `Article`, `BreadcrumbList` and `FinancialProduct` schemas on dynamic pages.

## Performance & Accessibility

* Tailwind CSS and modern JavaScript ensure a fast, responsive design.
* Ad slots reserve space to avoid layout shifts, keeping CLS low.
* Colour palette meets WCAG AA contrast requirements.
* Keyboard navigation is supported via semantic markup.

## Internal Linking

* Article index page links to individual articles with descriptive anchor text.
* Navigation bar includes links to calculators, coins directory and learn section.