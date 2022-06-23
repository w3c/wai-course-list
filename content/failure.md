---
title: 'Something went wrong'
permalink: courses/submission/failure
---
<div style="grid-column: 2 / span 8">

<style> 
{% include wai-course-list/css/styles.css %}
main > header { grid-column: 2 / span 8; }
</style>

{% assign strings = site.data.wai-course-list.strings %}
<div class="result-status-message">
<p>{{ strings.failure_message }}</p>
<p>{{ strings.failure_message_contact_info }}: <a href="mailto:group-wai-list-courses@w3.org?subject=Something%20went%20wrong">{{ strings.contact_email_list_courses }}</a></p>
</div>

</div>