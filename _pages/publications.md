---
layout: profile
title: "Publications"
permalink: /publications/
author_profile: true
profile_layout: true
---

{% if site.author.googlescholar %}
You can find my up-to-date publication list on [Google Scholar]({{ site.author.googlescholar }}).
{% endif %}

{% assign publication_years = site.data.publications | group_by: "year" | sort: "name" | reverse %}
{% for year in publication_years %}

## {{ year.name }}

{% for publication in year.items %}
{% include publication.html publication=publication %}
{% endfor %}
{% endfor %}

<p class="publication-note">* Equal contribution</p>
