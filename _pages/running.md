---
layout: page
title: running
permalink: /running/
description: Recent runs and personal bests, synced daily from Garmin.
nav: true
nav_order: 6
---

<p class="text-muted">Last synced: {{ site.data.garmin_activities.updated }}</p>

## Personal bests

<div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
{% for r in site.data.garmin_activities.records %}
  <div class="col">
    <div class="card h-100 text-center p-3">
      <h6 class="mb-2">{{ r.label }}</h6>
      <p class="fw-bold fs-4 mb-1">{{ r.value }}</p>
      <small class="text-muted">{{ r.date }}</small>
    </div>
  </div>
{% endfor %}
</div>

## Recent activities

<table class="table table-sm">
  <thead>
    <tr>
      <th>Date</th>
      <th>Activity</th>
      <th>Distance</th>
      <th>Duration</th>
      <th>Avg pace</th>
    </tr>
  </thead>
  <tbody>
    {% for a in site.data.garmin_activities.recent %}
    <tr>
      <td>{{ a.date }}</td>
      <td>{{ a.name }}</td>
      <td>{{ a.distance_km }} km</td>
      <td>{{ a.duration_min }} min</td>
      <td>{{ a.avg_pace_per_km }} /km</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
