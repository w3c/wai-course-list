document.querySelectorAll('.module').forEach(item => {
  if(item.getAttribute("collapsed")){
    makeCollapsible(item);
  }
})


function makeCollapsible(item){
  var label = item.querySelector('.name');
  label.classList.add("collapsible");
  
  if(item.getAttribute("collapsed") == "true"){
    label.innerHTML += '{% include_cached icon.html name="chevron-down" %}';
    item.querySelector('.options').classList.add("collapsed");
  }else{
    label.innerHTML += '{% include_cached icon.html name="chevron-up" %}';
  }
  
  label.addEventListener('click', e => { toggleCollapsed(item) });
  label.addEventListener('keyup', e => { 
    if (e.key === "Enter") {
      e.preventDefault();
      label.click();
    }
  });
}

function toggleCollapsed(item){
  var label = item.querySelector('.name');
  var options = item.querySelector('.options');
  
  if(options.classList.contains("collapsed")){
    label.querySelector('.icon-chevron-down').remove();
    label.innerHTML += '{% include_cached icon.html name="chevron-up" %}';
    options.classList.remove("collapsed");
    
    if(item.querySelector('.showMoreBlock') != undefined){
      item.querySelector('.showMoreBlock').classList.remove("collapsed");
    }
  }else{
    label.querySelector('.icon-chevron-up').remove();
    label.innerHTML += '{% include_cached icon.html name="chevron-down" %}';
    options.classList.add("collapsed");
    
    if(item.querySelector('.showMoreBlock') != undefined){
      item.querySelector('.showMoreBlock').classList.add("collapsed");
    }
  }
}
