import { fetchChallenges, renderList } from './createcard.js';

const allChallenges = await fetchChallenges();
const container = document.querySelector('#allChallenges');

renderList(container, allChallenges);





function filter() {
    let filteredChallenges = allChallenges;

    filtered = allChallenges.filter(challenge => {


});

renderList(container, filtered)
}



