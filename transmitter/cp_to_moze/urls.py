from django.urls import path
#now import the views.py file into this code
from . import views
urlpatterns=[
  path('',views.index),
  path('stream/', views.sse_stream, name='sse_stream'),
]