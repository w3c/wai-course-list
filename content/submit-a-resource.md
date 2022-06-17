---
title: "Submit a course, training, or certification on digital accessibility"
nav_title: "Submit a course, training, or certification on digital accessibility"
lang: en   
last_updated: 2021-@@-@@
github:
  repository: w3c/wai-course-list
  path: content/submit-a-resource.md
permalink: /courses/submission/
ref: /teach-advocate/course-list/
description:  # NEW: aa 150ish-character-description for social media   # translate the description
# image: /content-images/wai-course-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this resource)
footer: 
   <p><strong>Date:</strong> Updated 07 June 2021. First published June 2022.</p>
   <p><strong>Editors:</strong> Carlos Duarte and Letícia Seixas Pereira. <span>Contributors:<span> <a href="https://www.w3.org/WAI/about/groups/eowg/participants/">EOWG Participants</a>.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>
---
<!-- markdownlint-disable no-inline-html -->

{% comment %}
  To DEBUG set any of the following to true.
  NB!! ensure to reset all to false before committing

  PREVIEW_BUTTON - add a preview button which allows submission without filling all the required fields
  DEBUG_FUNCTION - pass DEBUG to submission function, causes function to return JSON rather than submitting to GitHub
  DEBUG_USE_LOCAL_FUNCTION - use local/domain function rather than live one exposed by the Netlify wai-website deploy
{% endcomment %}
{% assign DEBUG_PREVIEW_BUTTON = true %}
{% assign DEBUG_SUBMISSION_FUNCTION = true %}
{% assign DEBUG_USE_LOCAL_SUBMISSION_FUNCTION = false %}

<div style="grid-column: 4 / span 4">

<style>
{% include wai-course-list/css/styles.css %}
main > header { grid-column: 4 / span 4; }
</style>

{% assign strings = site.data.wai-course-list.strings %}
{% include wai-course-list/sort-countries.liquid %}

<script>
  // TODO this may not be the best place for the handler
function onSubmit(e) {
  e.preventDefault();
  getPreviewSubmission();
};
</script>

{% capture success_page %}{{ page.dir }}success.html{% endcapture %}
{% capture failure_page %}{{ page.dir }}failure.html{% endcapture %}
{%- include list-submission-form.liquid type="start"
                                   name="submission"
                                   version="1"
                                   success=success_page
                                   failure=failure_page
                                   repository="wai-course-list"
                                   onsubmit="onSubmit"
                                   DEBUG_FUNCTION=DEBUG_SUBMISSION_FUNCTION
                                   DEBUG_USE_LOCAL_FUNCTION=DEBUG_USE_LOCAL_SUBMISSION_FUNCTION -%}

<!--<a href="../list">{{strings.back_to_list_link}}</a>-->

<p>{{strings.sub_header_info_form}}</p> 
<p>{{strings.info_submission}}</p>
<p>{{strings.edit_remove_info}}: <a href="mailto:group-wai-list-courses@w3.org?subject=Update%20course">{{strings.contact_email_list_courses}}</a></p>
<p><em>{{strings.sub_header_info_form_details}}</em></p> 


<h2 id="about_you">{{strings.about_you}}</h2>
<p>{{strings.about_you_description}}</p>

<div class="field">
  <label class="label_input" for="submitter_name">{{strings.submitter_name_label}}</label>
  <input type="text" id="submitter_name" name="submitter_name" required>
</div>

<div class="field">
<label for="submitter_email" class="label_input">{{strings.submitter_email_label}}</label>
    <input type="email" id="submitter_email" name="submitter_email" required>
</div>


<h2 id="the_resource">{{strings.about_the_resource}}</h2>
<p>{{strings.about_the_resource_description}}</p>

<div class="field">
  <label for="title" class="label_input">{{strings.title_label}}</label>
  <input type="text" id="title" name="title" required>
</div>

<div class="field">
  <label for="provider" class="label_input">{{strings.provider_label}}</label>
  <input type="text" id="provider" name="provider" required>
</div>

<fieldset class="field fieldset_select_text" id="country" aria-describedby="expl_country">
  <legend class="label_input">
    {{-strings.country_legend-}}
  </legend>
  <p class="expl" id="expl_country">{{strings.country_expl}}</p>
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

<div class="field">
  <label for="description" for="description" class="label_input">{{strings.description_label}}
  </label>
  <p class="expl" id="expl_desc">{{strings.description_expl}}</p>
  <textarea id="description" name="description" maxlength="350" rows="5" aria-describedby="expl_desc1 expl_desc2" required></textarea>
  <p id="expl_desc2"><em>{{strings.description_expl_details}}</em></p>
</div>

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
    <input type="radio" name="type_resource" id="type_certification" value="type_certification">
    <label for="type_certification">{{strings.type_certification}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="type_resource" id="type_training" value="type_training">
    <label for="type_training">{{strings.type_training}}</label>
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
    <input type="checkbox" name="audience[]" id="audience_general" value="audience_general" group="audience">
    <label for="audience_general">{{strings.audience_general}}</label>
  </div>  
  <div class="radio-field">
    <input type="checkbox" name="audience[]" id="audience_other" value="audience_other" group="audience">
    <label for="audience_other">{{strings.audience_other}}</label>
  </div>
</fieldset>

 <fieldset class="field fieldset_radio" id="level">
  <legend class="label_input">{{strings.level_label}}
    <span class="expl">{{strings.level_expl}}</span>
  </legend>
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

<fieldset class="field fieldset_text" id="prerequisites" aria-describedby="expl_prerequisites">
  <legend class="label_input">{{strings.prerequisites_legend}}</legend>
  <span class="expl" id="expl_prerequisites">{{strings.prerequisites_expl}}</span>
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

<fieldset class="field fieldset_text" id="topics" aria-describedby="expl_topics">
  <legend class="label_input">{{strings.topics_legend}}</legend>
  <p class="expl" id="expl_topics">{{strings.topics_expl}}</p>
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

<fieldset class="field fieldset_check_title" id="curricula" aria-describedby="expl_curricula1 expl_curricula2">
  <legend class="label_input">{{strings.curricula_label}}</legend>
  <p class="expl" id="expl_curricula1">{{strings.curricula_expl}}</p>
  <p class="expl" id="expl_curricula2">{{strings.curricula_expl_details}}</p>
    {% include wai-course-list/wai-curricula.liquid %}
</fieldset>

<fieldset class="field fieldset_select_text" id="language" aria-describedby="expl_language">
  <legend class="label_input">{{strings.language_legend}}</legend>
  <p class="expl" id="expl_language">{{strings.language_expl}}</p>
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
    <input type="radio" name="format" id="format_blended" value="format_blended">
    <label for="format_blended">{{strings.format_blended}}</label>
  </div>
  <div class="radio-field">
    <input type="radio" name="format" id="format_hybrid" value="format_hybrid">
    <label for="format_hybrid">{{strings.format_hybrid}}</label>
  </div>      
</fieldset>

<fieldset class="field fieldset_check" id="learning" aria-describedby="expl_learning">
  <legend class="label_input">{{strings.scheduling_legend}}</legend>
  <p class="expl" id="expl_learning">{{strings.scheduling_expl}}</p>
  <div class="radio-field">
    <input type="checkbox" id="learning_scheduled" name="learning[]" value="learning_scheduled" group="learning" required>
    <label for="learning_scheduled">{{strings.learning_scheduled}}</label>
  </div>
  <div class="radio-field">
    <input type="checkbox" id="learning_unscheduled" name="learning[]" value="learning_unscheduled" group="learning">
    <label for="learning_unscheduled">{{strings.learning_unscheduled}}</label>
  </div>
</fieldset>

<fieldset class="field fieldset_text" aria-describedby="expl_platform">
  <legend id="platforms_label" class="label_input">{{strings.platforms_label}}</legend>
  <span class="expl" id="expl_platform">{{strings.platforms_expl}}</span>
  <div class="line">
    <label for="platform_1" class="label_input">{{strings.platform1_label}}</label>
    <input type="text" id="platform_1" name="platforms">
  </div>
  <div class="proto">
    <label for="platform_[n]" class="label_input">{{strings.platformn_label}} [n]</label>
    <input type="text" id="platform_[n]" name="platforms" class="input_hidden" disabled/>
  </div>
  <button type="button" class="add_line button-small">{{strings.add_new_platform_button}}</button>
  <button type="button" class="remove_line button-small" disabled>{{strings.remove_last_platform_button}}</button>
</fieldset>


<fieldset class="field fieldset_check" id="accessibility-support" aria-describedby="expl_asupport">
  <legend class="label_input">{{strings.asupport_legend}}</legend>
  <p class="expl" id="expl_asupport">{{strings.asupport_expl}}</p>
  {% include wai-course-list/accessibility-support.liquid %}
</fieldset>

<div class="field">
  <label for="length" class="label_input">{{strings.length_label}}</label>
  <p class="expl" id="expl_length">{{strings.length_expl}}</p>
  <input type="text" id="length" name="length" aria-describedby="expl_length">
</div>

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

<div class="field">
  <label for="website" class="label_input">{{strings.website_label}}</label>
  <p class="expl" id="expl_website">{{strings.website_expl}}</p>
  <input type="url" name="website" id="website" placeholder="https://example.com" aria-describedby="expl_website" required>
</div>

<div class="field">
  <label for="reviews" class="label_input">{{strings.reviews_label}}</label>
  <p class="expl" id="expl_reviews">{{strings.reviews_expl}}</p>
  <input type="url" name="reviews" id="reviews" placeholder="https://example.com" aria-describedby="expl_reviews">
</div>

<div class="field">
  <label for="content_update" class="label_input">{{strings.content_update_label}}</label>
  <p class="expl" id="expl_content_update">{{strings.content_update_expl}}</p>
  <input type="date" name="content_update" id="content_update" aria-descibedby="expl_content_update" required>
</div>

<fieldset class="field" id="availability">
  <legend class="label_input">{{strings.availability}}</legend>
  <label for="start_date" class="label_input">{{strings.start_date_label}}</label>
  <p class="expl" id="expl_start_date">{{strings.start_date_expl}}</p>
  <input type="date" id="start_date" name="start_date" aria-describedby="expl_start_date" required>
  <label for="end_date" class="label_input">{{strings.end_date_label}}</label> 
  <p class="expl" id="expl_end_date">{{strings.end_date_expl}}</p>
  <input type="date" id="end_date" name="end_date" aria-describedby="expl_end_date">
</fieldset>

<h2>{{strings.submitting_your_resource}}</h2>
<div class="field">
  <label for="comments" class="label_input">{{strings.comments_label}}</label>
  <p class="expl" id="expl_comments">{{strings.comments_expl}}</p>
  <textarea id="comments" name="comments" aria-describedby="expl_comments"></textarea>
</div>

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
  <button type="submit">{{strings.submit_review_form_button}}</button>
</div>

{% include list-submission-form.liquid type="end"%}

<script>
{% include wai-course-list/js/courses.js %}
{% include wai-course-list/js/preview.js %}

{% if DEBUG_PREVIEW_BUTTON %}
(function(){
  const button = document.createElement('button')
  button.innerText = 'Show Preview'
  button.addEventListener('click', e => {
      getPreviewSubmission();
  })
  const form = document.forms[0]
  form.insertBefore(button, form.firstChild)
})();
{% endif %}

</script>


<div id="preview-submission-overlay" role="dialog" aria-modal="true" aria-labelledby="preview_title">
<div class="overlay-content">
  <button class="button button-close_preview icon" title="{{strings.close_back_to_form}}"><span><svg focusable="false" aria-hidden="true" class="icon-ex-circle "><use xlink:href="/WAI/assets/images/icons.svg#icon-ex-circle"></use></svg> </span></button>
  <h2 id="preview_title">{{ strings.preview_title }}</h2>  
  <p>{{ strings.preview_info }}</p>
  <div class="details-preview box"></div>
  <p>{{strings.info_submission}}</p>
  {% include_cached button.html label=strings.close_back_to_form class="close_preview"%}
  {% include_cached button.html label=strings.submit_form_button class="button button-submit_form" %}
</div>
</div>
