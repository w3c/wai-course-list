---
permalink: course-list/form-test
---

{% include netlify-form.liquid type="start" name="form-test" %}

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

<fieldset class="field" id="course-audience">
    <legend class="label">Audience (Required)</legend>
    <div class="radio-field">
      <input type="checkbox" id="course-audience-content-author" name="course-audience-content-author" group="audience" required>
      <label for="course-audience-content-author">Content Author</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="course-audience-designer" id="course-audience-designer" group="audience" >
      <label for="course-audience-designer">Designer</label>
    </div>
  </fieldset>

  <button type="submit">Send information</button>

{% include netlify-form.liquid type="end"%}
