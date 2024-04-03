from django.urls import path

from trans import views



urlpatterns = [

path('test1', views.test1, name="test1"),
path('home', views.home, name="home")

]
