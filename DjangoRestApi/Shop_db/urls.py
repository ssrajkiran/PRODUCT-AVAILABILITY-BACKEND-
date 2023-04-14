from django.urls import path
from Shop_db.views import  ShopList,ShopDetail
from Shop_db.auth import RefreshView,LoginView,LogoutView,UserView,RegisterView
urlpatterns = [
 
    path('shops/', ShopList.as_view()),
    path('shops/<str:pk>/', ShopDetail.as_view()),
   


    path('register', RegisterView.as_view()),


    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('refresh-token', RefreshView.as_view(), name='refresh_token'),
    path('user', UserView.as_view(), name='user'),
     path('product/<str:pk>', UserView.as_view(), name='user'),
]
