from django.shortcuts import render
from django.views.generic import TemplateView, ListView, DetailView
from .models import Skills, Certification, Projects, Experience, Myinfo, Resume, ContactDetail, Link
from django.http import HttpResponse, request
# Create your views here.

class HomeView(TemplateView):
    template_name = "home.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['myinfo'] = Myinfo.objects.all()
        context['skills'] = Skills.objects.all()
        context['certifications'] = Certification.objects.all()
        context['projects'] = Projects.objects.all()
        context['experiences'] = Experience.objects.all()
        context['contacts'] = ContactDetail.objects.all()
        return context

class ProjectListView(ListView):
    model = Projects
    template_name = 'projects.html'
    context_object_name = 'projects'

class ProjectDetailView(DetailView):
    model = Projects
    template_name = 'project_details.html'
    context_object_name = 'project'

class ResumeView(TemplateView):
    template_name = 'resume.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['resume'] = Resume.objects.last()
        return context
    
class ContactDetailView(ListView):
    model = ContactDetail
    template_name = 'contact.html'
    context_object_name = 'contacts'

class ExperienceView(ListView):
    model = Experience
    template_name = 'experience.html'
    context_object_name = 'experiences'