# Generated by Django 4.2.5 on 2023-09-20 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_storereview'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='backorderAvailabilityDate',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='isBackorderAvailable',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='isPreorderAvailable',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='preorderAvailabilityDate',
            field=models.DateField(blank=True, null=True),
        ),
    ]
