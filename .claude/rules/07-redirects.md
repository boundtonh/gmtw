# 07 — Redirects

## Situation
GMT has an old domain that needs to redirect to the new domain at launch. All old URLs should forward permanently (301) so any existing Google rankings and backlinks transfer to the new site.

## Old Domain
TBD — client to confirm old domain before launch.

## Implementation

Redirects live in `next.config.ts`. Do not use Vercel dashboard redirects — keep them in code so they're version controlled.

```ts
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/our-locations',
        destination: '/locations',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ocean-tables',
        destination: '/ocean-tables',
        permanent: true, // same slug — keeps any existing ranking signal
      },
      {
        source: '/river-tables',
        destination: '/river-tables',
        permanent: true, // same slug — keeps any existing ranking signal
      },
      {
        source: '/table-bases',
        destination: '/table-bases',
        permanent: true, // same slug — keeps any existing ranking signal
      },
      {
        source: '/online-store',
        destination: '/',
        permanent: true, // no store in V1 — redirect to homepage
      },
      {
        // Catch any /online-store/* deep links
        source: '/online-store/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
```

## DNS-Level Redirect (old domain → new domain)

This is handled in Vercel, not in Next.js code:

1. Add old domain to the Vercel project under Settings → Domains
2. Vercel will automatically 301 redirect all traffic from old domain to the primary domain
3. Verify with: `curl -I https://olddomain.com` — should return `301` with `Location: https://newdomain.com`

## www Handling

Set the primary domain in Vercel to the non-www version:
- Primary: `greenmountaintableworx.com`
- Vercel auto-redirects: `www.greenmountaintableworx.com` → `greenmountaintableworx.com`

## Pre-Launch Checklist
- [ ] Confirm old domain with client
- [ ] Add old domain to Vercel project
- [ ] Verify 301 redirect is live after DNS propagation
- [ ] Check Google Search Console — submit new sitemap after launch
- [ ] Confirm no old URLs return 404 (crawl old site first if needed)

## Notes
- 301 = permanent redirect — passes ~90% of link equity to new URL
- Never use 302 (temporary) for domain migrations
- If old site has pages with Google rankings, map them to the closest new URL — don't let them 404