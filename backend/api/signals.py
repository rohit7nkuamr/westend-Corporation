from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Product, Vertical
from .utils import compress_image


@receiver(pre_save, sender=Product)
def compress_product_images(sender, instance, **kwargs):
    """Compress product images before saving"""
    if instance.image:
        instance.image = compress_image(instance.image)
    if instance.image_2:
        instance.image_2 = compress_image(instance.image_2)
    if instance.image_3:
        instance.image_3 = compress_image(instance.image_3)


@receiver(pre_save, sender=Vertical)
def compress_vertical_image(sender, instance, **kwargs):
    """Compress vertical images before saving"""
    if instance.image:
        instance.image = compress_image(instance.image)
