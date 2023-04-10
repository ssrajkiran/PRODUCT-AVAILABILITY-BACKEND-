from django.urls import path
from User_login.views import RegisterView, LoginView, LogoutView,RefreshView,UserView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('refresh-token', RefreshView.as_view(), name='refresh_token'),
    path('user', UserView.as_view(), name='user'),
]
