from django.core.management.base import BaseCommand
from api.models import Product, Vertical
from api.utils import compress_image
from django.core.files import File
import os


class Command(BaseCommand):
    help = 'Compress all existing product and vertical images'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting image compression...'))
        
        # Compress Product images
        products = Product.objects.all()
        total_products = products.count()
        compressed_count = 0
        
        self.stdout.write(f'Found {total_products} products to process')
        
        for i, product in enumerate(products, 1):
            self.stdout.write(f'Processing product {i}/{total_products}: {product.name}')
            
            # Compress main image
            if product.image:
                try:
                    original_size = product.image.size
                    product.image = compress_image(product.image)
                    product.save(update_fields=['image'])
                    new_size = product.image.size
                    reduction = ((original_size - new_size) / original_size) * 100
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'  - Image: {original_size/1024:.1f}KB → {new_size/1024:.1f}KB ({reduction:.1f}% reduction)'
                        )
                    )
                    compressed_count += 1
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'  - Error compressing image: {e}'))
            
            # Compress image_2
            if product.image_2:
                try:
                    product.image_2 = compress_image(product.image_2)
                    product.save(update_fields=['image_2'])
                    compressed_count += 1
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'  - Error compressing image_2: {e}'))
            
            # Compress image_3
            if product.image_3:
                try:
                    product.image_3 = compress_image(product.image_3)
                    product.save(update_fields=['image_3'])
                    compressed_count += 1
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'  - Error compressing image_3: {e}'))
        
        # Compress Vertical images
        verticals = Vertical.objects.all()
        total_verticals = verticals.count()
        
        self.stdout.write(f'\nFound {total_verticals} verticals to process')
        
        for i, vertical in enumerate(verticals, 1):
            self.stdout.write(f'Processing vertical {i}/{total_verticals}: {vertical.title}')
            
            if vertical.image:
                try:
                    original_size = vertical.image.size
                    vertical.image = compress_image(vertical.image)
                    vertical.save(update_fields=['image'])
                    new_size = vertical.image.size
                    reduction = ((original_size - new_size) / original_size) * 100
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'  - Image: {original_size/1024:.1f}KB → {new_size/1024:.1f}KB ({reduction:.1f}% reduction)'
                        )
                    )
                    compressed_count += 1
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'  - Error compressing image: {e}'))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\n✓ Compression complete! Compressed {compressed_count} images.'
            )
        )
