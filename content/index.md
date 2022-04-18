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
{% assign strings = site.data.strings %}
<a href="#left-col" class="button button--skip-link">{{ strings.skip_to_filters }}</a>
<a href="#courses-list" class="button button--skip-link">{{ strings.skip_to_results }}</a>
<div class="header-sup" id="main">
    <p>{{ strings.sub_header_info_list }}</p>
    {% include_cached button.html type="link" label=strings.button_to_form_label class="more" href="submit-a-resource" %}
    <p><em> {{ strings.sub_header_note }}
    </em></p>
</div>
{% assign defaultSort = site.data.sorting.first.sortkey %}
{% include sort-data-folder.liquid data=site.data.submissions sortKey=defaultSort %} 
<div id="app">
    <div id="left-col" class="courses-filters">
        <form data-filter-form action="...">
            <h2>{{ strings.filters_title }}</h2>
            {% for filter in site.data.filters %}
            <fieldset id="{{ filter.id }}">
                {% if filter.info %}
                <legend class="label">{{ filter.name }}</legend>
                <button type="button" class="showhidebutton button-small helperbutton" aria-expanded="false"
                        aria-controls="info_about{{ filter.name}}" data-target="#info_about{{ filter.name }}" data-showtext="{{ strings.show_info }}"
                        data-hidetext="{{ strings.hide_info }}">{{ strings.show_info }}</button>
                {% assign helper = site.data.helpers | where: "id", filter.id %}
                <div class="helperinfo" id="info_about{{ filter.name}}" hidden="hidden">
                    <p>{{ helper[0].description }}</p>
                </div>
                {% else %}
                 <legend class="label">{{ filter.name }}</legend>
                {% endif %}
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
            {% for course in site.data.submissions %}
                {% assign langAvailable = langAvailable | concat: course[1].language %} 
                {% assign countriesAvailable = countriesAvailable | concat: course[1].country %} 
            {% endfor %}
            {% assign langAvailable = langAvailable | uniq %}
            {% assign countriesAvailable = countriesAvailable | uniq %}
            <fieldset id="language-filter">
                <legend>Language</legend>
                <div class="filter-options field">
                    <select name="language" id="language">
                        <option value="">--{{ strings.select_option_default }}--</option>
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
                        <option value="">--{{ strings.select_option_default }}--</option>
                        {% for country in orderedCountries %}
                        <option value="{{ country[2] }}">{{ country[0] }} ({{ country[1] }})</option>
                        {% endfor %}
                    </select>
                </div>
            </fieldset>
        </form>
        {% include_cached button.html label=strings.clear_filters_button_label class="secondary button-clear-button"%}
        <div id="disclaimer">
            <h2>{{ strings.disclaimer_title }}</h2>
            {{ strings.disclaimer_text }}
        </div>
    </div>
    <div id="courses-list">
        <div class="courses-list-header">
            <div class="field">
                <input type="search" id="search" placeholder="Search courses">
            </div>
            <div class="field" class="sort-by">
                <h4><label for="select">{{ strings.sortby_title }}</label></h4>
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
        <div id="status" tabindex="0">
            <h4 id="total-courses">{{ strings.showing }} <span>{{ itemsSorted | size }} {{ strings.courses }}</span></h4>
        </div>  
        <div class="box hidden-element results-box">
            <div id="filter-courses-info" class="box-h">
                <h4 id="default-results-title">Current filter criteria</h4>
                <h4 id="no-results-title">Sorry, but no courses match the following criteria:</h4>
                <div class="div-clear-filters">
                    {% include_cached button.html label=strings.clear_filters_button_label class="secondary button-clear-button" %}
                </div>
            </div>
            <div class="details-criteria box-i"></div>
        </div>
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
    {% include_cached button.html type="link" label=strings.button_to_form_label class="more" href="submit-a-resource" %}  
</div>

<script>
{% include js/courses.js %}
</script>
