# 🚀 Quick Start Guide - Django Backend

## ✅ What's Been Done:

1. ✅ Django backend created in `backend/` folder
2. ✅ API app created with all models
3. ✅ REST API endpoints configured
4. ✅ CORS enabled for React frontend
5. ✅ Admin interface set up
6. ✅ Frontend updated to fetch from backend

## 📋 Next Steps:

### 1. Run Migrations
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### 2. Create Superuser
```bash
python manage.py createsuperuser
# Enter username, email, and password
```

### 3. Start Django Server
```bash
python manage.py runserver
```

Django will run at: `http://localhost:8000`

### 4. Access Django Admin
Open: `http://localhost:8000/admin`
Login with your superuser credentials

### 5. Add Sample Data

#### Option A: Through Django Admin
1. Go to http://localhost:8000/admin
2. Add Verticals (Categories)
3. Add Products under each vertical
4. Add VerticalProducts (product list items)

#### Option B: Using Django Shell
```bash
python manage.py shell
```

Then run:
```python
from api.models import Vertical, VerticalProduct, Product

# Create Groceries & Staples
v1 = Vertical.objects.create(
    title='Groceries & Staples',
    description='Certified organic pulses, premium grains, authentic spice blends',
    icon_name='Wheat',
    secondary_icon_name='Leaf',
    gradient='from-amber-500 to-orange-600',
    bg_gradient='from-primary-50 to-amber-50',
    image='verticals/groceries.jpg',  # Upload image first
    button_color='from-amber-500 to-orange-600',
    button_text='REQUEST QUOTE',
    order=1
)

# Add products under vertical
VerticalProduct.objects.create(vertical=v1, name='Certified Organic Pulses', order=1)
VerticalProduct.objects.create(vertical=v1, name='Premium Quality Grains', order=2)

# Add actual products
Product.objects.create(
    vertical=v1,
    name='Organic Kabuli Chana',
    description='Premium quality organic chickpeas',
    image='products/chana.jpg',
    moq='MOQ: 100 kg',
    packaging='Bulk/Custom',
    badge='Organic',
    order=1
)
```

### 6. Test API Endpoints

Open in browser or use Postman:

- **Verticals**: http://localhost:8000/api/verticals/
- **Products**: http://localhost:8000/api/products/
- **Products by category**: http://localhost:8000/api/products/?category=1

### 7. Start React Frontend

In a new terminal:
```bash
# Make sure you're in the project root
npm run dev
```

React will run at: `http://localhost:5173` or `http://localhost:3000`

## 🔧 Troubleshooting:

### If migrations fail:
```bash
python manage.py makemigrations api
python manage.py migrate
```

### If CORS errors occur:
Check `backend/backend/settings.py` - CORS_ALLOWED_ORIGINS should include your React URL

### If images don't show:
1. Create `backend/media/` folder
2. Create `backend/media/verticals/` and `backend/media/products/` folders
3. Upload images through Django admin

## 📁 Project Structure:

```
wesrend/
├── backend/                 # Django backend
│   ├── api/                # API app
│   │   ├── models.py       # Database models
│   │   ├── serializers.py  # API serializers
│   │   ├── views.py        # API views
│   │   ├── urls.py         # API URLs
│   │   └── admin.py        # Admin configuration
│   ├── backend/            # Django settings
│   │   ├── settings.py     # Main settings
│   │   └── urls.py         # Main URLs
│   ├── media/              # Uploaded files (create this)
│   └── manage.py           # Django management
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── services/          # API service layer
│       └── api.js         # API calls
└── .env.example           # Environment variables

```

## 🎯 API Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/verticals/` | List all categories |
| GET | `/api/verticals/{id}/` | Get single category |
| GET | `/api/products/` | List all products |
| GET | `/api/products/{id}/` | Get single product |
| GET | `/api/products/?category=1` | Filter by category |
| POST | `/api/contact/` | Submit contact form |
| POST | `/api/quote-request/` | Submit quote request |

## 📝 Sample Data Format:

### Vertical (Category):
```json
{
  "title": "Groceries & Staples",
  "description": "Certified organic pulses...",
  "icon_name": "Wheat",
  "secondary_icon_name": "Leaf",
  "gradient": "from-amber-500 to-orange-600",
  "bg_gradient": "from-primary-50 to-amber-50",
  "image": "/media/verticals/groceries.jpg",
  "button_color": "from-amber-500 to-orange-600",
  "button_text": "REQUEST QUOTE",
  "products": [
    {"name": "Certified Organic Pulses"},
    {"name": "Premium Quality Grains"}
  ]
}
```

### Product:
```json
{
  "name": "Organic Kabuli Chana",
  "description": "Premium quality organic chickpeas",
  "image": "/media/products/chana.jpg",
  "moq": "MOQ: 100 kg",
  "packaging": "Bulk/Custom",
  "badge": "Organic",
  "vertical": 1,
  "vertical_name": "Groceries & Staples"
}
```

## 🎨 Icon Names Available:

- `Wheat` - For groceries
- `Snowflake` - For frozen items
- `Box` - For processed foods
- `Leaf` - For organic items
- `Package` - For packaged items
- `ShoppingBasket` - For general products

## ✅ Checklist:

- [ ] Django migrations run
- [ ] Superuser created
- [ ] Django server running (port 8000)
- [ ] Sample data added
- [ ] React server running (port 3000/5173)
- [ ] API endpoints tested
- [ ] Frontend loading data from backend
- [ ] Contact form submitting to backend

## 🎉 You're All Set!

Your website is now fully integrated with Django backend!

- **Frontend**: http://localhost:3000 or http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
