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

/* ----------------------- Book this room (Modal) ------------------------- */

function addBookbuttonListeners() {
    // Get all "Book this room" buttons - use class instead of ID since there are multiple
    const bookButtons = document.querySelectorAll('.BookThisRoom');

    // Add click event to each "Book this room" button
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            toggleModal(button.dataset.id);
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