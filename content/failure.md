---
title: 'Something went wrong'
permalink: course-list/failure
---
<div style="grid-column: 2 / span 8">

<style> 
{% include wai-course-list/css/styles.css %}
main > header { grid-column: 2 / span 8; }
</style>

{% assign strings = site.data.wai-course-list.strings %}
<div class="result-status-message">
{{ strings.failure_message }}: <a href="mailto:group-wai-list-courses@w3.org?subject=Something%20went%20wrong">{{strings.contact_email_list_courses}}</a>
</div>

<a href="../">{{strings.back_to_list_link}}</a>
</div>