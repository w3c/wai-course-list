---
permalink: course-list/form-test
---

{% include netlify-form.liquid type="start" id="form" %}

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
      <input type="checkbox" name="course-audience" id="course-audience-content-author" value="course-audience-content-author" group="audience" required>
      <label for="course-audience-content-author">Content Author</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="course-audience" id="course-audience-designer" value="course-audience-designer" group="audience" >
      <label for="course-audience-designer">Designer</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="course-audience" id="course-audience-developer" value="course-audience-developer" group="audience" >
      <label for="course-audience-developer">Developer</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="course-audience" id="course-audience-manager" value="course-audience-manager" group="audience" >
      <label for="course-audience-manager">Manager</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="course-audience" id="course-audience-tester" value="course-audience-tester" group="audience" >
      <label for="course-audience-tester">Tester</label>
    </div>
    <div class="radio-field">
      <input type="checkbox" name="course-audience" id="course-audience-other" value="course-audience-other" group="audience" >
      <label for="course-audience-other">Other</label>
    </div>
  </fieldset>

  <button type="submit">Send information</button>

{% include netlify-form.liquid type="end"%}
