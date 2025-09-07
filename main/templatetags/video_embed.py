from django import template
from urllib.parse import urlparse, parse_qs

register = template.Library()

@register.filter
def video_embed(url):
    """
    Converts YouTube or Vimeo URL to embed URL for iframe.
    Supports standard YouTube, youtu.be, and Vimeo URLs.
    """
    if not url:
        return ''
    url = url.strip()

    # YouTube standard
    if "youtube.com/watch" in url:
        query = parse_qs(urlparse(url).query)
        video_id = query.get("v")
        if video_id:
            return f"https://www.youtube.com/embed/{video_id[0]}"

    # YouTube short URL
    elif "youtu.be/" in url:
        video_id = url.split('/')[-1]
        return f"https://www.youtube.com/embed/{video_id}"

    # Vimeo
    elif "vimeo.com/" in url:
        path = urlparse(url).path
        video_id = path.strip('/').split('/')[-1]
        if video_id.isdigit():
            return f"https://player.vimeo.com/video/{video_id}"

    return url
