# HillHub Production Deployment Guide

This guide will help you deploy HillHub to production with your domain hill-hub.com.

## Prerequisites

- ✅ Domain: hill-hub.com
- ✅ Stripe Live Account
- ✅ Vercel Account (recommended) or other hosting provider
- ✅ Git repository

## Step 1: Set Up Stripe Webhook

1. **Run the webhook setup script:**
   ```bash
   cd hillhub
   npm run setup-webhook
   ```

2. **Copy the webhook secret** from the output and add it to your `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## Step 2: Configure Environment Variables

### For Local Development (.env.local)
```env
# Stripe Configuration (Live Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Domain Configuration
NEXT_PUBLIC_SITE_URL=https://hill-hub.com
NEXT_PUBLIC_APP_ENV=production
```

### For Production (Vercel Dashboard)
Add these environment variables in your Vercel project settings:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_ENV`

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Option B: Deploy via GitHub
1. **Push your code to GitHub**
2. **Connect your repository to Vercel**
3. **Configure environment variables in Vercel dashboard**
4. **Deploy automatically on push**

## Step 4: Configure Custom Domain

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Domains"
   - Add `hill-hub.com` and `www.hill-hub.com`

2. **Update DNS Records:**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.19`

## Step 5: Verify Stripe Configuration

1. **Test the webhook:**
   - Go to Stripe Dashboard → Webhooks
   - Find your webhook endpoint
   - Click "Send test webhook"
   - Verify it reaches your production URL

2. **Test checkout flow:**
   - Visit your live site
   - Add a product to cart
   - Complete checkout with test card: `4242 4242 4242 4242`

## Step 6: SSL and Security

Vercel automatically provides SSL certificates. Ensure:
- ✅ HTTPS is enforced
- ✅ Security headers are configured (already in next.config.ts)
- ✅ Stripe webhook signature verification is working

## Step 7: Monitoring and Analytics

### Optional: Add Google Analytics
1. Create a Google Analytics account
2. Add your tracking ID to environment variables
3. Update the layout to include GA script

### Optional: Add Error Monitoring
Consider adding Sentry or similar error monitoring service.

## Troubleshooting

### Common Issues:

1. **Webhook not receiving events:**
   - Check webhook URL is correct
   - Verify webhook secret in environment variables
   - Check Vercel function logs

2. **Checkout not working:**
   - Verify Stripe keys are live keys (not test)
   - Check browser console for errors
   - Verify domain is added to Stripe allowed domains

3. **Images not loading:**
   - Check Next.js image configuration
   - Verify image domains in next.config.ts

### Useful Commands:
```bash
# Test build locally
npm run build

# Check for linting issues
npm run lint

# View Vercel logs
vercel logs

# Redeploy
vercel --prod
```

## Production Checklist

- [ ] Stripe webhook configured and tested
- [ ] Environment variables set in production
- [ ] Domain configured and SSL working
- [ ] Checkout flow tested with live Stripe
- [ ] Images loading correctly
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Error monitoring set up (optional)
- [ ] Analytics configured (optional)

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify Stripe webhook events
3. Test locally with production environment variables
4. Contact support with specific error messages

Your HillHub store should now be live at https://hill-hub.com! 🏔️ 