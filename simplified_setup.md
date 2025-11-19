# Simplified Setup for Westend Corporation

This guide provides a simplified setup using SQLite instead of PostgreSQL.

## 1. Backend Setup with SQLite

### Create a Minimal .env File for Backend

```bash
sudo nano /var/www/westend-Corporation/backend/.env
```

Add the following content:

```
DEBUG=False
SECRET_KEY=your_secure_secret_key_here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,localhost,127.0.0.1
```

### Update Django Settings

The settings.py file is already configured to use SQLite by default when no DB_NAME environment variable is set.

### Prepare the Database

```bash
cd /var/www/westend-Corporation/backend
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

## 2. Frontend Setup

### Create .env File for Frontend

```bash
sudo nano /var/www/westend-Corporation/.env
```

Add:

```
REACT_APP_API_URL=http://yourdomain.com/api
```

### Build the Frontend

```bash
cd /var/www/westend-Corporation
npm install
npm run build
```

## 3. Configure Nginx

Create a configuration file:

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

## 4. Set Up Gunicorn Service

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/westend-backend.service
```

Add:

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

## 5. Set Proper Permissions

```bash
sudo mkdir -p /var/www/westend-Corporation/backend/media
sudo mkdir -p /var/www/westend-Corporation/backend/staticfiles
sudo chown -R www-data:www-data /var/www/westend-Corporation
sudo chmod -R 755 /var/www/westend-Corporation
```

## 6. Optional: SSL Setup

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Quick Start Script

You can create a script to automate these steps:

```bash
sudo nano /var/www/westend-Corporation/setup_sqlite.sh
```

Add:

```bash
#!/bin/bash

# Exit on error
set -e

echo "=========================================="
echo "Westend Corporation Simplified Setup Script"
echo "=========================================="

# Set variables
PROJECT_DIR="/var/www/westend-Corporation"
BACKEND_DIR="$PROJECT_DIR/backend"
DOMAIN="yourdomain.com"  # Change this to your domain

# Create .env files
echo "Creating backend .env file..."
cat > "$BACKEND_DIR/.env" << EOF
DEBUG=False
SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')
ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN,localhost,127.0.0.1
EOF

echo "Creating frontend .env file..."
cat > "$PROJECT_DIR/.env" << EOF
REACT_APP_API_URL=http://$DOMAIN/api
EOF

# Set up Django
echo "Setting up Django..."
cd "$BACKEND_DIR"
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
echo "Would you like to create a superuser? (y/n)"
read create_superuser
if [ "$create_superuser" = "y" ]; then
    python manage.py createsuperuser
fi
python manage.py collectstatic --noinput

# Build React frontend
echo "Building React frontend..."
cd "$PROJECT_DIR"
npm install
npm run build

# Create Nginx configuration
echo "Creating Nginx configuration..."
cat > /etc/nginx/sites-available/westend << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    root $PROJECT_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy API requests to the backend
    location /api {
        proxy_pass http://unix:$BACKEND_DIR/westend.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Serve media files
    location /media {
        alias $BACKEND_DIR/media;
    }

    # Serve static files
    location /static {
        alias $BACKEND_DIR/staticfiles;
    }

    # Admin interface
    location /admin {
        proxy_pass http://unix:$BACKEND_DIR/westend.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Create systemd service
echo "Creating systemd service..."
cat > /etc/systemd/system/westend-backend.service << EOF
[Unit]
Description=Westend Corporation Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=$BACKEND_DIR
EnvironmentFile=$BACKEND_DIR/.env
ExecStart=$BACKEND_DIR/venv/bin/gunicorn --workers 3 --bind unix:$BACKEND_DIR/westend.sock backend.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# Enable and start services
echo "Enabling and starting services..."
ln -sf /etc/nginx/sites-available/westend /etc/nginx/sites-enabled/
systemctl daemon-reload
systemctl enable westend-backend
systemctl start westend-backend
systemctl restart nginx

# Set up SSL with Let's Encrypt
echo "Would you like to set up SSL with Let's Encrypt? (y/n)"
read setup_ssl
if [ "$setup_ssl" = "y" ]; then
    certbot --nginx -d $DOMAIN -d www.$DOMAIN
fi

# Set proper permissions
echo "Setting proper permissions..."
mkdir -p "$BACKEND_DIR/media"
mkdir -p "$BACKEND_DIR/staticfiles"
chown -R www-data:www-data "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

echo "=========================================="
echo "Setup complete! Your website should be accessible at:"
echo "http://$DOMAIN (or https://$DOMAIN if SSL was set up)"
echo "=========================================="
```

Make it executable:

```bash
sudo chmod +x /var/www/westend-Corporation/setup_sqlite.sh
```

Run it:

```bash
sudo ./setup_sqlite.sh
```
