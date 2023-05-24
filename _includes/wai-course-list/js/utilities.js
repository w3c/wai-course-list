document.querySelectorAll('.toggle_all').forEach(toggle_button => {
  toggle_button.addEventListener('click', e => {
    const modules = document.querySelectorAll('.module');
    const isAllClosed = [...modules].every(item => item.getAttribute('collapsed') === 'true');

    modules.forEach(item => {
      if (isAllClosed || item.getAttribute('collapsed') !== 'true') {
        toggleCollapsed(item);
      }
    });

    toggle_button.textContent = isAllClosed ? '{{ strings.filter_hide_all }}' : '{{ strings.filter_show_all }}';
    toggle_button.focus(); // Ensure the button retains focus after the click action
  });

  toggle_button.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === 'Space') {
      e.preventDefault();
      toggle_button.click(); // Trigger the button click on Enter or Space key press
    }
  });
});



function makeCollapsible(item) {
  const label = item.querySelector('.name');
  const options = item.querySelector('.options');

  label.classList.add('collapsible');
  label.addEventListener('click', e => {
    toggleCollapsed(item);
  });
  label.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      label.click();
    }
  });

  if (item.getAttribute('collapsed') === 'true') {
    label.innerHTML += '{% include_cached icon.html name="chevron-down" %}';
    options.classList.add('collapsed');
  } else {
    label.innerHTML += '{% include_cached icon.html name="chevron-up" %}';
  }
}

function toggleCollapsed(item) {
  const label = item.querySelector('.name');
  const options = item.querySelector('.options');

  if (options.classList.contains('collapsed')) {
    label.querySelector('.icon-chevron-down').remove();
    label.innerHTML += '{% include_cached icon.html name="chevron-up" %}';
    options.classList.remove('collapsed');
    item.setAttribute('collapsed', 'false');
  } else {
    label.querySelector('.icon-chevron-up').remove();
    label.innerHTML += '{% include_cached icon.html name="chevron-down" %}';
    options.classList.add('collapsed');
    item.setAttribute('collapsed', 'true');
  }
}

document.querySelectorAll('.module').forEach(item => {
  if (item.getAttribute('collapsed')) {
    makeCollapsible(item);
  }
});
