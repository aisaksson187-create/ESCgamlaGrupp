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
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.querySelector('.filterBtn');
    const filterContainer = document.getElementById('filterContainer');
    const cards = document.querySelectorAll('.card');
    
    filterBtn.addEventListener("click", async function() {
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
            checkbox.addEventListener('change', function() {
                applyFilters(); // Apply filters immediately when checkbox changes
            });
        });
        
        // Close button functionality
        container.querySelector('#closeFilter').addEventListener('click', function() {
            filterContainer.innerHTML = '';
            filterBtn.style.display = "block";
            showAllCards(); // Show all cards when closing filter
        });
    
    }
    
    function showAllCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }
});

/* ----------------------- Book this room (Modal) ------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    // Get all "Book this room" buttons - use class instead of ID since there are multiple
    const bookButtons = document.querySelectorAll('.0bookThisRoom');
    const modal = document.querySelector("#bookRoomModal");
    
    // Add click event to each "Book this room" button
    bookButtons.forEach(button => {
        button.addEventListener("click", async function() {
            try {
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
                    closeBtn.addEventListener('click', function(){
                        modal.style.display = "none";
                    });
                }

                // Close modal when clicking outside
                window.addEventListener('click', function(event){
                    if(event.target == modal){
                        modal.style.display = "none";
                    }
                });

                // Handle form submission
                const bookingForm = modal.querySelector('#bookingForm');
                if (bookingForm) {
                    bookingForm.addEventListener('submit', function(e) {
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
        });
    });
});