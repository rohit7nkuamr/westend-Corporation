"""
Auto-trigger pre-rendering when products are added/updated via Django admin
"""
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Product
import subprocess
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Product)
def product_saved(sender, instance, created, **kwargs):
    """
    Trigger pre-rendering when a product is created or updated
    """
    if created:
        logger.info(f"New product created: {instance.name} (slug: {instance.slug})")
        action = "created"
    else:
        logger.info(f"Product updated: {instance.name} (slug: {instance.slug})")
        action = "updated"
    
    # Trigger pre-rendering in background
    try:
        # Run npm run prerender in background
        subprocess.Popen(
            ['npm', 'run', 'prerender'],
            cwd='/var/www/westend-Corporation',
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        logger.info(f"✅ Pre-rendering triggered for {action} product: {instance.name}")
    except Exception as e:
        logger.error(f"❌ Failed to trigger pre-rendering: {e}")

@receiver(post_delete, sender=Product)
def product_deleted(sender, instance, **kwargs):
    """
    Trigger pre-rendering when a product is deleted
    """
    logger.info(f"Product deleted: {instance.name}")
    
    # Trigger pre-rendering to update sitemap
    try:
        subprocess.Popen(
            ['npm', 'run', 'prerender'],
            cwd='/var/www/westend-Corporation',
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        logger.info(f"✅ Pre-rendering triggered after product deletion")
    except Exception as e:
        logger.error(f"❌ Failed to trigger pre-rendering: {e}")
