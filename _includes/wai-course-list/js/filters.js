document.addEventListener('DOMContentLoaded', function (event) {
  const filterForm = document.querySelector('.data-filter-form')

  console.log(filterForm)

  function toggleFilters() {
    if (!filterForm.classList.contains('open')) {
      filterForm.classList.add('open')
      document.querySelector('.button-filters').classList.add('closed')
    } else {
      filterForm.classList.remove('open')
      document.querySelector('.button-filters').classList.remove('closed')
    }
  }

  document.querySelector('.button-filters').addEventListener('click', (e) => {
    toggleFilters()
  })

  document.querySelector('.close-filters').addEventListener('click', (e) => {
    toggleFilters()
  })
})
