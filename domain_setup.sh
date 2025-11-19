#!/bin/bash

# Exit on error
set -e

echo "=========================================="
echo "Westend Corporation Domain Setup Script"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

# Get the new domain name
echo "Enter your domain name (without www, e.g., westendcorp.com):"
read DOMAIN

# Validate domain format
if [[ ! $DOMAIN =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$ ]]; then
  echo "Invalid domain format. Please enter a valid domain name."
  exit 1
fi

# Set variables
PROJECT_DIR="/var/www/westend-Corporation"
BACKEND_DIR="$PROJECT_DIR/backend"

echo "Updating configuration for domain: $DOMAIN"

# Update backend .env file
if [ -f "$BACKEND_DIR/.env" ]; then
  echo "Updating backend .env file..."
  sed -i "s/ALLOWED_HOSTS=.*/ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN,localhost,127.0.0.1/" "$BACKEND_DIR/.env"
else
  echo "Creating backend .env file..."
  cat > "$BACKEND_DIR/.env" << EOF
DEBUG=False
SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')
ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN,localhost,127.0.0.1
EOF
fi

# Update frontend .env file
if [ -f "$PROJECT_DIR/.env" ]; then
  echo "Updating frontend .env file..."
  sed -i "s|REACT_APP_API_URL=.*|REACT_APP_API_URL=https://$DOMAIN/api|" "$PROJECT_DIR/.env"
else
  echo "Creating frontend .env file..."
  cat > "$PROJECT_DIR/.env" << EOF
REACT_APP_API_URL=https://$DOMAIN/api
EOF
fi

# Update Nginx configuration
echo "Updating Nginx configuration..."
if [ -f "/etc/nginx/sites-available/westend" ]; then
  sed -i "s/server_name .*/server_name $DOMAIN www.$DOMAIN;/" /etc/nginx/sites-available/westend
else
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

  # Enable the site if it doesn't exist
  if [ ! -f "/etc/nginx/sites-enabled/westend" ]; then
    ln -sf /etc/nginx/sites-available/westend /etc/nginx/sites-enabled/
  fi
fi

# Check if Gunicorn service exists, create if not
if [ ! -f "/etc/systemd/system/westend-backend.service" ]; then
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

  # Enable the service
  systemctl daemon-reload
  systemctl enable westend-backend
fi

# Set up Django if not already done
if [ ! -f "$BACKEND_DIR/db.sqlite3" ]; then
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
fi

# Build frontend if dist directory doesn't exist
if [ ! -d "$PROJECT_DIR/dist" ]; then
  echo "Building React frontend..."
  cd "$PROJECT_DIR"
  npm install
  npm run build
fi

# Ensure directories exist and set permissions
echo "Setting proper permissions..."
mkdir -p "$BACKEND_DIR/media"
mkdir -p "$BACKEND_DIR/staticfiles"
chown -R www-data:www-data "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

# Restart services
echo "Restarting services..."
systemctl restart westend-backend
systemctl restart nginx

echo "=========================================="
echo "Domain setup complete for: $DOMAIN"
echo "Your website will be accessible at:"
echo "http://$DOMAIN and http://www.$DOMAIN"
echo ""
echo "IMPORTANT: After pointing your domain to this server's IP address,"
echo "run the following command to set up SSL:"
echo "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "=========================================="
