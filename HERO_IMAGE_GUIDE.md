# Hero Section Image Management Guide

## How Hero Images Work

The hero section displays a **rotating carousel** of images from your **Verticals** (product categories). Each vertical's image will appear in the hero section slideshow.

## Adding/Changing Hero Images

### Through Admin Panel (Recommended)

1. **Login to Admin Panel**
   - Go to: `https://westendcorporation.in/admin/`
   - Login with your credentials

2. **Navigate to Verticals**
   - Click on **"Verticals"** in the sidebar (under API section)
   - You'll see a list of all your product categories

3. **Edit a Vertical to Change Its Image**
   - Click on any vertical (e.g., "Grains & Cereals", "Frozen Foods", etc.)
   - You'll see the edit form with the **Image** field
   - Click **"Choose File"** to upload a new image
   - Click **"Save"** at the bottom

4. **Activate/Deactivate Verticals**
   - Only **active verticals** (is_active = ✓) will show in the hero carousel
   - Uncheck "Is active" to remove a vertical from the hero section

5. **Control the Order**
   - Verticals are displayed in order (lower order number = shown first)
   - The `order` field controls the sequence in the carousel

## Image Requirements

### Recommended Specifications

- **Dimensions**: 1920x500px or 2070x600px (wide landscape format)
- **Aspect Ratio**: 16:9 or similar wide format
- **File Format**: JPG, PNG, or WebP
- **File Size**: Under 500KB (optimized for web)
- **Quality**: High-resolution but compressed

### Image Tips

✅ **DO:**
- Use high-quality professional photos
- Ensure images are well-lit and clear
- Show your products or business in action
- Use consistent styling across all images
- Compress images before uploading

❌ **DON'T:**
- Use portrait or square images (they won't fill the space)
- Upload huge files (will slow down page load)
- Use watermarked stock photos
- Mix different visual styles

## Current Hero Behavior

- **Auto-rotate**: Images change every 5 seconds
- **Smooth transitions**: Fade effect between images
- **Gradient overlay**: Semi-transparent dark gradient over images
- **Full-width**: Images span the entire screen width
- **Fixed height**: 500px tall on all screens

## Quick Actions

### Add a New Hero Image
1. Click **"+ Add"** next to "Verticals" in admin
2. Fill in the vertical details
3. Upload your hero image
4. Set `is_active` to ✓
5. Save

### Replace an Existing Image
1. Go to **Verticals** in admin
2. Click on the vertical you want to edit
3. Click **"Choose File"** next to the current image
4. Select new image
5. Save

### Remove an Image from Hero
1. Go to **Verticals** in admin
2. Click on the vertical
3. Uncheck **"Is active"**
4. Save

## Troubleshooting

**Image not showing?**
- Check if vertical is active (✓ Is active)
- Verify image uploaded successfully
- Clear browser cache

**Image looks blurry?**
- Upload higher resolution (1920x500px minimum)
- Ensure wide aspect ratio (16:9)
