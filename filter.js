import { fetchChallenges } from './api.js';
import { renderList } from './createcard.js';

const allChallenges = await fetchChallenges();
const container = document.querySelector('#allChallenges');

renderList(container, allChallenges);


const filterTags = document.querySelectorAll('.filterTags');
const starMin = document.querySelectorAll('.rating .star-container:first-of-type .star');
const starMax = document.querySelectorAll('.rating .star-container:last-of-type .star');


let minRating = 1;
let maxRating = 5;


filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        filter(); 
    });
});


starMin.forEach((star, index) => {
    star.addEventListener('click', () => {
        minRating = index + 1;
        markStars(starMin, minRating);
        filter();
    });
});

starMax.forEach((star, index) => {
    star.addEventListener('click', () => {
        maxRating = index + 1;
        markStars(starMax, maxRating);
        filter();
    });
});

function markStars(stars, count) {
    stars.forEach((star, i) => {
        star.classList.toggle('active', i < count);
    });
}


function filter() {
 let filtered = allChallenges;






















    /*text filter*/





























    /*tag*/

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




    /*rating*/
    filtered = filtered.filter(challenge => {
        return challenge.rating >= minRating && challenge.rating <= maxRating;
    });
    
    renderList(container, filtered);
}















