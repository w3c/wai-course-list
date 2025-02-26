# Course List

## Continuous Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/ef0441b4-e316-47ea-9961-e769a5c4407e/deploy-status)](https://app.netlify.com/sites/wai-course-list/deploys)

[Preview](https://wai-course-list.netlify.app/courses/list/)

## Links

- [Course List](https://www.w3.org/WAI/courses/list/)
- [Submission form](https://www.w3.org/WAI/courses/submission/)
- [Project background](https://www.w3.org/WAI/EO/wiki/WAI_Curricula/List_of_Courses)

## Form submission

When submitted the browser is redirected to a success/fail page while the GitHub Action runs async.

The GitHub action progress can be viewed here:
https://github.com/w3c/wai-course-list/actions/workflows/process-form-submission.yml

The PR will appear here:
https://github.com/w3c/wai-course-list/pulls

The Function progress is logged and can be viewed in netlify.

## Important Notes

Unless otherwise specified the form Submission calls the Netlify Function in the production deploy of the wai-website. It is possible to override with a DEBUG option in the submission filer to use a local function. This is for testing code changes locally. The Netlify Function processes the submitted form encoded data and passes as JSON to a GitHub action in wai-course-list repo. It also adds a couple of extra fields.

The Netlify console web app lets you view the [wai-website Function logs](https://app.netlify.com/sites/wai-website/functions/list-submission) which may help if there are errors. They are only kept 7 days.

There is a DEBUG option in the sumbission file to cause the Function to not call github and redirect to the outcome page but to return the json and form data. Make sure to comment out this and other options before checking in.

## About technical implementation and previews

See [interactive lists repo](https://github.com/w3c/wai-interactive-lists).