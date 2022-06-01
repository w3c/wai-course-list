---
title: 'Form Submitted'
permalink: courses/submission/success
---
<div style="grid-column: 2 / span 8">

<style> 
{% include wai-course-list/css/styles.css %}
main > header { grid-column: 2 / span 8; }
</style>

{% assign strings = site.data.wai-course-list.strings %}

<div class="result-status-message">
{{ strings.success_message }}
</div>



<div class="header-full success"><p><em>{{ strings.gh_note }}</em></p></div>


</div>