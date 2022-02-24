---
title: "Submit a course, training, or certification on web accessibility"
nav_title: "Submit a course, training, or certification on web accessibility"
doc-note-type: draft
lang: en   
last_updated: 2021-@@-@@
github:
  repository: w3c/wai-course-list
  path: content/submit-a-resource.md
permalink: course-list/submit-a-resource
ref: /teach-advocate/course-list/
changelog: /teach-advocate/course-list/changelog/
acknowledgements: /teach-advocate/course-list/acknowledgements/
description:  # NEW: add a 150ish-character-description for social media   # translate the description
# image: /content-images/wai-course-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
footer: 
   <p><strong>Date:</strong> <!-- Updated @@ Month 2021.--> First published Month 20@@. CHANGELOG.</p>
   <p><strong>Editors:</strong> @@name, @@name. <strong>Contributors:</strong> @@name, @@name, and <a href="https://www.w3.org/groups/wg/eowg/participants">participants of the EOWG</a>. ACKNOWLEDGEMENTS lists contributors and credits.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>
---

<div style="grid-column: 4 / span 4">

<style>
{% include css/styles.css %}
main > header { grid-column: 4 / span 4; }
</style>
{% assign strings = site.data.strings %}
{% include netlify-form.liquid type="start" id="form-submit-a-course" %}
{% include sort-countries.liquid %} 
{% include submission-form.liquid type="start" name="course_submission" version="1"%}

<a href="../course-list">{{strings.back_to_list_link}}</a>
<p>{{strings.sub_header_info_form}}</p> 
<p><em>{{strings.sub_header_info_form_details}}</em></p> 

<h2 id="about_you">{{strings.about_you}}</h2>
<p>{{strings.about_you_description}}</p>

<div class="field">
  <label for="submitter_name" class="label_input">{{strings.submitter_name_label}}</label>
    <input type="text" id="submitter_name" required>
</div>
<div class="field">
  <label for="submitter_email" class="label_input">{{strings.submitter_email_label}}</label>
    <input type="email" id="submitter_email" required>
</div>

<h2 id="the_resource">{{strings.about_the_resource}}</h2>
<p>{{strings.about_the_resource_description}}</p>
<div class="field">
  <label for="title" class="label_input">{{strings.title_label}}</label>
  <input type="text" id="title" required>
</div>
<div class="field">
  <label for="provider" class="label_input">{{strings.provider_label}}</label>
  <input type="text" id="provider" required>
</div>
<fieldset class="field" id="country">
  <legend class="label">{{strings.country_legend}}</legend>
  <p class="expl">{{strings.country_expl}}</p>
  <div class="line">
    <label for="country1" class="label_input">{{strings.country1_label}}</label>
      <select name="country" id="country1" class="select_form" required>
        <option value=""></option>
        {% for country in orderedCountries %}
        <option value="{{ country[3] }}">{{ country[0] }} ({{country[1]}})</option>
        {% endfor %}
      </select>
  </div>
  <div class="proto">
    <label for="country_[n]" class="label_input">{{strings.countryn_label}} [n]</label>
    <select name="country" id="country_[n]" class="select_form" required>
      <option value=""></option>
      {% for country in orderedCountries %}
      <option value="{{ country[3] }}">{{ country[0] }} ({{country[1]}})</option>
      {% endfor %}
    </select>    
  </div>
  <button type="button" class="add_line small">{{strings.add_new_country_button}}</button>
  <button type="button" class="remove_line small" disabled>{{strings.remove_last_country_button}}</button>
</fieldset>
<div class="field">
  <label for="description" class="label_input">{{strings.description_label}}</label>
  <p class="expl">{{strings.description_expl}}</p>
  <textarea id="description" maxlength="350" required></textarea>
  <p><em>{{strings.description_expl_details}}</em></p>
</div>
<fieldset class="field" id="type">
  <legend class="label">{{strings.type_label}}</legend>
  <div class="radio-field">
    <input type="radio" name="type" id="type_graduate" value="type_graduate" required>
    <label for="type_graduate">{{strings.type_graduate}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type" id="type_undergraduate" value="type_undergraduate">
    <label for="type_undergraduate">{{strings.type_undergraduate}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type" id="type_training" value="type_training">
    <label for="type_training">{{strings.type_training}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type" id="type_certification" value="type_certification">
    <label for="type_certification">{{strings.type_certification}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type" id="type_other" value="type_other">
    <label for="type_other">{{strings.type_other}}</label>
  </div>  
  <div>
    <label for="type_new" class="visuallyhidden">{{strings.type_new}}</label>
    <input type="text" id="type_new">
  </div>
</fieldset>
<fieldset class="field" id="audience">
  <legend class="label">{{strings.audience_label}}</legend>
  <div class="radio-field">
    <input type="checkbox" name="audience_content_author" id="audience_content_author" value="audience_content_author" group="audience" required>
    <label for="audience_content_-_author">{{strings.audience_content_author}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience_designer" id="audience_designer" value="audience_designer" group="audience">
     <label for="audience_designer">{{strings.audience_designer}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience_developer" id="audience_developer" value="audience_developer" group="audience">
    <label for="audience_developer">{{strings.audience_developer}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience_manager" id="audience_manager" value="audience_manager" group="audience">
    <label for="audience_manager">{{strings.audience_manager}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience_tester" id="audience_tester" value="audience_tester" group="audience">
    <label for="audience_tester">{{strings.audience_tester}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience_other" id="audience_other" value="audience_other" group="audience">
    <label for="audience_other">{{strings.audience_other}}</label>
  </div>
</fieldset>
 <fieldset class="field" id="level">
  <legend class="label">{{strings.level_label}}</legend>
  <p class="expl">{{strings.level_expl}}</p>
  <div class="radio-field">
    <input type="radio" name="level" id="level-basic" value="level-basic">
    <label for="level-basic">{{strings.level_basic}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="level" id="level-intermediate" value="level-basic">
    <label for="level-intermediate">{{strings.level_intermediate}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="level" id="level-advanced" value="level-basic">
    <label for="level-advanced">{{strings.level_advanced}}</label>
  </div>
</fieldset>
<fieldset class="field" id="prerequisites">
  <legend class="label">{{strings.prerequisites_legend}}</legend>
  <p class="expl">{{strings.prerequisites_expl}}</p>
  <div class="line">
    <label for="prerequisites_1" class="label_input">{{strings.prerequisites1_label}}</label>
    <input type="text" id="prerequisites_1" name="prerequisites">
  </div>
  <div class="proto">
    <label for="prerequisites_[n]" class="label_input">{{strings.prerequisitesn_label}} [n]</label>
    <input type="text" id="prerequisites_[n]" name="prerequisites" />
  </div>
  <button type="button" class="add_line small">{{strings.add_new_prerequisite_button}}</button>
  <button type="button" class="remove_line small" disabled>{{strings.remove_last_prerequisite_button}}</button>
</fieldset>
<fieldset class="field" id="topics">
  <legend class="label">{{strings.topics_legend}}</legend>
  <p class="expl">{{strings.topics_expl}}</p>
  <div class="line">
    <label for="topics_1" class="label_input">{{strings.topics1_label}}</label>
    <input type="text" id="topics_1" name="topics" required>
  </div>
  <div class="proto">
    <label for="topics_[n]" class="label_input">{{strings.topicsn_label}} [n]</label>
    <input type="text" id="topics_[n]" name="topics" />
  </div>
  <button type="button" class="add_line small">{{strings.add_new_topic_button}}</button>
  <button type="button" class="remove_line small" disabled>{{strings.remove_last_topic_button}}</button>
</fieldset>
<fieldset class="field" id="curricula">
  <legend>
    <h3>{{strings.curricula_label}}</h3>
  </legend>
  <p class="expl">{{strings.curricula_expl}}</p>
  <p class="expl">{{strings.curricula_expl_details}}</p>
    {% include wai-curricula.liquid %}
</fieldset>
<fieldset class="field" id="language">
  <legend class="label">{{strings.language_legend}}</legend>
  <p class="expl">{{strings.language_expl}}</p>
  <div class="line">
    <label for="language_1" class="label_input">{{strings.language1_label}}</label>
    <select name="language" id="language_1" class="select_form" required> 
      <option value=""></option>
      {% for language in site.data.lang %}
      <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
      {% endfor %}
    </select>
  </div>
  <div class="proto">
    <label for="language_[n]" class="label_input">{{strings.languagen_label}} [n]</label>
    <select name="language" id="language_[n]" class="select_form" required> 
      <option value=""></option>
      {% for language in site.data.lang %}
      <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
      {% endfor %}
    </select>
  </div>
  <button type="button" class="add_line small">{{strings.add_new_language_button}}</button>
  <button type="button" class="remove_line small" disabled>{{strings.remove_last_language_button}}</button>
</fieldset>
<fieldset class="field" id="format">
  <legend class="label">{{strings.format_legend}}</legend>
  <div class="radio-field">
    <input type="radio" name="format" id="format_face_to_face" value="format_face_to_face">
    <label for="format-face-to-face">{{strings.format_face_to_face}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="format" id="format_online"  value="format_online">
    <label for="format-online">{{strings.format_online}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="format" id="format_hybrid" value="format_hybrid">
    <label for="format-hybrid">{{strings.format_hybrid}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="format" id="format_blended" value="format_blended">
    <label for="format-blended">{{strings.format_blended}}</label>
  </div>    
</fieldset>
<fieldset class="field" id="scheduling">
  <legend class="label">{{strings.scheduling_legend}}</legend>
  <p class="expl">{{strings.scheduling_expl}}</p>
  <div class="radio-field">
    <input type="checkbox" id="scheduling_scheduled" name="scheduling" group="scheduling" required>
    <label for="scheduling_scheduled">{{strings.learning_scheduled}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" id="scheduling_unscheduled" name="scheduling" group="scheduling">
    <label for="scheduling_unscheduled">{{strings.learning_unscheduled}}</label>
  </div>
</fieldset>
<div class="field">
  <label for="platform" class="label_input">{{strings.platform_label}}</label>
  <p class="expl">{{strings.platform_expl}}</p>
  <input type="text" id="platform">
</div>
<fieldset class="field" id="accessibility-support">
  <legend><h3>{{strings.asupport_legend}}</h3></legend>
  <p class="expl">{{strings.asupport_expl}}</p>
  {% include accessibility-support.liquid %}
</fieldset>
<div class="field">
  <legend class="label">{{strings.length_label}}</legend>
  <p class="expl">{{strings.length_expl}}</p>
  <input type="text" id="length">
</div>
<fieldset class="field" id="cost">
  <legend class="label">{{strings.cost_legend}}</legend>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_free">
    <label for="cost_free">{{strings.cost_free}}</label>
  </div> 
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_free_certificates_for_purchase" required>
    <label for="cost_free_certificates_for_purchase">{{strings.cost_free_certificates_for_purchase}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_free_limited_time">
    <label for="cost_free_limited_time">{{strings.cost_free_limited_time}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_free_or_reduced_for_some">
    <label for="cost_free_or_reduced_for_some">{{strings.cost_free_or_reduced_for_some}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_paid">
    <label for="cost_paid">{{strings.cost_paid}}</label>
  </div>  
</fieldset>
<div class="field">
  <label for="website" class="label_input">{{strings.website_label}}</label>
  <p class="expl">{{strings.website_expl}}</p>
  <input type="url" name="website" id="website" required>
</div>
<div class="field">
  <label for="reviews" class="label_input">{{strings.reviews_label}}</label>
  <p class="expl">{{strings.reviews_expl}}</p>
  <input type="url" name="reviews" id="reviews">
</div>
<div class="field">
  <label for="content_update"  class="label_input">{{strings.content_update_label}}</label>
  <p class="expl">{{strings.content_update_expl}}</p>
  <input type="date" id="content_update" required>
</div>
<div class="field" id="availability">
  <legend class="label">{{strings.availability}}</legend>
  <label for="start-date" class="label_input">{{strings.start_date_label}}</label>
  <p class="expl">{{strings.start_date_expl}}</p>
  <input type="date" id="start_date" required>
  <label for="end-date" class="label_input">{{strings.end_date_label}}</label>
  <p class="expl">{{strings.end_date_expl}}</p>
  <input type="date" id="end_date">
</div>
<h2>{{strings.submitting_your_resource}}</h2>
<div class="field">
  <label for="comments" class="label_input">{{strings.comments_label}}</label>
  <p class="expl">{{strings.comments_expl}}</p>
  <textarea id="comments"></textarea>
</div>
<fieldset class="field">
  <div class="radio-field">  
    <input type="checkbox" id="check_correct_info" required> 
    <label for="check_correct_info">{{strings.correct_info_label}}</label>
  </div>
  <div class="radio-field">  
    <input type="checkbox" id="check_publish_info" required> 
    <label for="check_publish_info">{{strings.publish_info_label}}</label>
  </div>
</fieldset>
<p>{{strings.info_submission}}</p>
<div class="field">
  <button type="submit">{{strings.send_form_button}}</button>
</div>
{% include netlify-form.liquid type="end"%}

<script>
{% include js/courses.js %}
</script>
{% include submission-form.liquid type="end"%}