// 4. Hämta checkboxarna
const onlineCheckbox = document.querySelector('#online');
const onsiteCheckbox = document.querySelector('#onsite');

// 5. Koppla event listeners
onlineCheckbox.addEventListener('change', applyFilters);
onsiteCheckbox.addEventListener('change', applyFilters);

// 6. Filtreringslogik
function applyFilters() {
  const online = onlineCheckbox.checked;
  const onsite = onsiteCheckbox.checked;

  // inget valt → visa allt
  if (!online && !onsite) {
    renderChallenges(challenges);
    return;
  }

  const filtered = challenges.filter(ch => {
    if (online && ch.location === 'online') return true;
    if (onsite && ch.location === 'on-site') return true;
    return false;
  
    if (text === title)
});

  

  renderChallenges(filtered);
}