import { fetchChallenges, renderList } from './createcard.js';


const allChallenges = await fetchChallenges();
const container = document.querySelector('#allChallenges');

renderList(container, allChallenges);

/* All variables from DOM */
const cbOnline = document.querySelector('.checkbox-online');
const cbOnsite = document.querySelector('.checkbox-onsite');


/* Eventlisteners */
cbOnline.addEventListener('change', filter);
cbOnsite.addEventListener('change', filter);


function filter() {
   let filtered = allChallenges;
    const showOnline = cbOnline.checked;
    const showOnsite = cbOnsite.checked;
 /* Checkbox-filter */   
  filtered = allChallenges.filter(challenge => {
  if (showOnline && !showOnsite) {
    return challenge.type === 'online';
  }
  if (!showOnline && showOnsite) {
    return challenge.type === 'onsite';
  }
  if (showOnline && showOnsite) {
    return true;
  }
  return true;
});

/* Text-filter */

















/* Tag-filter */



















/* Star-filter  */


















  renderList(container, filtered)
}

