---
layout: default
title: "the memoryleak zone : blog"
nav_title: blog
nav_order: 5
permalink: /pages/blog/
---

# blog

i ramble a lot here.

{% for post in site.posts %}
<a href="{{ post.url }}" style="font-weight: Bold; font-size: 24px;">{{ post.title | remove: "the memoryleak zone : " }} ({{ post.date | date: "%-m/%-d/%Y" }})</a>

{{ post.desc }}

{% endfor %}
