---
# NEW: Comments for new repos start with "NEW". Please delete the NEW comments. Leave the other comments for translators. Also, search for @@s to replace. For multi-page resources and other frontmatter info, see: https://wai-website-theme.netlify.app/writing/frontmatter/

# Translation instructions are after the "#" character in this first section. They are comments that do not show up in the web page. You do not need to translate the instructions after #.
# In this first section, do not translate the words before a colon. For example, do not translate "title:". Do translate the text after "title:".

title: "List of Accessibility Courses"
title_html: "List of Accessibility Courses:<br>Education and training" 
nav_title: "List of Courses"

lang: en   # Change "en" to the translated-language shortcode from https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
last_updated: 2021-@@-@@   # Put the date of this translation YYYY-MM-DD (with month in the middle)

# translators:    # remove from the beginning of this line and the lines below: "# " (the hash sign and the space)
# - name: "Jan Doe"   # Replace Jan Doe with translator name
# - name: "Jan Doe"   # Replace Jan Doe with name, or delete this line if not multiple translators
# contributors:
# - name: "Jan Doe"   # Replace Jan Doe with contributor name, or delete this line if none
# - name: "Jan Doe"   # Replace Jan Doe with name, or delete this line if not multiple contributors

github:
  repository: w3c/wai-course-list
  path: content/index.md    # Add the language shortcode to the middle of the filename, for example: content/index.fr.md
permalink: /teach-advocate/course-list/   # Add the language shortcode to the end, with no slash at end, for example: /teach-advocate/course-list/fr


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
footer: >
   <p><strong>Date:</strong> <!-- Updated @@ Month 2021.--> First published Month 20@@. CHANGELOG.</p>
   <p><strong>Editors:</strong> @@name, @@name. <strong>Contributors:</strong> @@name, @@name, and <a href="https://www.w3.org/groups/wg/eowg/participants">participants of the EOWG</a>. ACKNOWLEDGEMENTS lists contributors and credits.</p>
   <p>Developed by the Accessibility Education and Outreach Working Group (<a href="http://www.w3.org/WAI/EO/">EOWG</a>). Developed as part of the <a href="https://www.w3.org/WAI/about/projects/wai-coop/">WAI-CooP project</a>, co-funded by the European Commission.</p>


---


<style> 
{% include css/styles.css %}
</style>

<div class="header-sup">
  <p>Browse for offers of education, training, and certification on digital accessibility.</p>

  <p><em>Note: offers are user-submitted, not W3C-endorsed, see <a href="#disclaimer">disclaimer</a> for vendor-submitted content.</em></p>
</div>


<!-- <a class="button button-more submit-a-offer" href="submit-an-offer"><span>Submit an offer</span></a> 
-->

<div id="app" class="offers">
  <div id="left-col" class="offers-filters">
    <form data-filter-form action="/api/offers.json" method="GET">
      <h2>Filters</h2>
      {% for filter in site.data.filters %}
      <fieldset id="{{ filter.id }}">
        <legend>{{ filter.name }}</legend>
        {% for option in filter.options %}
        <div class="offers-filters__filter">
          <input type="{{ filter.type }}" id="filter-{{ option.id }}" name="{{ option.id }}">
          <label for="filter-{{ option.id }}">{{ option.name }}</label>
        </div>
        {% endfor %}
      </fieldset>
      {% endfor %} 
    </form>
    <div class="disclaimer" id="disclaimer">
        <h2>Important Disclaimer</h2>
        <p><abbr title="World Wide Web Consortium">W3C</abbr> does not endorse specific vendor products. Inclusion of products in this list does not indicate endorsement by W3C. Products and search criteria are listed with no quality rating.</p>
        <p>Offer descriptions, search criteria, and other information in this database is provided by offers providers. W3C does not verify the accuracy of the information.</p>
        <p>The list is not a review of offers, nor a complete or definitive list of all offers. The information can change at any time.</p>
    </div>
  </div>
  <div class="offers-offers">
    <h2 class="visuallyhidden">List of offers</h2>
    <div role="alert">
      <p class="status status-busy" hidden>Loading offers…</p>
      <p class="status status-failure" hidden>something went wrong…</p>
    </div>
    <div id="offers-list">
      <p id="total-offers">Showing {{ site.data.offers | size }} offers</p>
      <a id="deselect" class="button deselect" hidden><span>Clear filters</span></a> 
      {% for offer in site.data.offers %}
        {% include offer.liquid %}
      {% endfor %}
    </div>
  </div>
</div>

<script>
{% include js/offers.js %}
</script>
