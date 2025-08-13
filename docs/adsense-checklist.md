# AdSense Checklist

Follow these guidelines to ensure the site remains compliant with Google AdSense policies and provides a user‑friendly experience.

## Placement & Layout

* All advertisements are placed within the custom `<AdSlot>` component, which reserves a fixed container size to prevent cumulative layout shift (CLS).
* Each ad slot is clearly labeled "Advertisement" for transparency.
* Ad slots are spaced apart from interactive elements to avoid accidental clicks.
* No more than one ad is visible at a time within a single viewport on mobile devices.

## Technical Implementation

* The `NEXT_PUBLIC_ADSENSE_CLIENT` environment variable holds your AdSense publisher ID.  Do **not** hard‑code it into the repository.
* The `<AdSlot>` component accepts `slotId` and `sizes` props to configure individual ad units.  Actual ad code can be dynamically injected via the Google AdSense script loaded on the client side.
* Scripts should be lazy‑loaded after the main content to avoid blocking page rendering.

## Content Compliance

* All articles are original and educational; there is no scraped or prohibited content.
* The site avoids clickbait or misleading phrasing that could violate ad policies.
* No illegal, violent or adult themes appear anywhere on the site.

## Monitoring

* Regularly review AdSense policy updates and adjust placements accordingly.
* Use Google’s Publisher Console or AdSense dashboard to verify that ads are serving correctly and track performance.