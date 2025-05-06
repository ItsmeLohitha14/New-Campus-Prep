from django.contrib import admin
from django.urls import path
from api.views import ping  # ✅ import the ping view from the api app

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ping/', ping),
]
