from django.urls import path
from Shop_db.views import ProductList, ProductDetail, ShopList, ShopDetail
from Shop_db.auth import RegisterView, LoginView, LogoutView,RefreshView,UserView
urlpatterns = [
    path('products', ProductList.as_view(), name='product_list'),
    path('products/<int:pk>', ProductDetail.as_view(), name='product_detail'),
    path('shops', ShopList.as_view(), name='shop_list'),
    path('shops/<int:pk>', ShopDetail.as_view(), name='shop_detail'),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('refresh-token', RefreshView.as_view(), name='refresh_token'),
    path('user', UserView.as_view(), name='user'),
]
