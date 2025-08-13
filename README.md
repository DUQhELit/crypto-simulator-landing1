# Simulated Crypto

Simulated Crypto is an educational cryptocurrency portal built with Next.js and TypeScript.  It provides live market data, calculators for mining profitability, position P&L and risk sizing, as well as original articles on blockchain, mining, wallets, decentralised finance and more.

## Features

* **Live market overview:** Displays global market cap, volume and BTC/ETH dominance using the CoinGecko API.
* **Top movers table:** Lists the largest cryptocurrencies by market cap with price and 24‑hour change.
* **Coins directory & detail pages:** Browse the top coins and view charts, supply information and descriptions.
* **Calculators:** Estimate mining profitability, position profit/loss and position size.
* **Articles:** A collection of original MDX articles covering crypto fundamentals and advanced topics.
* **AdSense ready:** Placeholder ad components reserve space to avoid CLS and can be configured with your AdSense client and slot IDs via environment variables.
* **SEO & Accessibility:** SEO friendly metadata, JSON‑LD sitemap, and dark‑mode friendly contrast with Tailwind CSS.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with the following variables:

   ```dotenv
   NEXT_PUBLIC_SITE_URL=http://simulatedcrypto.online
   NEXT_PUBLIC_ADSENSE_CLIENT=your-adsense-client-id
   COIN_API_BASE=https://api.coingecko.com/api/v3
   CLOUDFLARE_ZONE_ID=your-zone-id
   CLOUDFLARE_API_TOKEN=your-cloudflare-token
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the site.

4. To build for production:

   ```bash
   npm run build
   npm start
   ```

## Deployment

This project is configured for deployment on Vercel or any Node.js hosting platform.  For CI/CD, configure GitHub Actions to install dependencies, run lint/tests and build.  After the build, you can deploy the `.next` directory to your chosen hosting and purge Cloudflare cache using the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ZONE_ID` environment variables.

## Contributing

Contributions are welcome!  Please open a pull request on GitHub with detailed explanation of your changes.  All code must follow the established ESLint and Prettier rules.