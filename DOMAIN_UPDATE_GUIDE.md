# Domain Update Guide for Westend Corporation

This guide explains how to update your website configuration after purchasing a domain name.

## Step 1: Point Your Domain to Your Server

After purchasing your domain, you need to point it to your server's IP address:

1. Log in to your domain registrar's website (e.g., GoDaddy, Namecheap, etc.)
2. Find the DNS management section
3. Add or update the following DNS records:
   - **A Record**: Point `@` (or your root domain) to your server's IP address
   - **A Record**: Point `www` to your server's IP address
   - Wait for DNS propagation (can take 24-48 hours)

## Step 2: Update Your Website Configuration

Once your domain is pointing to your server, run the domain update script:

```bash
sudo ./domain_setup.sh
```

The script will:
1. Ask for your new domain name
2. Update all configuration files with the new domain
3. Restart all necessary services

## Step 3: Set Up SSL Certificate

After your domain is properly pointing to your server and the configuration is updated, set up SSL:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts to complete the SSL setup.

## Step 4: Verify Everything Works

Check that your website is accessible at:
- https://yourdomain.com
- https://www.yourdomain.com

Also verify that:
- The admin interface works at https://yourdomain.com/admin
- API endpoints work at https://yourdomain.com/api
- Static and media files load correctly

## Troubleshooting

### If the website doesn't load:
1. Check that DNS is properly configured: `dig yourdomain.com`
2. Verify Nginx is running: `sudo systemctl status nginx`
3. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### If the backend doesn't work:
1. Check the Gunicorn service: `sudo systemctl status westend-backend`
2. Check the backend logs: `sudo journalctl -u westend-backend`

### If SSL doesn't work:
1. Verify certificates exist: `sudo certbot certificates`
2. Renew if needed: `sudo certbot renew --dry-run`
