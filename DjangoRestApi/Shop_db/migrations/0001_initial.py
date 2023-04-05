# Generated by Django 3.2.6 on 2023-04-05 08:29

import Shop_db.models
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='shop',
            fields=[
                ('shop_id', models.IntegerField(primary_key=True, serialize=False)),
                ('shop_name', models.CharField(max_length=255)),
                ('shop_address', models.TextField(blank=True, null=True)),
                ('product', djongo.models.fields.ArrayField(model_container=Shop_db.models.product)),
            ],
        ),
    ]