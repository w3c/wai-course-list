# A litte utility to help upate the netlify form submission repo dispath action  
# as it must be in the github default branch (master)
#
# The idea to is to check out the repo in another dir that is set to master branch and run this script 
# while working in the usal folder on the feature work branch

cp ../wai-course-list/.github/workflows/netlify-form-submission.yml .github/workflows/
git add .github/workflows/netlify-form-submission.yml
git commit -m"$1"
git push