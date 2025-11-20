from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_featured',
            field=models.BooleanField(default=False, help_text='Feature this product on the home page'),
        ),
        migrations.AddField(
            model_name='product',
            name='featured_order',
            field=models.IntegerField(default=0, help_text='Order in which featured products appear (lower numbers appear first)'),
        ),
    ]
