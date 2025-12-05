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
const filterTags = document.querySelectorAll('.filterTags');
const starMin = document.querySelectorAll('.rating .star-container:first-of-type .star');
const starMax = document.querySelectorAll('.rating .star-container:last-of-type .star');
let minRating = 0;
let maxRating = 5;
markStars(starMax, maxRating);


/* Eventlisteners */
cbOnline.addEventListener('change', filter);
cbOnsite.addEventListener('change', filter);
textInput.addEventListener('input', filter);
filterBtn.addEventListener('click', () => {
    filterInterface.classList.add('active');
});
closeBtn.addEventListener('click', () => {
    filterInterface.classList.remove('active');
});
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        filter();
    });
});
starMin.forEach((star, index) => {
    star.addEventListener('click', () => {
        const newValue = index + 1;

        if (minRating === newValue) {
            minRating = 0;
        }
        else {
            minRating = newValue;

            if (minRating > maxRating) {
                maxRating = minRating;
                markStars(starMax, maxRating);
            }
        }

        markStars(starMin, minRating);
        filter();
    });
});
starMax.forEach((star, index) => {
    star.addEventListener('click', () => {
        const newValue = index + 1;

        if (maxRating === newValue) {
            maxRating = 0;
        }
        else {
            maxRating = newValue;
            if (maxRating < minRating) {
                minRating = maxRating;
                markStars(starMin, minRating);
            }
        }
        markStars(starMax, maxRating);
        filter();
    });
});
function markStars(stars, count) {
    stars.forEach((star, i) => {
        star.classList.toggle('active', i < count);
    });
}

/* Main filter function */
function filter() {
    let filtered = allChallenges;

    /* Checkbox-filter */
    const showOnline = cbOnline.checked;
    const showOnsite = cbOnsite.checked;
    const searchText = textInput.value.toLowerCase();
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

    /* Text-input filter */
    if (searchText) {
        filtered = filtered.filter(challenge => {
            const title = challenge.title.toLowerCase();
            const desc = challenge.description.toLowerCase();
            return title.includes(searchText) || desc.includes(searchText);
        }
        )
    };

    /* Tag filter */
    const activeTags = [];
    const activeElements = document.querySelectorAll('.filterTags.active');

    activeElements.forEach(tag => {
        activeTags.push(tag.dataset.tag);
    });
    if (activeTags.length > 0) {
        filtered = filtered.filter(challenge => {
            if (!challenge.labels || !Array.isArray(challenge.labels)) {
                return false;
            }
            for (let i = 0; i < activeTags.length; i++) {
                let tag = activeTags[i];

                if (!challenge.labels.includes(tag)) {
                    return false;
                }
            }
            return true;
        });
    }

    /* Star filter */
    filtered = filtered.filter(challenge => {
        return Math.round(challenge.rating) >= minRating && Math.round(challenge.rating <= maxRating);
    });


    renderList(container, filtered)

}









