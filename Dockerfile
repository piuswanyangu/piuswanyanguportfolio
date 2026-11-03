# syntax=docker/dockerfile:1

# Production image for the Afrinex Solutions website.
# Uses Next.js standalone output so the runtime image ships only server.js,
# the traced node_modules, public/ and .next/static.
#
# Built by docker-compose.yml. To build by hand:
#   docker build --build-arg NEXT_PUBLIC_SITE_URL=https://afrinexsolutions.co.ke -t afrinex-web .

ARG NODE_IMAGE=node:24-alpine

# ---- 1. Install dependencies (cached until package*.json changes) ----------
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- 2. Build the site -----------------------------------------------------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_SITE_URL is inlined at build time (canonical URLs, sitemap,
# robots, Open Graph). The build fails if it is missing or not https.
ARG NEXT_PUBLIC_SITE_URL=https://afrinexsolutions.co.ke
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_TELEMETRY_DISABLED=1 \
    STANDALONE_BUILD=1
RUN npm run build

# ---- 3. Minimal runtime image ----------------------------------------------
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
