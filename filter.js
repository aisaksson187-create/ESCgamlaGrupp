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


            const filterTags = document.querySelectorAll('.filterTags');

            filterTags.forEach(tag => {
                tag.addEventListener('click', () => {

                    tag.classList.toggle('active');
                });
            });

            const containers = document.querySelectorAll('.star-container');

            containers.forEach(container => {
                const stars = container.querySelectorAll('.star');

                stars.forEach((star, index) => {
                    star.addEventListener('click', () => {

                        const currentRating = container.querySelectorAll('.active').length;
                        const newRating = (currentRating === index + 1) ? 0 : index + 1;

                        stars.forEach((s, i) => {
                            s.classList.toggle('active', i < newRating);
                        });

                    });
                });
            });
