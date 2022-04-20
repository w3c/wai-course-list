---
title: 'Form Submitted'
permalink: /failure
---
<div style="grid-column: 2 / span 6">

<style> 
{% include css/styles.css %}
main > header { grid-column: 2 / span 6; }
</style>

{% assign strings = site.data.strings %}
<div>
{{ strings.failure_message }}
</div>


<a href="../course-list">{{strings.back_to_list_link}}</a>
</div>