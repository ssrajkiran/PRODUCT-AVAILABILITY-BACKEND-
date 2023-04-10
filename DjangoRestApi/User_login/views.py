from django.conf import settings
from django.http import JsonResponse
from grpc import Status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from DjangoRestApi.settings import SECRET_KEY
from User_login.serializers import UserSerializer
from User_login.models import user
import jwt, datetime
from rest_framework.permissions import IsAuthenticated

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
   


class LoginView(APIView):
    def post(self, request):

        email = request.data['email']
        password = request.data['password']

        user_details = user.objects.filter(email=email).first()

        if user_details is None:
            raise AuthenticationFailed('User not found!')

        if not user_details.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        access_token_payload = {
            'id': user_details.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow(),
            'email' : user_details.email
        }

        refresh_token_payload = {
            'id': user_details.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow(),
            'email' : user_details.email
        }

        access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256').decode("utf-8")

        refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256').decode("utf-8")

        response = Response()

        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data = {
            'access_token': access_token,
            'refresh_token' : refresh_token
        }
        return response



class UserView(APIView):
    # permission_classes = [IsAuthenticated]
  
    def get(self,request):
        try:
            jwt_token = request.headers.get('Authorization', '').split(' ')[-1] or request.data.get('token')
            
        except:
             raise Exception 
        if jwt_token:
            try:
                payload = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms='HS256')
                return Response({'payload': payload}, status=status.HTTP_200_OK)
            except jwt.ExpiredSignatureError:
                return Response({'error': 'Token has expired'}, status=status.HTTP_400_BAD_REQUEST)
            except jwt.InvalidTokenError:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)
        

class RefreshView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            raise AuthenticationFailed('No refresh token!')

        try:
            payload = jwt.decode(refresh_token, 'refresh_secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Expired refresh token!')

        user_detail = user.objects.filter(id=payload['id']).first()

        access_token_payload = {
            'id': user_detail.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow(),
            'email' : user_detail.email
        }

        access_token = jwt.encode(access_token_payload, 'access_secret', algorithm='HS256').decode('utf-8')

        response = Response()

        response.data = {
            'access_token': access_token
        }
        return response




class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
