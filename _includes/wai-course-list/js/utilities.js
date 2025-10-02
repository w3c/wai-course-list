const expandButton = document.querySelector('.toggle_all.expand');
const collapseButton = document.querySelector('.toggle_all.hide');
const modules = document.querySelectorAll('.module');

// Enable the "Show All" button and disable the "Hide All" button initially
expandButton.disabled = false;
expandButton.classList.remove('toggle_all_disabled');
collapseButton.disabled = true;
collapseButton.classList.add('toggle_all_disabled');

expandButton.addEventListener('click', () => {
  modules.forEach(item => {
    if (item.getAttribute('collapsed') === 'true') {
      toggleCollapsed(item);
    }
  });

  // Update button states after expanding all elements
  expandButton.disabled = true;
  expandButton.classList.add('toggle_all_disabled');
  collapseButton.disabled = false;
  collapseButton.classList.remove('toggle_all_disabled');
});

collapseButton.addEventListener('click', () => {
  modules.forEach(item => {
    if (item.getAttribute('collapsed') !== 'true') {
      toggleCollapsed(item);
    }
  });

  // Update button states after collapsing all elements
  collapseButton.disabled = true;
  collapseButton.classList.add('toggle_all_disabled');
  expandButton.disabled = false;
  expandButton.classList.remove('toggle_all_disabled');
});

expandButton.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === 'Space') {
    e.preventDefault();
    if (!expandButton.disabled) {
      expandButton.click();
    }
  }
});

collapseButton.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === 'Space') {
    e.preventDefault();
    if (!collapseButton.disabled) {
      collapseButton.click();
    }
  }
});

// Rest of your code for making modules collapsible...

function makeCollapsible(item) {
  const label = item.querySelector('.name');
  const options = item.querySelector('.options');

  label.classList.add('collapsible');
  label.addEventListener('click', () => toggleCollapsed(item));
  handleButtonKeyDown(label, () => toggleCollapsed(item));

  const icon = document.createElement('span');
  icon.classList.add('icon');
  label.appendChild(icon);

  updateCollapsibleIcon(item);

  if (item.getAttribute('collapsed') === 'true') {
    options.classList.add('collapsed');
  }
}

function updateCollapsibleIcon(item) {
  const label = item.querySelector('.name');
  const icon = label.querySelector('.icon');

  icon.innerHTML = '{% include_cached icon.html name="' +
    (item.getAttribute('collapsed') === 'true' ? 'chevron-down' : 'chevron-up') +
    '" %}';
}

function toggleCollapsed(item) {
  const options = item.querySelector('.options');

  options.classList.toggle('collapsed');

  if (item.getAttribute('collapsed') === 'true') {
    item.setAttribute('collapsed', 'false');
  } else {
    item.setAttribute('collapsed', 'true');
  }

  updateCollapsibleIcon(item);
}

function handleButtonKeyDown(button, action) {
  button.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === 'Space') {
      e.preventDefault();
      if (!button.disabled) {
        action();
      }
    }
  });
}

// Initialize all elements as collapsed at the start
modules.forEach(item => {
  item.setAttribute('collapsed', 'true');
  makeCollapsible(item);
});
