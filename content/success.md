---
title: 'Form Submitted'
permalink: /success
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


<a href="../course-list">{{strings.back_to_list_link}}</a>


<div class="header-full success"><p><em>{{ strings.gh_note }}</em></p></div>


</div>