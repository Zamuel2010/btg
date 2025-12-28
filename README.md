# BTG Exchange

BTG Exchange is a Next.js + TypeScript + Tailwind production-ready app that replicates FiatRouter features on Solana:
- Wallet connect (Phantom, Solflare, Backpack)
- Buy NGN via Paystack, automatically deliver SOL or USDC to the buyer's wallet (custodial service wallet)
- Swap SPL tokens via Jupiter (quote & swap flows)
- Dashboard (balances, token holdings, transactions)
- Prisma + PostgreSQL & Redis session caching
- Vercel-ready

## Quickstart

1. Clone and install deps:
   - npm install

2. Create a Postgres DB and Redis instance. Populate environment variables (see `.env.example`).

3. Generate Prisma client and migrate:
   - npx prisma generate
   - npx prisma migrate deploy

4. Start dev:
   - npm run dev

## Environment variables

See `.env.example`. Important:
- SERVICE_WALLET_KEYPAIR: base64 JSON array or raw JSON for service/custodial wallet that holds SOL/USDC to deliver to customers.
- PAYSTACK_SECRET_KEY, PAYSTACK_WEBHOOK_SECRET
- JUPITER_API_URL (default https://quote-api.jup.ag)
- DATABASE_URL, REDIS_URL
- NEXTAUTH_JWT_SECRET (if used), SESSION_SECRET

## Deploying to Vercel

Provide all env vars in Vercel dashboard. Use `npm run build` and Vercel will deploy the Next.js app. Ensure database and redis are accessible from Vercel.

## Security & Compliance

- The app uses a custodial service wallet to deliver crypto after Paystack confirms payment. Keep that keypair secure (Vercel secrets).
- Use HTTPS and verify Paystack webhooks (signature check).
- Consider KYC/AML flows in production, transaction limits, rate-limiting, and secure monitoring.
