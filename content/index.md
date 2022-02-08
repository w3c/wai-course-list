---
title: "List of Accessibility Courses"
title_html: "List of Accessibility Courses:<br>Education, training, and certification" 
nav_title: "List of Courses"
doc-note-type: draft
lang: en
last_updated: 2021-@@-@@
github:
  repository: w3c/wai-course-list
  path: content/index.md
permalink: /course-list/
ref: /teach-advocate/course-list/
changelog: /teach-advocate/course-list/changelog/
acknowledgements: /teach-advocate/course-list/acknowledgements/
description:  # NEW: add a 150ish-character-description for social media   # translate the description
# image: /content-images/wai-course-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
footer: >
   <p><strong>Date:</strong> <!-- Updated @@ Month 2021.--> First published Month 20@@. CHANGELOG.</p>
   <p><strong>Editors:</strong> @@name, @@name. <strong>Contributors:</strong> @@name, @@name, and <a href="https://www.w3.org/groups/wg/eowg/participants">participants of the EOWG</a>. ACKNOWLEDGEMENTS lists contributors and credits.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>
---

<style> 
{% include css/styles.css %}
</style>
<a href="#left-col" class="button button--skip-link">Skip to filters</a>
<a href="#courses-list" class="button button--skip-link">Skip to results</a>
<div class="header-sup" id="main">
    <p>This List of Courses provides information about courses, training, and certification on web accessibility from different providers. It is meant to help you make informed decisions when choosing a resource. You can filter submissions to find those matching your specific interests and needs. If you wish to add or update information about a course, training, or certification on web accessibility, please use the following button.</p>
    {% include_cached button.html type="link" label="Submit a course, training, or certification" class="more" href="submit-a-resource" %}
    <p><em>Please note that the list items are provider-submitted, not <abbr title="World Wide Web Consortium">W3C</abbr>-endorsed. See the full <a href="#disclaimer">disclaimer</a> for more information about provider-submitted content.
    </em></p>
</div>
{% assign defaultSort = site.data.sorting.first.sortkey %}
{% include sort-data-folder.liquid data=site.data.courses sortKey=defaultSort %} 
<div id="app">
    <div id="left-col" class="courses-filters">
        <form data-filter-form action="...">
            <h2>Filters</h2>
            {% for filter in site.data.filters %}
            <fieldset id="{{ filter.id }}">
                <legend class="label">
                {% if filter.info %}
                <details class="helper">
                    <summary>
                        {{ filter.name }} {% include image.html src="info.svg" alt="alternative text" class="icon" %}
                    </summary>
                    {% assign helper = site.data.helpers | where: "id", filter.id %}
                    <div>{{ helper[0].description }}</div>
                </details>
                {% else %}
                    {{ filter.name }}
                {% endif %}
                </legend>
                {% for option in filter.options %}
                <div class="filter-options field">
                    <input type="{{ filter.type }}" id="filter-{{ option.id }}" name="{{ option.id }}">
                    <label for="filter-{{ option.id }}"><span class='filterName'>{{ option.name }}</span> <span class="filterPreCounter"></span></label>
                </div>
                {% endfor %}
            </fieldset>
            {% endfor %}
            {% assign langAvailable = "" | split: "," %}
            {% assign countriesAvailable = "" | split: "," %}
            {% for course in site.data.courses %}
                {% assign langAvailable = langAvailable | concat: course[1].language %} 
                {% assign countriesAvailable = countriesAvailable | concat: course[1].country %} 
            {% endfor %}
            {% assign langAvailable = langAvailable | uniq %}
            {% assign countriesAvailable = countriesAvailable | uniq %}
            <fieldset id="language-filter">
                <legend>Language</legend>
                <div class="filter-options field">
                    <select name="language" id="language">
                        <option value="">--Select an option--</option>
                        {% for language in langAvailable %}
                        <option value="{{ language }}">{{ site.data.lang[language].name }} ({{
                            site.data.lang[language].nativeName}})</option>
                        {% endfor %}
                    </select>
                </div>
            </fieldset>
            {% include sort-countries.liquid data=countriesAvailable %}
            <fieldset id="contry-filter">
                <legend>Country</legend>
                <div class="filter-options field">
                    <select name="country" id="country">
                        <option value="">--Select an option--</option>
                        {% for country in orderedCountries %}
                        <option value="{{ country[2] }}">{{ country[0] }} ({{ country[1] }})</option>
                        {% endfor %}
                    </select>
                </div>
            </fieldset>
        </form>
        {% include_cached button.html label="Clear filters" class="clear-button"%}
        <div id="disclaimer">
            <h2>Important Disclaimer</h2>
            <p><abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific vendor products. Inclusion of resources in this list does not indicate endorsement by W3C. Products and search criteria are listed with no quality rating.</p>
            <p>Courses descriptions, search criteria, and other information in this database are provider-submitted. W3C does not verify the accuracy of the information.</p>
            <p>The list is not a review of courses, nor a complete or definitive list of all courses. The information can change at any time.</p>
        </div>
    </div>
    <div id="courses-list">
        <div class="courses-list-header">
            <div class="field">
                <input type="search" id="search" placeholder="Search courses">
            </div>
            <span id="status">
                <h4 id="total-courses">{{ itemsSorted | size }} courses</h4>
            </span>
            <div class="field" class="sort-by">
                <h4><label for="select">Sort by</label></h4>
                <select id="select" class="field">
                    {% for sort in site.data.sorting %}
                        {% if sort.selected == "true" %}
                            <option value="{{ sort.id }}" selected>{{ sort.name }}</option>
                        {% else %}
                            <option value="{{ sort.id }}">{{ sort.name }}</option>
                        {% endif %}
                    {% endfor %}
                </select>
            </div>       
        </div>
        <div id="filter-courses-info"></div>
        {% include_cached button.html label="Clear filters" class="clear-button"%}
        {% include excol.html type="all" %}
        <div class="courses-list">
            {% for course in itemsSorted %}
                {% include course.liquid %}
            {% endfor %}            
        </div>
        <!--         
        {% for course in itemsSorted %}
            {% include course.liquid %}
        {% endfor %}    
 -->    </div>
    
</div>
<div class="button-submit-end">
    {% include_cached button.html type="link" label="Submit a course, training, or certification" class="more" href="submit-a-resource" %}  
</div>

<script>
{% include js/courses.js %}
</script>
