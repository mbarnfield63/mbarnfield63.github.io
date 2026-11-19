---
layout: page
permalink: /publications/
title: Publications
description: Papers in reverse date order, then talks.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

<h2 id="talks">Talks</h2>

<!-- From _data/talks.yml, laid out like the bibliography entries above. -->
<div class="publications">
{% assign talks_by_year = site.data.talks | group_by: "year" %}
{% for year in talks_by_year %}
  <h2 class="bibliography">{{ year.name }}</h2>
  <ol class="bibliography">
  {% for talk in year.items %}
    <li>
      <div class="row">
        <div class="col col-sm-2 abbr"><abbr class="badge rounded w-100">{{ talk.badge }}</abbr></div>
        <div class="col-sm-8">
          <div class="title"><a href="{{ talk.url | relative_url }}">{{ talk.title }}</a></div>
          <div class="author">{{ talk.event }}</div>
          <div class="periodical"><em>{{ talk.kind }}</em>, {{ talk.date }}</div>
        </div>
      </div>
    </li>
  {% endfor %}
  </ol>
{% endfor %}
</div>
