# Deploying afrinexsolutions.co.ke

The site runs on the Ubuntu VPS at Spaceship (`209.74.83.185`) in Docker.
DNS is at Cloudflare. A free Let's Encrypt certificate, requested with
Docker, gives nginx on the VPS a valid HTTPS certificate.

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
| `nginx/certs/` | Let's Encrypt certificate copied from `/etc/letsencrypt` (on the server only, never committed) |
| `scripts/server-setup.sh` | One-time VPS setup: Docker, swap, firewall |
| `scripts/deploy.sh` | First deploy: pull, build and start everything |
| `scripts/update.sh` | Every later change: pull, check dependencies, rebuild, restart, reload nginx |

`https://afrinexsolutions.co.ke` is the canonical address.
`https://www.afrinexsolutions.co.ke` permanently redirects to it.

**How the certificate is issued.** Let's Encrypt checks that it can reach
your server on port 80 at your domain. While the Cloudflare proxy is on,
Cloudflare answers instead of your server, so the check fails. The steps
below turn the proxy off, request the certificate, deploy, and then turn the
proxy back on.

---

## 1. Push the deployment files

On your Windows machine, from the project folder:

```powershell
git add .
git commit -m "Add Docker, nginx and VPS deployment setup"
git push origin main
```

## 2. Cloudflare DNS records, proxy off

Cloudflare dashboard > `afrinexsolutions.co.ke` > **DNS** > **Records**.

Delete any existing `A`, `AAAA` or `CNAME` record named `@` or `www` that
points somewhere else (for example a Spaceship parking page or Vercel).
Leave `MX` and `TXT` records alone if you use email on this domain.

Add these two records with the proxy **off** for now:

| Type | Name | IPv4 address | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | `209.74.83.185` | DNS only (grey cloud) | Auto |
| A | `www` | `209.74.83.185` | DNS only (grey cloud) | Auto |

You turn the proxy on in step 8, after the certificate is installed.

Do not add an `AAAA` record.

The domain's nameservers are already Cloudflare's
(`anastasia.ns.cloudflare.com`, `wells.ns.cloudflare.com`), so nothing needs
to change at the registrar.

## 3. Cloudflare SSL settings

These only take effect once the proxy is on, but you can set them now.

1. **SSL/TLS > Overview**: set the encryption mode to **Full (strict)**.
   This works because the Let's Encrypt certificate is publicly trusted.
   Never use *Flexible*. It causes an endless redirect loop with this setup.
2. **SSL/TLS > Edge Certificates**:
   - **Always Use HTTPS**: On
   - **Minimum TLS Version**: TLS 1.2

## 4. Prepare the VPS

Spaceship runs SSH on port **22022**, not the default 22. Connect with:

```bash
ssh -p 22022 root@209.74.83.185
```

You can also skip SSH and use **Command line** in the Spaceship VPS panel.
It opens a root shell in the browser without a password. The panel's
**Console** works even if the network or firewall is misconfigured.

If SSH times out, make sure ports 22022, 80 and 443 are allowed in any
firewall in the Spaceship VPS panel.

Then install git, clone the repo and run the one-time setup:

```bash
sudo apt-get update && sudo apt-get install -y git
git clone https://github.com/piuswanyangu/piuswanyanguportfolio.git ~/afrinex
cd ~/afrinex
sudo bash scripts/server-setup.sh
```

The setup script installs Docker Engine with the Compose plugin, adds a 2 GB
swap file if the server has none, and enables the `ufw` firewall for SSH,
HTTP and HTTPS. It detects the SSH port that `sshd` listens on, so 22022
stays open.

Before closing your current session, confirm that 22022 is allowed:

```bash
sudo ufw status
```

If `22022/tcp` is not in the list, allow it:

```bash
sudo ufw allow 22022/tcp
```

If you logged in as a normal user instead of `root`, log out and back in
now so you can run `docker` without `sudo`.

## 5. Request a free Let's Encrypt certificate with Docker

Certbot runs in a temporary Docker container from the official
`certbot/certbot` image, so nothing else is installed on the server. It
briefly listens on port 80 to answer Let's Encrypt's check. The certificate
is stored in `/etc/letsencrypt` on the VPS.

### 5a. Confirm the proxy is off

The domain must point straight at the VPS. Run this on the VPS:

```bash
getent hosts afrinexsolutions.co.ke www.afrinexsolutions.co.ke
```

Both lines must show `209.74.83.185`. If you see other addresses, such as
ones starting with `104.` or `172.`, the proxy is still on. Switch both
records to **DNS only**, wait about 5 minutes and check again.

### 5b. Request the certificate

Port 80 must be free. On a first deploy nginx is not running yet. If it is
running, stop it with `docker compose stop nginx` from `~/afrinex`.

Replace `you@example.com` with your real email address. Let's Encrypt uses
it for your account and important notices.

```bash
sudo docker run --rm -p 80:80 \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt \
  certbot/certbot certonly --standalone \
  -d afrinexsolutions.co.ke \
  -d www.afrinexsolutions.co.ke \
  --email you@example.com \
  --agree-tos --no-eff-email --non-interactive
```

A successful run prints `Successfully received certificate`. The files are
saved in `/etc/letsencrypt/live/afrinexsolutions.co.ke/`.

If it fails, fix the cause before retrying. Let's Encrypt limits how many
failed and duplicate requests you can make per hour and per week. You can
test without using up that limit by adding `--dry-run` to the command.

### 5c. Copy the certificate to nginx

nginx reads its certificate from `nginx/certs/origin.pem` and
`nginx/certs/origin.key` inside the repo. Copy the Let's Encrypt files to
those names:

```bash
cd ~/afrinex
sudo install -m 644 /etc/letsencrypt/live/afrinexsolutions.co.ke/fullchain.pem nginx/certs/origin.pem
sudo install -m 600 /etc/letsencrypt/live/afrinexsolutions.co.ke/privkey.pem   nginx/certs/origin.key
ls -l nginx/certs/
```

You should see `origin.pem` and `origin.key`.

## 6. Deploy

```bash
cd ~/afrinex
bash scripts/deploy.sh
```

The first build takes a few minutes. If the script reports a missing
certificate file, repeat step 5c.

## 7. Test with the proxy still off

From any machine:

```bash
curl -sI https://afrinexsolutions.co.ke/        # 200, "server: nginx"
curl -sI https://www.afrinexsolutions.co.ke/    # 301, location: https://afrinexsolutions.co.ke/
curl -sI http://afrinexsolutions.co.ke/         # 301 to https
```

Open `https://afrinexsolutions.co.ke` in a browser and click the padlock.
The certificate should be issued by Let's Encrypt.

## 8. Turn the Cloudflare proxy on

Cloudflare dashboard > **DNS** > **Records**. Edit both the `@` and `www`
records and set **Proxy status** to **Proxied** (orange cloud).

After a few minutes, check again:

```bash
curl -sI https://afrinexsolutions.co.ke/        # 200, "server: cloudflare"
curl -sI https://www.afrinexsolutions.co.ke/    # 301, location: https://afrinexsolutions.co.ke/
```

Browsers now show Cloudflare's certificate, because Cloudflare sits in
front. Your Let's Encrypt certificate still secures the link from
Cloudflare to the VPS.

Also open `https://afrinexsolutions.co.ke/sitemap.xml` and
`https://afrinexsolutions.co.ke/robots.txt` and confirm the URLs use the
real domain.

---

## Renewing the certificate

Let's Encrypt certificates expire after 90 days or less. This setup does not
renew automatically, because renewal needs the proxy off. If the
certificate expires, Cloudflare shows visitors error 526.

Check how long the certificate has left:

```bash
sudo openssl x509 -noout -enddate -in /etc/letsencrypt/live/afrinexsolutions.co.ke/cert.pem
```

Renew when fewer than 30 days remain. Set a calendar reminder so you do not
miss it.

1. In Cloudflare, set both the `@` and `www` records to **DNS only**.
   Wait about 5 minutes, then confirm with step 5a.
2. On the VPS, stop nginx, renew, copy the new files and start nginx again:

   ```bash
   cd ~/afrinex
   docker compose stop nginx

   sudo docker run --rm -p 80:80 \
     -v /etc/letsencrypt:/etc/letsencrypt \
     -v /var/lib/letsencrypt:/var/lib/letsencrypt \
     certbot/certbot renew

   sudo install -m 644 /etc/letsencrypt/live/afrinexsolutions.co.ke/fullchain.pem nginx/certs/origin.pem
   sudo install -m 600 /etc/letsencrypt/live/afrinexsolutions.co.ke/privkey.pem   nginx/certs/origin.key

   docker compose start nginx
   ```

   The site is down only while nginx is stopped, usually under a minute.
   If certbot says the certificate is not yet due for renewal, nothing
   changes and the site keeps working.
3. In Cloudflare, set both records back to **Proxied**.

## Updating the site

Make your change on your PC, then commit and push it:

```powershell
git add .
git commit -m "Describe your change"
git push origin main
```

If you added or removed a package, make sure `package-lock.json` is part of
the commit. `npm install` on your PC updates it.

Then on the VPS:

```bash
cd ~/afrinex && bash scripts/update.sh
```

The script:

1. Pulls the latest code and lists the new commits.
2. Checks whether `package.json` or `package-lock.json` changed and shows
   which packages were added or removed. It warns if `package.json` changed
   without `package-lock.json`.
3. Rebuilds the site image. Docker installs packages only when the
   dependency files changed. Otherwise it reuses the cached install, so the
   build is faster.
4. Restarts the site container with the new build and waits until it is
   healthy.
5. Tests the nginx config and reloads nginx.
6. Checks that the site responds with 200 and warns if the certificate
   expires within 30 days.

If the build fails, the script stops and the current version of the site
keeps running. Expect a few seconds of downtime while the new container
starts. Updating does not touch the certificate, and the proxy can stay on.

## Everyday commands

Run these from `~/afrinex`:

```bash
docker compose ps                  # container status and health
docker compose logs -f web         # Next.js logs
docker compose logs -f nginx       # access and error logs
docker compose restart nginx       # restart nginx only
docker compose down                # stop everything
```

Check the certificate expiry date:

```bash
sudo openssl x509 -noout -enddate -in /etc/letsencrypt/live/afrinexsolutions.co.ke/cert.pem
```

## Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| Certbot reports a timeout or connection error | The proxy is still on, or port 80 is blocked. Confirm step 5a and allow port 80 in the Spaceship panel firewall. |
| Certbot reports it cannot bind to port 80 | nginx is still running. Run `docker compose stop nginx`, then retry. |
| Cloudflare error **521** | Containers are not running. Run `docker compose ps` and `docker compose logs`. |
| Cloudflare error **522** | Cloudflare cannot reach the VPS. Allow ports 80 and 443 in `ufw` and in the Spaceship panel firewall. |
| Cloudflare error **525** or **526** | The certificate on the VPS is missing or expired. Check the expiry date and follow **Renewing the certificate**. |
| **Too many redirects** | SSL mode is *Flexible*. Change it to **Full (strict)**. |
| Build is killed or freezes | The server ran out of memory. Check that swap exists with `swapon --show`. |
| `nginx` exits on start | Run `docker compose logs nginx`. A missing certificate file is the usual cause. Repeat step 5c. |
