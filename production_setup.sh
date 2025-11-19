#!/bin/bash

# Exit on error
set -e

echo "=========================================="
echo "Westend Corporation Production Setup Script"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

# Set variables
PROJECT_DIR="/var/www/westend-Corporation"
BACKEND_DIR="$PROJECT_DIR/backend"
TEMP_DOMAIN="westend.example.com"  # Temporary domain until the real one is purchased

echo "Setting up production environment with temporary domain: $TEMP_DOMAIN"
echo "You can update the domain later using the domain_setup.sh script"

# Create .env files
echo "Creating backend .env file..."
cat > "$BACKEND_DIR/.env" << EOF
DEBUG=False
SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')
ALLOWED_HOSTS=$TEMP_DOMAIN,www.$TEMP_DOMAIN,localhost,127.0.0.1
EOF

echo "Creating frontend .env file..."
cat > "$PROJECT_DIR/.env" << EOF
REACT_APP_API_URL=https://$TEMP_DOMAIN/api
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
    server_name $TEMP_DOMAIN www.$TEMP_DOMAIN;

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

# Set proper permissions
echo "Setting proper permissions..."
mkdir -p "$BACKEND_DIR/media"
mkdir -p "$BACKEND_DIR/staticfiles"
chown -R www-data:www-data "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

# Get server IP address
SERVER_IP=$(hostname -I | awk '{print $1}')

echo "=========================================="
echo "Production setup complete!"
echo ""
echo "Your website is configured with a temporary domain: $TEMP_DOMAIN"
echo "Current server IP address: $SERVER_IP"
echo ""
echo "NEXT STEPS:"
echo "1. Purchase your domain"
echo "2. Point your domain to this server's IP address: $SERVER_IP"
echo "3. Run the domain update script: sudo ./domain_setup.sh"
echo "4. Set up SSL with Let's Encrypt after domain is pointing to this server"
echo "=========================================="
echo ""
echo "To access the site locally before domain setup:"
echo "1. Add this line to your local computer's hosts file:"
echo "   $SERVER_IP $TEMP_DOMAIN www.$TEMP_DOMAIN"
echo "2. Then visit http://$TEMP_DOMAIN in your browser"
echo "=========================================="
