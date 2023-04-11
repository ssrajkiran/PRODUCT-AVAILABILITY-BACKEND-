from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Shop_db.serializers import UserSerializer
from Shop_db.models import User
import jwt, datetime
from Shop_db.response import create_response,response_details,payload_details
from rest_framework.permissions import IsAuthenticated
from bson.objectid import ObjectId
class RegisterView(APIView):

    @staticmethod
    def get(request, pk):
        try:
            obj_id = ObjectId(pk)
            shop_obj = User.objects.get(_id=obj_id)
            serializer = UserSerializer(shop_obj)
            if serializer is not None:
                return create_response(message = 'User data available', data = serializer.data ,status_code=status.HTTP_200_OK,status=True,error = "")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Not data available', data ="",status_code="",status=False,error=errors)
        
    @staticmethod
    def post(request):
        try:
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            user_id = serializer.data['_id']
            return create_response(message = 'User fetched successfully', data = RegisterView.view_details(user_id), status_code=status.HTTP_201_CREATED, status=True, error ="")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Fetching shops Failed', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error=errors)
   
    @staticmethod
    def view_details(user_id):
        obj_id = ObjectId(user_id)
        shop_obj = User.objects.get(_id=obj_id)
        serializer = UserSerializer(shop_obj)
        return serializer.data

class LoginView(APIView):
    @staticmethod
    def post(request):
      
        try:
            try:
                email = request.data['email']
                password = request.data['password']
            except Exception as e:
                errors = {'message': str(e)}
                return create_response(message = 'Fill your field', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error=errors)
            
            user_details = User.objects.filter(email=email).first()
          
            if user_details is None:
                 return create_response(message = 'User Not Found', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="UserNotFound")

            if not user_details.check_password(password):
                 return create_response(message = 'Incorrect Password', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="PasswordError")

            shop_obj = User.objects.get(email=user_details.email)
            serializer = UserSerializer(shop_obj)
        

            access_token_payload = {
            'username' : user_details.Username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow(),
            'email' : user_details.email
            }

            refresh_token_payload = {
            'username' : user_details.Username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow(),
            'email' : user_details.email
            }

            access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256').decode("utf-8")

            refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256').decode("utf-8")
          
            response = Response()
            response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)

            response.data = {
            'access_token' : access_token,
            'refresh_token' : refresh_token,
            }
            return response_details(message = 'User fetched successfully', data = serializer.data,status_code=status.HTTP_201_CREATED,status=True,error = "",response=response.data)
        except Exception as e:
             errors = {'message': str(e)}
             return create_response(message = 'Internal Server Error', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error=errors)




class UserView(APIView):
    # permission_classes = [IsAuthenticated]
  
    @staticmethod
    def get(request):
        try:
            jwt_token = request.headers.get('Authorization', '').split(' ')[-1] or request.data.get('token')
            
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Internal Server Error', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error=errors)
        
        if jwt_token:
            try:
                payload = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms='HS256')
                return payload_details(message = 'Payload Details', data =payload,status_code=status.HTTP_202_ACCEPTED,status=True,error="")
             
            except jwt.ExpiredSignatureError:
                return create_response(message = 'Token Expired', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="")
            except jwt.InvalidTokenError:
                return create_response(message = 'Invalid Token', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="")
        else:
            return create_response(message = 'Token Not Provide', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="")
        
        
def cookie(refresh_token,access_token):
    response = Response()

    response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
    response.data = {
            'refresh_token' : refresh_token,
            'access' : access_token
            }
    return response


class RefreshView(APIView):
    permission_classes = [IsAuthenticated]
    @staticmethod
    def post(request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Internal Server Error', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error=errors)
        
        if not refresh_token:
            return create_response(message = 'No Refresh Token', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="")

        try:
            payload = jwt.decode(refresh_token, 'refresh_secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
             return create_response(message = 'Expired Refresh Token', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="")

        user_detail = User.objects.filter(id=payload['id']).first()

        access_token_payload = {
            'id': user_detail.Username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow(),
            'email' : user_detail.email
        }

        access_token = jwt.encode(access_token_payload, 'access_secret', algorithm='HS256').decode('utf-8')

        response = Response()

        response.data = {
            'access_token': access_token
        }
        return response_details(message = 'User fetched successfully', data = user_detail._id ,status_code=status.HTTP_201_CREATED,status=True,error = "",response=response.data)




class LogoutView(APIView):
    @staticmethod
    def post(request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
