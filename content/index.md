---
published: false
title: "Course List"
title_html: "Course List of Digital Accessibility Education, Training, and Certification" 
nav_title: "Course List"
doc-note-type: draft
lang: en
last_updated: 2021-@@-@@
github:
  repository: w3c/wai-course-list
  path: content/index.md
permalink: /courses/list/
ref: /teach-advocate/course-list/
description:  # NEW: add a 150ish-character-description for social media   # translate the description
# image: /content-images/wai-course-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
footer: 
   <p><strong>Date:</strong> Updated 07 June 2021. First published June 2022.</p>
   <p><strong>Editors:</strong> Carlos Duarte and Letícia Seixas Pereira. <span>Contributors:<span> <a href="https://www.w3.org/WAI/about/groups/eowg/participants/">EOWG Participants</a>.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>
---

<style> 
{% include wai-course-list/css/styles.css %}
</style>
{% assign strings = site.data.wai-course-list.strings %}
<a href="#filters_title" class="button button--skip-link" accesskey="f">{{ strings.skip_to_filters }}</a>
<a href="#status" class="button button--skip-link" accesskey="r">{{ strings.skip_to_results }}</a>
<div class="header-sup" id="main">
    <div class="header-left">
        <p>{{ strings.sub_header_list_intro }}</p>
        {% include_cached button.html type="link" label=strings.button_to_form_label class="more" href="../submission" %}
    </div>
    <div class="header-right">
        {% include box.html type="start" class="simple" %}
        <p>{{strings.edit_remove_info}}: <a href="mailto:group-wai-list-courses@w3.org?subject=Update%20course">{{strings.contact_email_list_courses}}</a></p>
        {% include box.html type="end" %}
    </div>
    <div class="header-full"><p><em>{{ strings.sub_header_note }}</em></p></div>

</div>
{% assign defaultSort = site.data.wai-course-list.sorting.first.sortkey %}
{% include wai-course-list/sort-data-folder.liquid data=site.data.wai-course-list.submissions sortKey=defaultSort %} 
<div id="app">
    <div id="left-col" class="courses-filters">
        <form data-filter-form action="...">
            <h2 id="filters_title">{{ strings.filters_title }}</h2>
            {% include box.html type="start" class="simple infobox"%}
            <svg focusable="false" aria-label="Information about the filters" class="i-info"><use xlink:href="/assets/images/icons.svg#icon-info"></use></svg>
            {{strings.filters_info}}
            {% include box.html type="end" %}
            {% for filter in site.data.wai-course-list.filters %}
            <fieldset id="{{ filter.id }}">
                {% if filter.info %}
                <legend class="label">{{ filter.name }}</legend>
                <button type="button" class="showhidebutton button-small helperbutton" aria-label="{{strings.info_about}} {{ filter.name }}" aria-expanded="false" aria-controls="info_about{{ filter.name}}" data-target="#info_about{{ filter.name }}" data-showtext="{{ strings.show_info }}" data-hidetext="{{ strings.hide_info }}">{{ strings.show_info }}</button>
                {% assign helper = site.data.wai-course-list.helpers | where: "id", filter.id %}
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
            {% for course in site.data.wai-course-list.submissions %}
                {% assign langAvailable = langAvailable | concat: course[1].language %} 
                {% assign countriesAvailable = countriesAvailable | concat: course[1].country %} 
            {% endfor %}
            {% assign langAvailable = langAvailable | uniq %}
            {% assign countriesAvailable = countriesAvailable | uniq %}
            <fieldset>
                <legend id="language_label">Language</legend>
                <div class="filter-options field">
                    <select name="language" id="language" aria-labelledby="language_label">
                        <option value="">--{{ strings.select_option_default }}--</option>
                        {% for language in langAvailable %}
                        <option value="{{ language }}">{{ site.data.wai-course-list.lang[language].name }} ({{
                            site.data.wai-course-list.lang[language].nativeName}})</option>
                        {% endfor %}
                    </select>
                </div>
                <p class="expl" tabindex=0>
                <span class="total-select-courses" id="total-select-courses-lang">{{itemsSorted | size}} {{strings.select_info}} </span> <span id="total-lang-courses">{{langAvailable | size}} {{strings.select_language_info_multiple_results}}</span>
                </p>
            </fieldset>
            {% include wai-course-list/sort-countries.liquid data=countriesAvailable %}
            <fieldset>
                <legend id="country_label">Country</legend>
                <div class="filter-options field">
                    <select name="country" id="country" aria-labelledby="country_label">
                        <option value="">--{{ strings.select_option_default }}--</option>
                        {% for country in orderedCountries %}
                        <option value="{{ country[2] }}">{{ country[0] }} ({{ country[1] }})</option>
                        {% endfor %}
                    </select>
                </div>
                <p class="expl" tabindex=0>
                <span class="total-select-courses" id="total-select-courses-country">{{itemsSorted | size}} {{strings.select_info}} </span> <span id="total-country-courses">{{countriesAvailable | size}} {{strings.select_country_info_multiple_results}}</span> 
                </p>
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
                <input type="search" id="search" placeholder="{{strings.searchbox_placeholder}}">
            </div>
            <div class="field" class="sort-by">
                <label for="select">{{ strings.sortby_title }}</label>
                <select id="select" class="field">
                    {% for sort in site.data.wai-course-list.sorting %}
                        {% if sort.selected == "true" %}
                            <option value="{{ sort.id }}" selected>{{ sort.name }}</option>
                        {% else %}
                            <option value="{{ sort.id }}">{{ sort.name }}</option>
                        {% endif %}
                    {% endfor %}
                </select>
            </div>     
        </div>
        {% capture totalSubmissions %}
        {{ site.data.wai-course-list.submissions | size }}
        {% endcapture %}
        {% capture totalSubmissionsFiltered %}
        {{ itemsSorted | size }}
        {% endcapture %}
        <div id="status" tabindex="0" aria-live="polite" role="status">
            <h2 id="total-courses">{{ strings.showing }} <span>{{ itemsSorted | size }} </span> {{ strings.courses }}</h2>
        </div>  
        <div class="box hidden-element results-box">
            <div id="filter-courses-info" class="box-h">
                <h4 id="default-results-title">{{strings.filtered_criteria_title}}</h4>
                <h4 id="no-results-title">{{strings.no_results_title}}:</h4>
                <div class="div-clear-filters">
                    {% include_cached button.html label=strings.clear_filters_button_label class="secondary button-clear-button" %}
                </div>
            </div>
            <div class="details-criteria box-i"></div>
        </div>
        {% include excol.html type="all" %}
        <div class="courses-list">
            {% for course in itemsSorted %}
                {% include wai-course-list/course.liquid %}
            {% endfor %}            
        </div>
        <!--         
        {% for course in itemsSorted %}
            {% include wai-course-list/course.liquid %}
        {% endfor %}    
 -->    </div>
    
</div>
<div class="button-submit-end">
    {% include_cached button.html type="link" label=strings.button_to_form_label class="more" href="submit-a-resource" %}  
</div>

<script>
{% include wai-course-list/js/courses.js %}
</script>
