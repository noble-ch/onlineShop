# Generated by Django 4.2.5 on 2023-09-27 16:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0010_customorder'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customorder',
            name='product',
        ),
        migrations.RemoveField(
            model_name='customorder',
            name='special_requests',
        ),
        migrations.AddField(
            model_name='customorder',
            name='custom_product_name',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='custom_order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.customorder'),
        ),
        migrations.AddField(
            model_name='order',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='custom_order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.customorder'),
        ),
        migrations.AlterField(
            model_name='customorder',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]