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
