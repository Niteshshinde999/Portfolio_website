from django.urls import path
from . import views
urlpatterns=[
    path('', views.HomeView.as_view(), name='home'),
    path('projects/', views.ProjectListView.as_view(), name='projects'),
    path('project/<int:pk>/', views.ProjectDetailView.as_view(), name='project_detail'),
    path('resume/', views.ResumeView.as_view(), name='resume'),
    path('contact/', views.ContactDetailView.as_view(), name='contact-list'),
    path('experience/', views.ExperienceView.as_view(), name='experience'),
]