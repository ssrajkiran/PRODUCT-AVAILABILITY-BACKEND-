from django.urls import path
from User_login.views import UserDetail,UserList

urlpatterns = [
    path('user', UserList.as_view(), name='User_list'),
    path('user/<int:pk>', UserDetail.as_view(), name='User_detail'), 
]
