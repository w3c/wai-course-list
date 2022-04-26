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
description:  # NEW: aa 150ish-character-description for social media   # translate the description
# image: /content-images/wai-course-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
footer: 
   <p><strong>Date:</strong> <!-- Updated @@ Month 2021.--> First published Month 20@@. CHANGELOG.</p>
   <p><strong>Editors:</strong> @@name, @@name. <strong>Contributors:</strong> @@name, @@name, and <a href="https://www.w3.org/groups/wg/eowg/participants">participants of the EOWG</a>. ACKNOWLEDGEMENTS lists contributors and credits.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>
---
<!-- markdownlint-disable no-inline-html -->

<div style="grid-column: 4 / span 4">

<style>
{% include css/styles.css %}
main > header { grid-column: 4 / span 4; }
</style>

{% assign strings = site.data.strings %}
{% include sort-countries.liquid %} 

<script>
  // TODO this may not be the best place for the handler
function onSubmit(e) {
  e.preventDefault();
  getPreviewSubmission();
};
</script>

{%- include list-submission-form.liquid type="start"
                                   name="submission"
                                   version="1"
                                   success="/success.html"
                                   failure="/failure.html"
                                   repository="wai-course-list"
                                   onsubmit="onSubmit" -%}



<a href="../course-list">{{strings.back_to_list_link}}</a>

<p>{{strings.sub_header_info_form}}</p> 
<p><em>{{strings.sub_header_info_form_details}}</em></p> 



<h2 id="about_you">{{strings.about_you}}</h2>
<p>{{strings.about_you_description}}</p>

<fieldset class="field">
<legend id="label_submitter_name" class="label_input">{{strings.submitter_name_label}}</legend>
  <input type="text" id="submitter_name" aria-labelledby="label_submitter_name" name="submitter_name" required>
</fieldset>

<fieldset class="field">
<legend id="label_submitter_email" class="label_input">{{strings.submitter_email_label}}</legend>
    <input type="email" id="submitter_email" name="submitter_email" aria-labelledby="label_submitter_email" required>
</fieldset>


<h2 id="the_resource">{{strings.about_the_resource}}</h2>
<p>{{strings.about_the_resource_description}}</p>

<fieldset class="field">
  <legend id="label_title" class="label_input">{{strings.title_label}}</legend>
  <input type="text" id="title" name="title" aria-labelledby="label_title" required>
</fieldset>

<fieldset class="field">
  <legend id="label_provider" class="label_input">{{strings.provider_label}}</legend>
  <input type="text" id="provider" name="provider" aria-labelledby="label_provider" required>
</fieldset>

<fieldset class="field fieldset_select_text" id="country">
  <legend class="label_input">{{strings.country_legend}}</legend>
  <p class="expl">{{strings.country_expl}}</p>
  <div class="line">
    <label for="country1" class="label_input">{{strings.country1_label}}</label>
      <select name="country[]" id="country1" class="select_form" required>
        <option value=""></option>
        {% for country in orderedCountries %}
        <option value="{{ country[2] }}">{{ country[0] }} ({{country[1]}})</option>
        {% endfor %}
      </select>
  </div>
  <div class="proto">
    <label for="country_[n]" class="label_input">{{strings.countryn_label}} [n]</label>
    <select name="country[]" id="country_[n]" class="select_form input_hidden" disabled>
      <option value=""></option>
      {% for country in orderedCountries %}
      <option value="{{ country[3] }}">{{ country[0] }} ({{country[1]}})</option>
      {% endfor %}
    </select>
  </div>
  <button type="button" class="add_line button-small">{{strings.add_new_country_button}}</button>
  <button type="button" class="remove_line button-small" disabled>{{strings.remove_last_country_button}}</button>
</fieldset>

<fieldset class="field">
  <legend for="description" id="description_label" class="label_input">{{strings.description_label}}</legend>
  <p class="expl">{{strings.description_expl}}</p>
  <textarea id="description" name="description" maxlength="350" aria-labelledby="description_label" required></textarea>
  <p><em>{{strings.description_expl_details}}</em></p>
</fieldset>

<fieldset class="field fieldset_radio other_field" id="type">
  <legend class="label_input">{{strings.type_label}}</legend>
  <div class="radio-field">
    <input type="radio" name="type_resource" id="type_graduate" value="type_graduate" required>
    <label for="type_graduate">{{strings.type_graduate}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type_resource" id="type_undergraduate" value="type_undergraduate">
    <label for="type_undergraduate">{{strings.type_undergraduate}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type_resource" id="type_training" value="type_training">
    <label for="type_training">{{strings.type_training}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type_resource" id="type_certification" value="type_certification">
    <label for="type_certification">{{strings.type_certification}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type_resource" id="type_other" value="type_other" class="option_field_other">
    <label for="type_other">{{strings.type_other}}</label>
  </div>  
  <div class='hidden-element'>
    <label for="type_new" class="visuallyhidden">{{strings.type_new}}</label>
    <input type="text" id="type_new" name="type_resource_new" class="new-option-field">
  </div>
</fieldset>

<fieldset class="field fieldset_check" id="audience">
  <legend class="label_input">{{strings.audience_label}}</legend>
  <div class="radio-field">
    <input type="checkbox" name="audience[]" id="audience_content_author" value="audience_content_author" group="audience" required>
    <label for="audience_content_author">{{strings.audience_content_author}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience[]" id="audience_designer" value="audience_designer" group="audience">
     <label for="audience_designer">{{strings.audience_designer}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience[]" id="audience_developer" value="audience_developer" group="audience">
    <label for="audience_developer">{{strings.audience_developer}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience[]" id="audience_manager" value="audience_manager" group="audience">
    <label for="audience_manager">{{strings.audience_manager}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience[]" id="audience_tester" value="audience_tester" group="audience">
    <label for="audience_tester">{{strings.audience_tester}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" name="audience[]" id="audience_other" value="audience_other" group="audience">
    <label for="audience_other">{{strings.audience_other}}</label>
  </div>
</fieldset>

 <fieldset class="field fieldset_radio" id="level">
  <legend class="label_input">{{strings.level_label}}</legend>
  <p class="expl">{{strings.level_expl}}</p>
  <div class="radio-field">
    <input type="radio" name="level" id="level_basic" value="level_basic">
    <label for="level_basic">{{strings.level_basic}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="level" id="level_intermediate" value="level_intermediate">
    <label for="level_intermediate">{{strings.level_intermediate}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="level" id="level_advanced" value="level_advanced">
    <label for="level_advanced">{{strings.level_advanced}}</label>
  </div>
</fieldset>

<fieldset class="field fieldset_text" id="prerequisites">
  <legend class="label_input">{{strings.prerequisites_legend}}</legend>
  <p class="expl">{{strings.prerequisites_expl}}</p>
  <div class="line">
    <label for="prerequisites_1" class="label_input">{{strings.prerequisites1_label}}</label>
    <input type="text" id="prerequisites_1" name="prerequisites">
  </div>
  <div class="proto">
    <label for="prerequisites_[n]" class="label_input">{{strings.prerequisitesn_label}} [n]</label>
    <input type="text" id="prerequisites_[n]" name="prerequisites" class="input_hidden" disabled />
  </div>
  <button type="button" class="add_line button-small">{{strings.add_new_prerequisite_button}}</button>
  <button type="button" class="remove_line button-small" disabled>{{strings.remove_last_prerequisite_button}}</button>
</fieldset>

<fieldset class="field fieldset_text" id="topics">
  <legend class="label_input">{{strings.topics_legend}}</legend>
  <p class="expl">{{strings.topics_expl}}</p>
  <div class="line">
    <label for="topics_1" class="label_input">{{strings.topics1_label}}</label>
    <input type="text" id="topics_1" name="topics" required>
  </div>
  <div class="proto">
    <label for="topics_[n]" class="label_input">{{strings.topicsn_label}} [n]</label>
    <input type="text" id="topics_[n]" name="topics" class="input_hidden" disabled/>
  </div>
  <button type="button" class="add_line button-small">{{strings.add_new_topic_button}}</button>
  <button type="button" class="remove_line button-small" disabled>{{strings.remove_last_topic_button}}</button>
</fieldset>

<fieldset class="field fieldset_check_title" id="curricula">
  <legend class="label_input">{{strings.curricula_label}}</legend>
  <p class="expl">{{strings.curricula_expl}}</p>
  <p class="expl">{{strings.curricula_expl_details}}</p>
    {% include wai-curricula.liquid %}
</fieldset>

<fieldset class="field fieldset_select_text" id="language">
  <legend class="label_input">{{strings.language_legend}}</legend>
  <p class="expl">{{strings.language_expl}}</p>
  <div class="line">
    <label for="language_1" class="label_input">{{strings.language1_label}}</label>
    <select name="language[]" id="language_1" class="select_form" required> 
      <option value=""></option>
      {% for language in site.data.lang %}
      <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
      {% endfor %}
    </select>
  </div>
  <div class="proto">
    <label for="language_[n]" class="label_input">{{strings.languagen_label}} [n]</label>
    <select name="language[]" id="language_[n]" class="select_form input_hidden" disabled> 
      <option value=""></option>
      {% for language in site.data.lang %}
      <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
      {% endfor %}
    </select>
  </div>
  <button type="button" class="add_line button-small">{{strings.add_new_language_button}}</button>
  <button type="button" class="remove_line button-small" disabled>{{strings.remove_last_language_button}}</button>
</fieldset>

<fieldset class="field fieldset_radio" id="format">
  <legend class="label_input">{{strings.format_legend}}</legend>
  <div class="radio-field">
    <input type="radio" name="format" id="format_face_to_face" value="format_face_to_face">
    <label for="format_face_to_face">{{strings.format_face_to_face}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="format" id="format_online"  value="format_online">
    <label for="format_online">{{strings.format_online}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="format" id="format_hybrid" value="format_hybrid">
    <label for="format_hybrid">{{strings.format_hybrid}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="format" id="format_blended" value="format_blended">
    <label for="format_blended">{{strings.format_blended}}</label>
  </div>    
</fieldset>

<fieldset class="field fieldset_check" id="learning">
  <legend class="label_input">{{strings.scheduling_legend}}</legend>
  <p class="expl">{{strings.scheduling_expl}}</p>
  <div class="radio-field">
    <input type="checkbox" id="learning_scheduled" name="learning[]" value="learning_scheduled" group="learning" required>
    <label for="learning_scheduled">{{strings.learning_scheduled}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" id="learning_unscheduled" name="learning[]" value="learning_unscheduled" group="learning">
    <label for="learning_unscheduled">{{strings.learning_unscheduled}}</label>
  </div>
</fieldset>

<fieldset class="field">
  <legend id="platform_label" class="label_input">{{strings.platform_label}}</legend>
  <p class="expl">{{strings.platform_expl}}</p>
  <input type="text" id="platform" aria-labelledby="platform_label" name="platform">
</fieldset>

<fieldset class="field fieldset_check" id="accessibility-support">
  <legend class="label_input">{{strings.asupport_legend}}</legend>
  <p class="expl">{{strings.asupport_expl}}</p>
  {% include accessibility-support.liquid %}
</fieldset>

<fieldset class="field">
  <legend id="length_label" class="label_input">{{strings.length_label}}</legend>
  <p class="expl">{{strings.length_expl}}</p>
  <input type="text" id="length" aria-labelledby="length_label" name="length">
</fieldset>

<fieldset class="field fieldset_radio" id="cost">
  <legend class="label_input">{{strings.cost_legend}}</legend>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_free" value="cost_free" required>
    <label for="cost_free">{{strings.cost_free}}</label>
  </div> 
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_certificates_for_purchase" value="cost_certificates_for_purchase">
    <label for="cost_certificates_for_purchase">{{strings.cost_certificates_for_purchase}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_limited_time" valye="cost_limited_time">
    <label for="cost_limited_time">{{strings.cost_limited_time}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_reduced_for_some"  value="cost_reduced_for_some">
    <label for="cost_reduced_for_some">{{strings.cost_reduced_for_some}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="cost" id="cost_paid" value="cost_paid">
    <label for="cost_paid">{{strings.cost_paid}}</label>
  </div>  
</fieldset>

<fieldset class="field">
  <legend id="website_label" class="label_input">{{strings.website_label}}</legend>
  <p class="expl">{{strings.website_expl}}</p>
  <input type="url" name="website" id="website" aria-labelledby="website_label" placeholder="https://example.com" required>
</fieldset>

<fieldset class="field">
  <legend id="reviews_label" class="label_input">{{strings.reviews_label}}</legend>
  <p class="expl">{{strings.reviews_expl}}</p>
  <input type="url" name="reviews" id="reviews" aria-labelledby="reviews_label" placeholder="https://example.com">
</fieldset>

<fieldset class="field">
  <legend id="content_update_label" class="label_input">{{strings.content_update_label}}</legend>
  <p class="expl">{{strings.content_update_expl}}</p>
  <input type="date" name="content_update" id="content_update" aria-labelledby="content_update_label" required>
</fieldset>

<fieldset class="field" id="availability">
  <legend class="label_input">{{strings.availability}}</legend>
  <label for="start_date" class="label_input">{{strings.start_date_label}}</label>
  <p class="expl">{{strings.start_date_expl}}</p>
  <input type="date" id="start_date" name="start_date" required>
  <label for="end_date" class="label_input">{{strings.end_date_label}}</label>
  <p class="expl">{{strings.end_date_expl}}</p>
  <input type="date" id="end_date" name="end_date">
</fieldset>

<h2>{{strings.submitting_your_resource}}</h2>
<fieldset class="field">
  <legend id="comments_label" class="label_input">{{strings.comments_label}}</legend>
  <p class="expl">{{strings.comments_expl}}</p>
  <textarea id="comments" name="comments" aria-labelledby="comments_label"></textarea>
</fieldset>

<fieldset class="field">
  <div class="radio-field">  
    <input type="checkbox" id="check_correct_info" name="check_correct_info" required> 
    <label for="check_correct_info">{{strings.correct_info_label}}</label>
  </div>
  <div class="radio-field">  
    <input type="checkbox" id="check_publish_info" name="check_publish_info" required> 
    <label for="check_publish_info">{{strings.publish_info_label}}</label>
  </div>
</fieldset>

<p>{{strings.info_submission}}</p>

<div class="field">
  <button type="submit">{{strings.send_form_button}}</button>
</div>

{% include list-submission-form.liquid type="end"%}

<script>
{% include js/courses.js %}
{% include js/preview.js %}
</script>

<div id="preview-submission-overlay" role="dialog" aria-modal="true" aria-labelledby="preview_title">
<div class="overlay-content">
{% include_cached button.html type="icon" label=strings.quit_preview class="close_preview icon" icon="ex-circle" %}
  <h2 id="preview_title">{{ strings.preview_title }}</h2>  
  <p>{{ strings.preview_info }}</p>
  <div class="details-preview box"></div>
  {% include_cached button.html type="icon" label=strings.back_to_form class="close_preview" icon="arrow-left" %}
  <button class="button button-submit_form" type="submit"><span>{{ strings.send_form_button }} <svg focusable="false" aria-hidden="true" class="icon-arrow-right "><use xlink:href="/assets/images/icons.svg#icon-arrow-right"></use></svg></span></button>

</div>
</div>
