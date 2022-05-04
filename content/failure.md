---
title: 'Something went wrong'
permalink: /failure
---
<div style="grid-column: 2 / span 6">

<style> 
{% include css/styles.css %}
main > header { grid-column: 2 / span 6; }
</style>

{% assign strings = site.data.strings %}
<div class="result-status-message">
{{ strings.failure_message }}: <a href="mailto:group-wai-list-courses@w3.org?subject=Something%20went%20wrong">{{strings.contact_email_list_courses}}</a>
</div>

<a href="../course-list">{{strings.back_to_list_link}}</a>
</div>