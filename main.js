const menuBtn = document.querySelector("#menuBtn")
const mainNav = document.querySelector("#mainNav")
const closeBtn = document.querySelector("#closeBtn")
const overlay = document.querySelector("#overlay");
const filterBtn = document.querySelector('.filterBtn');

const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('btn2');

menuBtn.addEventListener("click",
    function () {
        mainNav.classList.add("active");
        overlay.classList.add("active");
    }
)

closeBtn.addEventListener("click",
    function () {
        mainNav.classList.remove("active");
        overlay.classList.remove("active");
    }
)

function loadChallengesPage() {
    window.location.href = 'OurChallenges.html';
}

/* --------------------- Handle Filter Challenges ------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const filterBtn = document.querySelector('.filterBtn');
    const filterContainer = document.getElementById('filterContainer');
    const cards = document.querySelectorAll('.card');

    filterBtn.addEventListener("click", async function () {
        // Toggle filter interface
        if (filterContainer.innerHTML !== '') {
            filterContainer.innerHTML = '';
            return;
        }

        // Create container
        const filterDiv = document.createElement("div");
        filterContainer.appendChild(filterDiv);

        try {
            // Load external HTML
            filterBtn.style.display = "none";
            const response = await fetch('filterInterface.html');
            const html = await response.text();
            filterDiv.innerHTML = html;

            // Add functionality
            addFilterFunctionality(filterDiv);

        } catch (error) {
            console.error('Error loading filter interface:', error);
            filterDiv.innerHTML = '<p>Error loading filters</p>';
        }
    });

    function addFilterFunctionality(container) {
        // Checkbox functionality
        const checkboxes = container.querySelectorAll('.filter-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                applyFilters(); // Apply filters immediately when checkbox changes
            });
        });

        // Tag buttons toggle functionality
        const tagButtons = container.querySelectorAll('.filterTags');
        tagButtons.forEach(button => {
            button.addEventListener('click', function () {
                this.classList.toggle('active');
                applyFilters(); // Apply filters immediately when tags change
            });
        });

        // Star rating functionality
        const stars = container.querySelectorAll('.star');
        let currentRating = 0;

        stars.forEach((star, index) => {
            star.addEventListener('click', function () {
                currentRating = index + 1;
                updateStars();
                applyFilters(); // Apply filters immediately when rating changes
            });
        });

        function updateStars() {
            stars.forEach((star, index) => {
                if (index < currentRating) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
        }

        // Close button functionality
        container.querySelector('#closeFilter').addEventListener('click', function () {
            filterContainer.innerHTML = '';
            filterBtn.style.display = "block";
            showAllCards(); // Show all cards when closing filter
        });

        // Search input functionality - apply filters as user types
        const searchInput = container.querySelector('.search-input');
        let searchTimeout;
        searchInput.addEventListener('input', function (e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters(); // Apply filters after user stops typing
            }, 300);
        });

        // Apply filters function
        function applyFilters() {
            const selectedTypes = Array.from(container.querySelectorAll('.filter-checkbox:checked'))
                .map(checkbox => checkbox.dataset.type);
            const selectedTags = Array.from(container.querySelectorAll('.filterTags.active'))
                .map(btn => btn.dataset.tag);
            const rating = currentRating;
            const searchTerm = container.querySelector('.search-input').value.toLowerCase();

            console.log('Applying filters:', {
                types: selectedTypes,
                tags: selectedTags,
                rating: rating,
                search: searchTerm
            });

            filterCards(selectedTypes, selectedTags, rating, searchTerm);
        }
    }

    function filterCards(types, tags, rating, searchTerm) {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            let shouldShow = true;

            // Filter by type (online/onsite)
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            if (types.length > 0) {
                const hasOnline = types.includes('online') && cardTitle.includes('online');
                const hasOnsite = types.includes('onsite') && cardTitle.includes('on-site');
                if (!hasOnline && !hasOnsite) {
                    shouldShow = false;
                }
            }

            // Filter by tags (you would need to add data attributes to your cards)
            if (tags.length > 0 && shouldShow) {
                // This would require adding data-tag attributes to your cards
                // For now, we'll just show all cards if tags are selected
                // shouldShow = tags.some(tag => card.dataset.tags?.includes(tag));
            }

            // Filter by rating
            if (rating > 0 && shouldShow) {
                const cardStars = card.querySelectorAll('.fa-solid.fa-star').length;
                if (cardStars < rating) {
                    shouldShow = false;
                }
            }

            // Filter by search term
            if (searchTerm && shouldShow) {
                const cardText = card.textContent.toLowerCase();
                if (!cardText.includes(searchTerm)) {
                    shouldShow = false;
                }
            }

            // Show or hide the card
            if (shouldShow) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function showAllCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    const data = await getChallenges();
    data.challenges.forEach(challenge => {
        createCard(challenge);
    });

    addBookbuttonListeners();
});

function createCard(challenge) {
    const card = document.createElement("article");
    const cardImage = document.createElement("img");
    const cardContent = document.createElement("div");
    const cardHeader = document.createElement("h3");
    const rating = document.createElement("div");
    const participants = document.createElement("span");
    const description = document.createElement("p");
    const bookButton = document.createElement("button");

    card.classList.add("card");
    cardContent.classList.add("cardContent");
    rating.classList.add("rating");
    participants.classList.add("participants");
    bookButton.classList.add("bookThisRoom");
    bookButton.id = "challenge_" + challenge.id;

    cardImage.src = challenge.image;
    cardHeader.innerText = challenge.title;
    participants.innerText = challenge.minParticipants == challenge.maxParticipants ? challenge.minParticipants + " participants" : challenge.minParticipants + "-" + challenge.maxParticipants + " participants";
    description.innerText = challenge.description;
    bookButton.innerText = "Book this room";

    for (i = 0; i < 5; i++) {
        const star = document.createElement("span");
        star.classList.add(i < challenge.rating ? "fa-solid" : "fa-regular", "fa-star");
        rating.appendChild(star);
    }

    const cardContainer = document.querySelector(".cardContainer");

    cardContainer.appendChild(card);
    card.appendChild(cardImage);
    card.appendChild(cardContent);
    cardContent.appendChild(cardHeader);
    cardContent.appendChild(rating);
    rating.appendChild(participants);
    cardContent.appendChild(description);
    cardContent.appendChild(bookButton);

    if (challenge.type == "online")
        participants.innerText += " (networked)"
    else
        cardHeader.innerText += " (on-site)"
}

/* ----------------------- Book this room (Modal) ------------------------- */

function addBookbuttonListeners() {
    // Get all "Book this room" buttons - use class instead of ID since there are multiple
    const bookButtons = document.querySelectorAll('.bookThisRoom');

    // Add click event to each "Book this room" button
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            toggleModal(button.id.substring(10));
        });
    });
}

async function toggleModal(buttonID) {
    try {
        const modal = document.querySelector("#bookRoomModal");

        // Load external HTML for modal
        const response = await fetch('bookThisRoomModal.html');
        const html = await response.text();
        modal.innerHTML = html;

        // Show the modal
        modal.style.display = "block";

        // Get the close button from the newly loaded modal content
        const closeBtn = modal.querySelector(".close");

        // Close modal when X is clicked
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.style.display = "none";
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        // Handle form submission
        const bookingForm = modal.querySelector('#bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function (e) {
                e.preventDefault();
                // Handle form submission here
                alert('Booking submitted!');
                modal.style.display = "none";
            });
        }

    } catch (error) {
        console.error('Error loading Modal:', error);
        modal.innerHTML = '<p>Error loading booking form</p>';
    }
}