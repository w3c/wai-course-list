---
permalink: course-list/form-test
# set published to true to generate page for testing 
published: true
---

{% include netlify-form.liquid type="start" name="form-test-1" %}

<div class="field">
     <label for="submitter-name" class="label-input">Name (Required)</label>
     <input type="text" id="submitter-name" name="submitter-name" required="" />
   </div>
   <div class="field">
     <label for="submitter-email" class="label-input">Email (Required)</label>
     <input type="email" id="submitter-email" name="submitter-email" required="" />
</div>

<fieldset class="field" id="course-learning">
    <legend class="label">Scheduling (Required)</legend>
    <p class="expl">Indicate the type of activities provided in this resource. Choose as many as apply.</p>
    <div class="radio-field">
        <input type="checkbox" id="course-learning-scheduled" name="course-learning-scheduled" group="learning" required>
        <label for="course-learning-scheduled">Scheduled - participants are required to attend at a specific time</label>
    </div>
    <div class="radio-field">
        <input type="checkbox" id="course-learning-not-scheduled" name="course-learning-not-scheduled" group="learning">
        <label for="course-learning-not-scheduled">Unscheduled - participants can attend at their own pace</label>
    </div>
</fieldset>

<button type="submit">Send information</button>

{% include netlify-form.liquid type="end"%}
