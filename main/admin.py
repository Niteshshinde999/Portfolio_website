from django.contrib import admin
from .models import Skills, Certification, Projects, Experience, Myinfo, Resume, Tool, ContactDetail, Link, Screenshot

# Register your models here.
admin.site.register(Myinfo)
admin.site.register(Skills)
admin.site.register(Certification)
# admin.site.register(Projects)
admin.site.register(Experience)
admin.site.register(Resume)

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class ScreenshotInline(admin.TabularInline):
    model = Screenshot
    extra = 1
    fields = ('image', 'caption', 'explanation')  # Show explanation in admin


@admin.register(Projects)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title',)
    filter_horizontal = ('tools',)
    inlines = [ScreenshotInline]

@admin.register(Link)
class LinksAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(ContactDetail)
class ContactDetailAdmin(admin.ModelAdmin):
    list_display = ('name',)
    filter_horizontal = ('links',)