# Deploying afrinexsolutions.co.ke

The site runs on the Ubuntu VPS at Spaceship (`209.74.83.185`) in Docker.
DNS and HTTPS for visitors are handled by Cloudflare.

```
Visitor ──HTTPS──> Cloudflare (proxied) ──HTTPS──> nginx :443 ──HTTP──> web :3000 (Next.js)
                                                   └─ Docker on the VPS ─────────────┘
```

| File | Purpose |
| --- | --- |
| `Dockerfile` | Builds the Next.js standalone server into a small Node 24 Alpine image |
| `docker-compose.yml` | Runs `web` (internal only) and `nginx` (ports 80 and 443) |
| `nginx/conf.d/afrinexsolutions.conf` | HTTPS, `www` to apex redirect, reverse proxy to `web` |
| `nginx/conf.d/cloudflare-real-ip.conf` | Logs real visitor IPs instead of Cloudflare IPs |
| `nginx/certs/` | Cloudflare Origin Certificate (on the server only, never committed) |
| `scripts/server-setup.sh` | One-time VPS setup: Docker, swap, firewall |
| `scripts/deploy.sh` | Pull, rebuild and restart. Use it for every update |

`https://afrinexsolutions.co.ke` is the canonical address.
`https://www.afrinexsolutions.co.ke` permanently redirects to it.

---

## 1. Push the deployment files

On your Windows machine, from the project folder:

```powershell
git add .
git commit -m "Add Docker, nginx and VPS deployment setup"
git push origin main
```

## 2. Cloudflare DNS records

Cloudflare dashboard > `afrinexsolutions.co.ke` > **DNS** > **Records**.

Delete any existing `A`, `AAAA` or `CNAME` record named `@` or `www` that
points somewhere else (for example a Spaceship parking page or Vercel).
Leave `MX` and `TXT` records alone if you use email on this domain.

Add these two records:

| Type | Name | IPv4 address | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | `209.74.83.185` | Proxied (orange cloud) | Auto |
| A | `www` | `209.74.83.185` | Proxied (orange cloud) | Auto |

Do not add an `AAAA` record. Cloudflare serves IPv6 visitors for you.

The domain's nameservers are already Cloudflare's
(`anastasia.ns.cloudflare.com`, `wells.ns.cloudflare.com`), so nothing needs
to change at the registrar.

## 3. Cloudflare SSL settings

1. **SSL/TLS > Overview**: set the encryption mode to **Full (strict)**.
   Never use *Flexible*. It causes an endless redirect loop with this setup.
2. **SSL/TLS > Edge Certificates**:
   - **Always Use HTTPS**: On
   - **Minimum TLS Version**: TLS 1.2

## 4. Create the Cloudflare Origin Certificate

This certificate encrypts traffic between Cloudflare and your VPS. It is valid
for up to 15 years, so there is nothing to renew.

1. **SSL/TLS > Origin Server > Create Certificate**.
2. Choose **Generate private key and CSR with Cloudflare**, key type **RSA (2048)**.
3. Hostnames: `afrinexsolutions.co.ke` and `*.afrinexsolutions.co.ke`.
4. Validity: **15 years**. Click **Create**.
5. Keep the page open. You will paste the **Origin Certificate** and the
   **Private Key** into the server in step 6. Cloudflare shows the private
   key only once.

## 5. Prepare the VPS

SSH in with the login details from your Spaceship VPS panel:

```bash
ssh root@209.74.83.185
```

If SSH times out, check the SSH port and any firewall in the Spaceship VPS
panel, or use the panel's web console. Make sure ports 22, 80 and 443 are
allowed there too.

Then install git, clone the repo and run the one-time setup:

```bash
sudo apt-get update && sudo apt-get install -y git
git clone https://github.com/piuswanyangu/piuswanyanguportfolio.git ~/afrinex
cd ~/afrinex
sudo bash scripts/server-setup.sh
```

The setup script installs Docker Engine with the Compose plugin, adds a 2 GB
swap file if the server has none, and enables the `ufw` firewall for SSH,
HTTP and HTTPS.

If you logged in as a normal user instead of `root`, log out and back in
now so you can run `docker` without `sudo`.

## 6. Install the certificate on the VPS

```bash
cd ~/afrinex
nano nginx/certs/origin.pem    # paste the Origin Certificate, save with Ctrl+O, Enter, Ctrl+X
nano nginx/certs/origin.key    # paste the Private Key, save the same way
chmod 600 nginx/certs/origin.key
```

Each file must include its `-----BEGIN ...-----` and `-----END ...-----` lines.

## 7. Deploy

```bash
cd ~/afrinex
bash scripts/deploy.sh
```

The first build takes a few minutes. The script fails early with a clear
message if the certificate files are missing.

## 8. Verify

On the VPS, before or after DNS has updated:

```bash
curl -skI --resolve afrinexsolutions.co.ke:443:127.0.0.1 https://afrinexsolutions.co.ke/      # expect 200
curl -skI --resolve www.afrinexsolutions.co.ke:443:127.0.0.1 https://www.afrinexsolutions.co.ke/  # expect 301
```

From any machine, once DNS is live:

```bash
curl -sI https://afrinexsolutions.co.ke/        # 200, "server: cloudflare"
curl -sI https://www.afrinexsolutions.co.ke/    # 301, location: https://afrinexsolutions.co.ke/
curl -sI http://afrinexsolutions.co.ke/         # 301 to https
```

Also open `https://afrinexsolutions.co.ke/sitemap.xml` and
`https://afrinexsolutions.co.ke/robots.txt` and confirm the URLs use the
real domain.

---

## Updating the site

Push your changes to `main`, then on the VPS:

```bash
cd ~/afrinex && bash scripts/deploy.sh
```

Expect a few seconds of downtime while the new container starts.

## Everyday commands

Run these from `~/afrinex`:

```bash
docker compose ps                  # container status and health
docker compose logs -f web         # Next.js logs
docker compose logs -f nginx       # access and error logs
docker compose restart nginx       # restart nginx only
docker compose down                # stop everything
```

## Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| Cloudflare error **521** | Containers are not running. Run `docker compose ps` and `docker compose logs`. |
| Cloudflare error **522** | Cloudflare cannot reach the VPS. Allow ports 80 and 443 in `ufw` and in the Spaceship panel firewall. |
| Cloudflare error **525** or **526** | Certificate problem. Check both files in `nginx/certs/` and that SSL mode is **Full (strict)**. |
| **Too many redirects** | SSL mode is *Flexible*. Change it to **Full (strict)**. |
| Browser certificate warning | The DNS record is set to *DNS only* (grey cloud). Switch it back to **Proxied**. The origin certificate is trusted only by Cloudflare. |
| Build is killed or freezes | The server ran out of memory. Check that swap exists with `swapon --show`. |
| `nginx` exits on start | Run `docker compose logs nginx`. A missing certificate file is the usual cause. |
