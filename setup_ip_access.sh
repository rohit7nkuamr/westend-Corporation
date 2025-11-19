#!/bin/bash

# Exit on error
set -e

echo "=========================================="
echo "Setting up IP-based access for Westend Corporation"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

# Get server IP address
SERVER_IP=$(hostname -I | awk '{print $1}')

# Set variables
PROJECT_DIR="/var/www/westend-Corporation"
BACKEND_DIR="$PROJECT_DIR/backend"

# Create Nginx configuration for IP-based access
echo "Creating Nginx configuration for IP-based access..."
cat > /etc/nginx/sites-available/westend-ip << EOF
server {
    listen 80;
    server_name $SERVER_IP;

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

# Enable the site
echo "Enabling IP-based access..."
ln -sf /etc/nginx/sites-available/westend-ip /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo "=========================================="
echo "IP-based access setup complete!"
echo "You can now access your website at:"
echo "http://$SERVER_IP"
echo ""
echo "This configuration will work alongside your domain-based setup."
echo "When you purchase a domain, you can still run the domain_setup.sh script"
echo "to configure your site with your actual domain name."
echo "=========================================="
