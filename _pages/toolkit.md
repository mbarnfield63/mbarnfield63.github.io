---
published: false # hidden for now; remove this line to restore
layout: page
title: AI toolkit
permalink: /toolkit/
description: How I actually run Claude Code day to day — custom skills, hooks, and agentic workflows built on top of PhD research work.
nav: true
nav_order: 4
---

<div class="toolkit">
{% assign sorted_toolkit = site.toolkit | sort: "order" %}
<ul>
  {% for entry in sorted_toolkit %}
  <li>
    <a href="{{ entry.url | relative_url }}">{{ entry.title }}</a>
    {% if entry.description %} — {{ entry.description }}{% endif %}
  </li>
  {% endfor %}
</ul>
</div>
