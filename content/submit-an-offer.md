---
title: "Submit a course, training, or certification on web accessibility"
nav_title: "Submit a course, training, or certification on web accessibility"
doc-note-type: draft
lang: en   # Change "en" to the translated-language shortcode from https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
last_updated: 2021-@@-@@   # Put the date of this translation YYYY-MM-DD (with month in the middle)
github:
  repository: leticiaseixas/wai-list-of-courses
  path: content/submit-an-offer.md    # Add the language shortcode to the middle of the filename, for example: content/index.fr.md
permalink: /list-of-courses/submit-an-offer   # Add the language shortcode to the end, with no slash at end, for example: /link/to/page/fr
# NEW: 3 navigation lines below are only needed for multi-page resources where you have previous and next at the bottom. If so, un-comment them; otherwise delete these lines.
# navigation:
  # previous: /teach-advocate/course-list/@@
  # next: /teach-advocate/course-list/@@
ref: /teach-advocate/course-list/   # Translators, do not change this
changelog: /teach-advocate/course-list/changelog/  # NEW: set up a changelog so it's ready for later
acknowledgements: /teach-advocate/course-list/acknowledgements/  # NEW: delete if don't have a separate acknowledgements page. And delete it in the footer below.
description:  # NEW: add a 150ish-character-description for social media   # translate the description
# image: /content-images/wai-course-list/social.png  # NEW: image for social media (leave commented out if we don't have a specific one for this reource)
# In the footer below:
# Do not translate or change CHANGELOG or ACKNOWLEDGEMENTS.
# Translate the other words below, including "Date:" and "Editor:"
# Translate the Working Group name. Leave the Working Group acronym in English.
# Do not change the dates in the footer below.
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

<a href="../list-of-courses">Back to List of Courses</a>
<p>
  This form allows you to provide information about courses, training, and certification on web accessibility. To update an existing resource, please use the following button to upload the file provided when first submiting your resource.</p>
  {% include_cached button.html type="link" label="Load resource information" class="more" href="#" %}
<p><em>Please note that <abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific providers. Resources are listed with no quality rating. All information will be publicly available as this page generates a Pull Request on our GitHub repository.</em></p> 

<form id="form-submit-an-offer">

  <h2 id="about-you">About you</h2>
  <p>We'd like to know who you are, so that we can contact you with questions about your submission. This information will not be publicly shared.</p>

  <div class="field">
     <label for="submitter-name" class="label-input">Name (Required)</label>
     <input type="text" id="submitter-name" required>
   </div>
   <div class="field">
     <label for="submitter-email" class="label-input">Email (Required)</label>
     <input type="email" id="submitter-email" required>
  </div>
  

  <h2 id="the-tool">About the resource</h2>
  <p>Provide some information about the course, training, or certification. This information will be publicly shared.</p>

  <div class="field">
      <label for="offer-name" class="label-input">Title (Required)</label>
      <input type="text" id="offer-name" required>
  </div>
  <div class="field">
      <label for="offer-provider" class="label-input">Provider (Required)</label>
      <input type="text" id="offer-provider" required>
  </div>

  <div class="field">
      <label for="offer-description" class="label-input">Description (Required)</label>
      <p class="expl">Provide a brief description of the resource (max.: 300 chars).</p>
      <textarea id="offer-description" required></textarea>
      <p><em>Please enter only plain text (no HTML). URIs are not linked.</em></p>
  </div>

  <fieldset class="field" id="offer-type">
    <legend class="label">Type of resource (Required)</legend>
    <div class="radio-field">
      <input type="radio" name="offer-type" id="offer-type-graduate" required>
      <label for="offer-type-graduate">Graduate program</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-type" id="offer-type-undergraduate">
      <label for="offer-type-undergraduate">Undergraduate program</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-type" id="offer-type-training">
      <label for="offer-type-training">Training</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-type" id="offer-type-certification">
      <label for="offer-type-certification">Professional certification</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-type" id="offer-type-other">
      <label for="offer-type-other">Other</label>
    </div>  
    <div>
      <label for="offer-new-type-offer" class="visuallyhidden">Other</label>
      <input type="text" id="offer-new-type-offer">
    </div>
  </fieldset>

  <fieldset class="field" id="offer-audience">
    <legend class="label">Audience (Required)</legend>
    <div class="radio-field">
      <input type="checkbox" name="offer-audience" id="offer-audience-content-author" value="offer-audience-content-author" required>
      <label for="offer-audience-content-author">Content Author</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="offer-audience" id="offer-audience-designer" value="offer-audience-designer" required>
      <label for="offer-audience-designer">Designer</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="offer-audience" id="offer-audience-developer" value="offer-audience-developer" required>
      <label for="offer-audience-developer">Developer</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="offer-audience" id="offer-audience-manager" value="offer-audience-manager" required>
      <label for="offer-audience-manager">Manager</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="offer-audience" id="offer-audience-tester" value="offer-audience-tester" required>
      <label for="offer-audience-tester">Tester</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="offer-audience" id="offer-audience-other" value="offer-audience-other" required>
      <label for="offer-audience-other">Other</label>
    </div>
  </fieldset>

  <fieldset class="field" id="offer-level">
    <legend class="label">Level (Required)</legend>
    <p class="expl">Indicate the level of digital accessibility proficiency required.</p>
    <div class="radio-field">
      <input type="radio" name="offer-level" id="offer-level-basic" required>
      <label for="offer-level-basic">Basic</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-level" id="offer-level-intermediate">
      <label for="offer-level-intermediate">Intermediate</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-level" id="offer-level-advanced">
      <label for="offer-level-advanced">Advanced</label>
    </div>
  </fieldset>

  <div class="field" id="divInputPrerequisite">
      <label for="offer-prerequisites" class="label-input">Prerequisites</label>
      <p class="expl">For example, accessibility concepts and terminology, W3C Accessibility Standards, basic knowledge of HTML and CSS, etc.</p>
      <input type="text" id="prerequisites1" class="field-prerequisite">
      {% include_cached button.html type="fake" label="Add prerequisite" class="small button-new-prerequisite" %}
  </div>

  <div class="field" id="divInputTopic">
      <label for="offer-topics" class="label-input" required>Topics (Required)</label>
      <p class="expl">For example, accessibility policy and regulations, inclusive design, accessible documents and multimedia, etc.</p>
      <input type="text" id="topics" class="field-topic">
      {% include_cached button.html type="fake" label="Add topic" class="small button-new-topic" %}
  </div>

  <fieldset id="offer-wai-curricula">
    <legend>WAI Curricula module{% include resource-link.html label="Curricula on Web Accessibility"
    href="https://www.w3.org/WAI/curricula/" %}</legend>
    <p class="expl">If applicable, indicate the WAI Curricula modules covered.</p>
      {% include wai-curricula.liquid %}
  </fieldset>

  <div class="field" id="divSelectLang">
      <label for="offer-language" class="label-input">Language (Required)</label>
      <p class="expl">Indicate in which language or languages this offer is provided.</p>
      <select name="language" id="language" class="field-language select-form" required> 
          <option value=""></option>
          {% for language in site.data.lang %}
              <option value="{{ language[0] }}">{{ language[1].name }} ({{language[1].nativeName }})</option>
          {% endfor %}
      </select>
      {% include_cached button.html type="fake" label="Add language" class="small button-new-lang" %}
  </div>

  <div class="field" id="divSelectCountry">
      <label for="offer-country" class="label-input">Country (Required)</label>
      <p class="expl">Indicate by which country or countries this offer is provided.</p>
      <select name="country" id="country" class="field-country select-form" required>
          <option value=""></option>
          {% for country in site.data.countries %}
              <option value="{{ country[0] }}">{{ country[1].name }} ({{country[1].nativeName}})</option>
          {% endfor %}
      </select>
      {% include_cached button.html type="fake" label="Add country" class="small button-new-country" %}
  </div>

  <fieldset class="field" id="offer-format">
    <legend class="label">Format (Required)</legend>
    <div class="radio-field">
      <input type="radio" name="offer-format" id="offer-format-face-to-face">
      <label for="offer-format-face-to-face">Face-to-face - all teaching sessions are provided on-site</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-format" id="offer-format-online" required>
      <label for="offer-format-online">Online - all teaching sessions are provided online </label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-format" id="offer-format-hybrid">
      <label for="offer-format-hybrid">Hybrid - teaching sessions are provided simultaneously on-site and online</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-format" id="offer-format-blended">
      <label for="offer-format-blended">Blended - teaching sessions are provided either on-site or online</label>
    </div>    
  </fieldset>


  <fieldset class="field" id="offer-learning">
      <legend class="label">Learning (Required)</legend>
      <p class="expl">Indicate the type of learning provided in this offer. Choose as many as apply.</p>
      <div class="radio-field">
          <input type="checkbox" id="offer-learning-self-paced" name="offer-learning-self-paced" required>
          <label for="offer-learning-self-paced">Self-paced - Progress at your own speed</label>
      </div>
      <div class="radio-field">
          <input type="checkbox" id="offer-learning-instructor-paced" name="offer-learning-instructor-paced">
          <label for="offer-learning-instructor-paced">Instructor paced - Instructor-led on a course schedule</label>
      </div>
      <div class="radio-field">
          <input type="checkbox" id="offer-learning-asynchronous" name="offer-learning-asynchronous">
          <label for="offer-learning-asynchronous">Asynchronous learning - Access at your own schedule</label>
      </div>
      <div class="radio-field">
          <input type="checkbox" id="offer-learning-synchronous" name="offer-learning-synchronous">
          <label for="offer-learning-synchronous">Synchronous learning - Students and instructors required to be online at the same time</label>
      </div>            
  </fieldset>

  <div class="field">
      <label for="offer-platform" class="label-input">Platform</label>
      <p class="expl">If applicable, indicate on which platform this course, training, or certification is provided.</p>
      <input type="text" id="platform">
  </div>

  <div class="field">
      <label for="offer-accessibility-resources" class="label-input">Accessibility support</label>
      <p class="expl">Indicate what accessibility support is provided. Include details in the text box.</p>
      {% assign aresources = site.data.accessibility-resources | sort: 'id' %}
      {% for resource in aresources %}
        <div class="radio-field">
          <input type="checkbox" id="offer-accessibility-resource-{{resource.id}}" value="offer-accessibility-resource-{{resource.id}}">
          <label for="offer-accessibility-resource-{{resource.id}}">{{resource.name}}</label>
        </div>
      {% endfor %}
      <div>
        <label for="offer-new-accessibility-resource" class="visuallyhidden">Other</label>
        <input type="text" id="offer-new-accessibility-resource">
      </div>
  </div>

<!-- {% capture info_label%}More information about the {{curricula.name}}{% endcapture %}
{{ curricula.name }}{% include resource-link.html label=info_label href=curricula.link %} -->

  <div class="field">
      <legend class="label">Length (Required)</legend>
      <p class="expl">Indicate the estimated amount of time needed to complete the course (for example, 2 hours, 3 weeks, 6 months, etc.).</p>
      <div class="length-container">
        <div class="length-value">
          <label for="offer-value-duration">Value</label>
          <input type="number" id="offer-value-duration" required>
        </div>
        <div class="length-unity">
          <label for="offer-unity-duration">Unity</label>
          <select id="offer-unity-duration" required> 
              <option value=""></option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
          </select>
        </div>
      </div>
  </div>

  <fieldset class="field" id="offer-cost">
    <legend class="label">Cost (Required)</legend>
    <div class="radio-field">
      <input type="radio" name="offer-cost" id="offer-cost-free">
      <label for="offer-cost-free">Free</label>
    </div> 
    <div class="radio-field">
      <input type="radio" name="offer-cost" id="offer-cost-free-certificates-for-purchase" required>
      <label for="offer-cost-free-certificates-for-purchase">Free with certificates for purchase</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-cost" id="offer-cost-free-limited-time">
      <label for="offer-cost-free-limited-time">Free for limited content or duration</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-cost" id="offer-cost-free-or-reduced-for-some">
      <label for="offer-cost-free-or-reduced-for-some">Free or reduced fee for some</label>
    </div>
    <div class="radio-field">
      <input type="radio" name="offer-cost" id="offer-cost-paid">
      <label for="offer-cost-paid">Paid</label>
    </div>  
  </fieldset>

  <div class="field">
      <label for="offer-website" class="label-input">Website (Required)</label>
      <p class="expl">Provide the website containing more information about this resource.</p>
      <input type="url" name="offer-website" id="offer-website" required>
  </div>

  <div class="field">
      <label for="offer-reviews-page" class="label-input">Reviews page</label>
      <p class="expl">Provide the web page containing consumer reviews about this resource.</p>
      <input type="url" name="offer-reviews-page" id="offer-reviews-page">
  </div>
  <div class="field">
      <label for="offer-content-update"  class="label-input">Last updated (Required)</label>
      <p class="expl">Please indicate the date when the content of this resource was last updated. Consider items such as syllabus, structure, teaching resources, etc.</p>
      <input type="date" id="offer-content-update" required>
  </div>
  <div class="field">
      <legend class="label">Availability</legend>
      <p class="expl">Indicate the start date for the period of time this resource will be available. If applicable, provide the end date.</p>
      <label for="offer-availability-start-date">Start date (Required)</label>
      <input type="date" id="offer-availability-start-date" required>
      <label for="offer-availability-end-date">End date</label>
      <input type="date" id="offer-availability-end-date">
      <!-- this course is provided at any time, self-paced-->
  </div>
  <h2>Submitting your course, training, or certification</h2>
  <p>Let us know if you have any comments.</p>
  <div class="field">
    <label for="comments" class="label-input">Comments</label>
    <textarea id="comments"></textarea>
  </div>
  <div class="field">
    <label><input type="checkbox" required> The information I provided is correct according to the best of my knowledge.</label>
    <label><input type="checkbox" required> I give permission for information for this resource to be published in the W3C's list of courses.</label>
  </div>
  <p>When you submit the form, we will review your submission and add it to the list. This will be within a month.</p>
  <div class="field">
    <button type="submit">Send information</button>
  </div>
</form>



<script>
{% include js/offers.js %}
</script>