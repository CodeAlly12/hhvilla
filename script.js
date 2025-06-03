// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 1500);

    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const thumbnails = document.querySelectorAll('.hero-thumbnails .thumbnail');
    const totalSlides = slides.length;
    const currentNumber = document.querySelector('.slide-counter .current');
    const totalNumber = document.querySelector('.slide-counter .total');
    
    // Initialize slide counter
    if (currentNumber && totalNumber) {
        currentNumber.textContent = '01';
        totalNumber.textContent = totalSlides < 10 ? '0' + totalSlides : totalSlides;
    }
    
    // Function to change slides
    function goToSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Add active class to current slide, dot, and thumbnail
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        if (thumbnails[index]) {
            thumbnails[index].classList.add('active');
        }
        
        // Update current slide number
        if (currentNumber) {
            currentNumber.textContent = index + 1 < 10 ? '0' + (index + 1) : (index + 1);
        }
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        if (currentSlide >= totalSlides - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }
    
    // Previous slide function
    function prevSlide() {
        if (currentSlide <= 0) {
            goToSlide(totalSlides - 1);
        } else {
            goToSlide(currentSlide - 1);
        }
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Add click event listeners to thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const index = parseInt(thumbnail.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Add click event listeners to next and prev buttons
    const nextBtn = document.querySelector('.next-arrow');
    const prevBtn = document.querySelector('.prev-arrow');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Auto slide change
    setInterval(nextSlide, 7000);
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    
    function goToTestimonial(index) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
    });
    
    // Auto testimonial change
    setInterval(function() {
        if (currentTestimonial >= testimonialSlides.length - 1) {
            goToTestimonial(0);
        } else {
            goToTestimonial(currentTestimonial + 1);
        }
    }, 5000);
    
    // Initialize flatpickr for date inputs
    if (typeof flatpickr !== 'undefined') {
        flatpickr('.datepicker', {
            minDate: 'today',
            dateFormat: 'd M, Y',
            disableMobile: true
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavItem() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
});




document.addEventListener('DOMContentLoaded', function() {
    // Initialize the booking suggestion functionality
    initBookingSuggestion();
});





function initBookingSuggestion() {
    // Get the check availability button
    const checkAvailabilityBtn = document.querySelector('.check-availability');
    
    // Only proceed if the button exists on the page
    if (!checkAvailabilityBtn) return;
    
    // Add event listener to the button
    checkAvailabilityBtn.addEventListener('click', function() {
        // Get input values from the booking widget
        const checkInInput = document.querySelectorAll('.booking-input .datepicker')[0];
        const checkOutInput = document.querySelectorAll('.booking-input .datepicker')[1];
        const guestSelect = document.querySelectorAll('.booking-input select')[0];
        const childSelect = document.querySelectorAll('.booking-input select')[1];
        
        // Get the values from the inputs
        const checkInDate = checkInInput ? checkInInput.value : '';
        const checkOutDate = checkOutInput ? checkOutInput.value : '';
        
        // Check if dates are selected
        if (!checkInDate || !checkOutDate) {
            alert('Please select both check-in and check-out dates.');
            return;
        }
        
        // Get the selected guest option text
        const adultGuestsText = guestSelect ? guestSelect.options[guestSelect.selectedIndex].text : '0';
        const childGuestsText = childSelect ? childSelect.options[childSelect.selectedIndex].text : '0';
        
        // Extract numbers from the text
        // For adults, extract the first number from strings like "2 Guests"
        const adultMatch = adultGuestsText.match(/\d+/);
        const numAdults = adultMatch ? parseInt(adultMatch[0]) : 0;
        
        // For children, extract the number, handling the case where it's just a number
        const childMatch = childGuestsText.match(/\d+/);
        const numChildren = childMatch ? parseInt(childMatch[0]) : 0;
        
        // Calculate total guests
        const totalGuests = numAdults + numChildren;
        
        // Determine the best accommodation option based on number of guests
        let recommendedAccommodation = '';
        let redirectUrl = '';
        
        if (totalGuests <= 2) {
            recommendedAccommodation = 'Garden Bungalows';
            redirectUrl = 'garden.html';
        } else if (totalGuests <= 6) {
            recommendedAccommodation = 'Main House';
            redirectUrl = 'main.html';
        } else {
            recommendedAccommodation = 'Entire Villa';
            redirectUrl = 'full.html';
        }
        
        // Show the recommendation modal
        showRecommendationModal(recommendedAccommodation, totalGuests, redirectUrl);
    });
}

// Function to show recommendation modal
function showRecommendationModal(accommodation, guests, redirectUrl) {
    // Remove any existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Set modal content
    modalContent.innerHTML = `
        <h3>Recommended Accommodation</h3>
        <p>Based on your party of ${guests} guest${guests > 1 ? 's' : ''}, we recommend:</p>
        <div class="recommendation">
            <h4>${accommodation}</h4>
            <p>${getAccommodationDescription(accommodation)}</p>
        </div>
        <div class="modal-buttons">
            <button class="view-details">View Details</button>
            <button class="close-modal">Continue Browsing</button>
        </div>
    `;
    
    // Append modal to the body
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Force a reflow before adding the active class for animation
    modalOverlay.offsetWidth;
    
    // Add the active class to trigger the animation
    requestAnimationFrame(() => {
        modalOverlay.classList.add('active');
    });
    
    // Add event listeners to modal buttons
    modalContent.querySelector('.view-details').addEventListener('click', function() {
        window.location.href = redirectUrl;
    });
    
    modalContent.querySelector('.close-modal').addEventListener('click', function() {
        closeModal(modalOverlay);
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.modal-overlay')) {
            closeModal(modalOverlay);
        }
    });
}

// Function to close modal with animation
function closeModal(modal) {
    modal.classList.remove('active');
    
    // Wait for the animation to complete before removing the element
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300); // Match this with the CSS transition duration
}

// Function to get accommodation description
function getAccommodationDescription(accommodation) {
    switch(accommodation) {
        case 'Garden Bungalows':
            return 'Three charming single-bedroom bungalows with private kitchenettes, perfect for couples.';
        case 'Main House':
            return 'Three spacious bedrooms with en-suite bathrooms, living area, and kitchen, ideal for families.';
        case 'Entire Villa':
            return 'The complete property with 6 bedrooms and 6 bathrooms, perfect for large groups seeking a private retreat.';
        default:
            return '';
    }
}

// Modal Functions - Simple Version
function openInquiryModal() {
    var modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal opened successfully');
    } else {
        console.error('Modal element not found! Check if the modal HTML exists in your page.');
    }
}

function closeInquiryModal() {
    var modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form
        var form = document.querySelector('.inquiry-form');
        if (form) {
            form.reset();
        }
    }
}

function submitInquiry(event) {
    event.preventDefault();
    
    // Get form values
    var name = document.getElementById('inquiryName').value;
    var email = document.getElementById('inquiryEmail').value;
    var phone = document.getElementById('inquiryPhone').value;
    var checkin = document.getElementById('inquiryCheckIn').value;
    var checkout = document.getElementById('inquiryCheckOut').value;
    var guests = document.getElementById('inquiryGuests').value;
    var subject = document.getElementById('inquirySubject').value;
    var message = document.getElementById('inquiryMessage').value;
    
    // Get selected contact method
    var contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
    
    // Create message content
    var messageContent = 'Name: ' + name + '\n';
    messageContent += 'Email: ' + email + '\n';
    
    if (phone) {
        messageContent += 'Phone: ' + phone + '\n';
    }
    
    if (checkin) {
        messageContent += 'Check-in: ' + checkin + '\n';
    }
    
    if (checkout) {
        messageContent += 'Check-out: ' + checkout + '\n';
    }
    
    if (guests) {
        messageContent += 'Number of Guests: ' + guests + '\n';
    }
    
    messageContent += '\nSubject: ' + subject + '\n';
    messageContent += '\nMessage:\n' + message;
    
    // Send via the selected method
    if (contactMethod === 'whatsapp') {
        // Format for WhatsApp
        var whatsappMessage = '*New Inquiry from HH Villa Website*\n\n';
        whatsappMessage += '*Name:* ' + name + '\n';
        whatsappMessage += '*Email:* ' + email + '\n';
        
        if (phone) {
            whatsappMessage += '*Phone:* ' + phone + '\n';
        }
        
        if (checkin) {
            whatsappMessage += '*Check-in:* ' + checkin + '\n';
        }
        
        if (checkout) {
            whatsappMessage += '*Check-out:* ' + checkout + '\n';
        }
        
        if (guests) {
            whatsappMessage += '*Guests:* ' + guests + '\n';
        }
        
        whatsappMessage += '*Subject:* ' + subject + '\n';
        whatsappMessage += '*Message:* ' + message;
        
        // Send WhatsApp message
        var whatsappNumber = '254715384796';
        var whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);
        window.open(whatsappUrl, '_blank');
    } else {
        // Send Email
        var emailSubject = encodeURIComponent('Website Inquiry: ' + subject);
        var mailtoUrl = 'mailto:info@hhvilla.me?subject=' + emailSubject + '&body=' + encodeURIComponent(messageContent);
        window.location.href = mailtoUrl;
    }
    
    // Close modal
    closeInquiryModal();
    
    // Show success message with correct contact method
    var toast = document.getElementById('successToast');
    if (toast) {
        // Update toast message based on selected contact method
        var toastMessage = document.querySelector('#successToast span');
        if (toastMessage) {
            toastMessage.textContent = "Thank you! Your inquiry is being sent via " + 
                (contactMethod === 'whatsapp' ? "WhatsApp" : "Email");
        }
        
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Modal script initializing');
    
    // Set up date inputs
    var today = new Date().toISOString().split('T')[0];
    var checkinInput = document.getElementById('inquiryCheckIn');
    var checkoutInput = document.getElementById('inquiryCheckOut');
    
    if (checkinInput) {
        checkinInput.setAttribute('min', today);
    }
    
    if (checkoutInput) {
        checkoutInput.setAttribute('min', today);
    }
    
    // Close modal when clicking outside
    var modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeInquiryModal();
            }
        });
    }
});

// Make functions globally available
window.openInquiryModal = openInquiryModal;
window.closeInquiryModal = closeInquiryModal;
window.submitInquiry = submitInquiry;

// Test function to check if script is loaded
console.log('Modal script loaded successfully');

// Diagnostic Script - Add this temporarily to debug
window.addEventListener('load', function() {
    console.log('=== Modal Diagnostic Check ===');
    
    // Check if modal exists
    var modal = document.getElementById('inquiryModal');
    console.log('Modal element exists:', !!modal);
    
    // Check if functions are defined
    console.log('openInquiryModal function exists:', typeof openInquiryModal === 'function');
    console.log('closeInquiryModal function exists:', typeof closeInquiryModal === 'function');
    console.log('submitInquiry function exists:', typeof submitInquiry === 'function');
    
    // Check contact button
    var contactButtons = document.querySelectorAll('[onclick*="openInquiryModal"]');
    console.log('Contact buttons found:', contactButtons.length);
    
    // Add event listener to all contact buttons as backup
    contactButtons.forEach(function(button) {
        console.log('Adding backup event listener to button');
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Contact button clicked');
            openInquiryModal();
        });
    });
    
    // Test the modal directly
    window.testModal = function() {
        console.log('Testing modal...');
        openInquiryModal();
    };
    
    console.log('=== To test the modal, type testModal() in the console ===');
});