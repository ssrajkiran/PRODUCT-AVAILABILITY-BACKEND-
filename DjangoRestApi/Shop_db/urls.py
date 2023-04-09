from django.urls import path
from Shop_db.views import ProductList, ProductDetail, ShopList, ShopDetail

urlpatterns = [
    path('products', ProductList.as_view(), name='product_list'),
    path('products/<int:pk>', ProductDetail.as_view(), name='product_detail'),
    path('shops', ShopList.as_view(), name='shop_list'),
    path('shops/<int:pk>', ShopDetail.as_view(), name='shop_detail'),
    
]
