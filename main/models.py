from django.db import models

# Create your models here.
class Myinfo(models.Model):
    name = models.CharField(max_length=200)
    profile = models.TextField()
    photo = models.ImageField(upload_to='myinfo/', blank=True, null=True)

class Link(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.name

class ContactDetail(models.Model):
    name = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    links = models.ManyToManyField(Link, blank=True)

    def __str__(self):
        return self.name

class Skills(models.Model):
    name = models.CharField(max_length=200)
    proficiency = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class Certification(models.Model):
    title = models.CharField(max_length=300)
    organization = models.CharField(max_length=200)
    date = models.DateField()
    license_no = models.CharField(max_length=300, blank=True, null=True)
    certification_url = models.URLField(blank=True)
    Certification_file = models.FileField(upload_to='certifications/', blank=True, null=True)

    def __str__(self):
        return self.title
    
class Tool(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Projects(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()

    # Media
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    demo_video = models.URLField(blank=True, null=True, help_text="YouTube or Vimeo link")
    readme_file = models.FileField(upload_to='project_readmes/', blank=True, null=True)

    # Links
    link = models.URLField(blank=True, help_text="Project live demo / GitHub link")
    github_repo = models.URLField(blank=True, null=True, help_text="Optional GitHub repo link")

    # Tools
    tools = models.ManyToManyField('Tool', blank=True)

    def __str__(self):
        return self.title
    
class Screenshot(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='screenshots')
    image = models.ImageField(upload_to='project_screenshots/')
    caption = models.CharField(max_length=300, blank=True, null=True)
    explanation = models.TextField(blank=True, null=True, help_text="Short explanation or details about this screenshot.")

    def __str__(self):
        return f"Screenshot of {self.project.title}"

    
class Experience(models.Model):
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.role} at {self.company}"

class Resume(models.Model):
    title = models.CharField(max_length=200, default='My Resume')
    file = models.FileField(upload_to='resume/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
