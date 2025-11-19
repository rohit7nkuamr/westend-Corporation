# Environment Setup Instructions

## Backend Environment Variables

Create a `.env` file in the `/var/www/westend-Corporation/backend/` directory with the following content:

```bash
# Django settings
DEBUG=False
SECRET_KEY=your_secure_secret_key_here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,localhost,127.0.0.1

# Database settings
DB_NAME=westend_db
DB_USER=westend_user
DB_PASSWORD=your_secure_password_here
DB_HOST=localhost
DB_PORT=5432

# Email settings (optional)
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USE_TLS=True
# EMAIL_HOST_USER=your-email@gmail.com
# EMAIL_HOST_PASSWORD=your-app-password
# DEFAULT_FROM_EMAIL=noreply@yourdomain.com
```

You can create this file using:

```bash
sudo mkdir -p /var/www/westend-Corporation/backend/
sudo nano /var/www/westend-Corporation/backend/.env
```

## Frontend Environment Variables

Create a `.env` file in the `/var/www/westend-Corporation/` directory with the following content:

```bash
# API URL for production
REACT_APP_API_URL=https://yourdomain.com/api
```

You can create this file using:

```bash
sudo nano /var/www/westend-Corporation/.env
```

## Database Setup

Create the PostgreSQL database and user:

```bash
sudo -u postgres psql -c "CREATE DATABASE westend_db;"
sudo -u postgres psql -c "CREATE USER westend_user WITH PASSWORD 'your_secure_password_here';"
sudo -u postgres psql -c "ALTER ROLE westend_user SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE westend_user SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE westend_user SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE westend_db TO westend_user;"
```

## Nginx Configuration

Create a configuration file for the site:

```bash
sudo nano /etc/nginx/sites-available/westend
```

Add the following content:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/westend-Corporation/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to the backend
    location /api {
        proxy_pass http://unix:/var/www/westend-Corporation/backend/westend.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Serve media files
    location /media {
        alias /var/www/westend-Corporation/backend/media;
    }

    # Serve static files
    location /static {
        alias /var/www/westend-Corporation/backend/staticfiles;
    }

    # Admin interface
    location /admin {
        proxy_pass http://unix:/var/www/westend-Corporation/backend/westend.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/westend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Gunicorn Service Setup

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/westend-backend.service
```

Add the following content:

```
[Unit]
Description=Westend Corporation Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/westend-Corporation/backend
EnvironmentFile=/var/www/westend-Corporation/backend/.env
ExecStart=/var/www/westend-Corporation/backend/venv/bin/gunicorn --workers 3 --bind unix:/var/www/westend-Corporation/backend/westend.sock backend.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable westend-backend
sudo systemctl start westend-backend
```

## Build the Frontend

```bash
cd /var/www/westend-Corporation
npm install
npm run build
```

## Set Proper Permissions

```bash
sudo chown -R www-data:www-data /var/www/westend-Corporation
sudo chmod -R 755 /var/www/westend-Corporation
```

## SSL Setup (Optional)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
