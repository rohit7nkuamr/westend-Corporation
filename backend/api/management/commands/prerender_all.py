"""
Django management command to manually trigger pre-rendering
Usage: python manage.py prerender_all
"""
from django.core.management.base import BaseCommand
import subprocess
import os

class Command(BaseCommand):
    help = 'Pre-render all pages for SEO optimization'

    def add_arguments(self, parser):
        parser.add_argument(
            '--async',
            action='store_true',
            help='Run pre-rendering in background',
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🚀 Starting pre-rendering process...'))
        
        project_root = '/var/www/westend-Corporation'
        
        try:
            if options['async']:
                # Run in background
                subprocess.Popen(
                    ['npm', 'run', 'prerender'],
                    cwd=project_root,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL
                )
                self.stdout.write(self.style.SUCCESS('✅ Pre-rendering started in background'))
            else:
                # Run synchronously and show output
                result = subprocess.run(
                    ['npm', 'run', 'prerender'],
                    cwd=project_root,
                    capture_output=True,
                    text=True
                )
                
                if result.returncode == 0:
                    self.stdout.write(self.style.SUCCESS('✅ Pre-rendering completed successfully!'))
                    self.stdout.write(result.stdout)
                else:
                    self.stdout.write(self.style.ERROR('❌ Pre-rendering failed!'))
                    self.stdout.write(self.style.ERROR(result.stderr))
                    
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error: {e}'))
