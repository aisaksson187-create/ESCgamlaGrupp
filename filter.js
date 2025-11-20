import { renderList } from './createcard.js';
import { fetchChallenges } from './api.js';


const allChallenges = await fetchChallenges();
const container = document.querySelector('#allChallenges');

renderList(container, allChallenges);

/* All variables from DOM */
const cbOnline = document.querySelector('.checkbox-online');
const cbOnsite = document.querySelector('.checkbox-onsite');
const textInput = document.querySelector('.search-input')
const filterBtn = document.querySelector('.filterBtn');
const filterInterface = document.querySelector('.filter-interface');
const closeBtn = document.querySelector('.close-btn');



/* Eventlisteners */
cbOnline.addEventListener('change', filter);
cbOnsite.addEventListener('change', filter);
textInput.addEventListener('input', filter);

filterBtn.addEventListener('click', () => {
    filterInterface.classList.add('active');
} );

closeBtn.addEventListener('click', () => {
    filterInterface.classList.remove('active');
} );


function filter() {
    let filtered = allChallenges;
    const showOnline = cbOnline.checked;
    const showOnsite = cbOnsite.checked;
    const searchText = textInput.value.toLowerCase();
   
    /* Checkbox-filter */
    filtered = filtered.filter(challenge => {
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

    if (searchText) {
        filtered = filtered.filter(challenge => {
            const title = challenge.title.toLowerCase();
            const desc = challenge.description.toLowerCase();
            return title.includes(searchText) || desc.includes(searchText);
        });
    }



























    /* Tag-filter */



















    /* Star-filter  */


















    renderList(container, filtered)
}

