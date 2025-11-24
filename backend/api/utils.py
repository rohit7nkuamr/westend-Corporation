from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys


def compress_image(image_field, max_size=(1920, 1920), quality=85):
    """
    Compress and resize an uploaded image.
    
    Args:
        image_field: Django ImageField
        max_size: Tuple of (width, height) maximum dimensions
        quality: JPEG quality (1-100, recommended 80-90)
    
    Returns:
        Compressed InMemoryUploadedFile
    """
    if not image_field:
        return image_field
    
    try:
        # Open the image
        img = Image.open(image_field)
        
        # Convert RGBA to RGB (remove transparency)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize if image is larger than max_size
        if img.width > max_size[0] or img.height > max_size[1]:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # Save to BytesIO with compression
        output = BytesIO()
        img.save(output, format='JPEG', quality=quality, optimize=True)
        output.seek(0)
        
        # Create new InMemoryUploadedFile
        compressed_image = InMemoryUploadedFile(
            output,
            'ImageField',
            f"{image_field.name.split('.')[0]}.jpg",
            'image/jpeg',
            sys.getsizeof(output),
            None
        )
        
        return compressed_image
        
    except Exception as e:
        # If compression fails, return original image
        print(f"Image compression failed: {e}")
        return image_field
