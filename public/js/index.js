document.getElementById('language-select').addEventListener('change', function () {
    const language = this.value;
    const elements = document.querySelectorAll('[data-en], [data-tr]');

    elements.forEach(el => {
        if (el.tagName === 'IMG') { // Special handling for images if needed
            el.src = el.getAttribute(`data-${language}-src`);
        } else {
            el.textContent = el.getAttribute(`data-${language}`);
        }
    });
});

// Load language preference on initial load
window.onload = function () {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        document.getElementById('language-select').value = savedLanguage;
        document.getElementById('language-select').dispatchEvent(new Event('change'));
    }
};

// Save language preference
document.getElementById('language-select').addEventListener('change', function () {
    localStorage.setItem('preferredLanguage', this.value);
});

//to toggle the menu icon when using small screens
function toggleNavItems() {
    var element = document.querySelector('.nav-items');
    if (element.classList.contains('responsive')) {
        element.classList.remove('responsive');
    } else {
        element.classList.add('responsive');
    }
}

//for animation pop up when site is loaded or refreshed
AOS.init({
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: 34.0522, lng: -118.2437 } // Centers the map over the USA
    });

    // Array of markers with detailed project info
    var markers = [
        {
            coords: { lat: 34.0522, lng: -118.2437 },
            content: '<h1>Urban Tree Planting Initiative</h1><p>This initiative focuses on increasing urban green spaces in Los Angeles.</p>'
        },
        {
            coords: { lat: 24.5551, lng: -81.7800 },
            content: '<h1>Coral Reef Restoration Program</h1><p>This program is dedicated to restoring coral reefs in the Florida Keys.</p>'
        }
    ];

    // Loop through markers and add to map
    markers.forEach(function (marker) {
        addMarker(marker);
    });

    // Function to add a marker to the map
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        // Check for custom content and create an info window
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
}

$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        $.ajax({
            type: 'POST',
            url: '/contact', // Ensure this matches your route
            data: $('#contactForm').serialize(),
            success: function (response) {
                $('#successModal').modal('show'); // Show the modal
                $('#contactForm')[0].reset(); // Reset the form fields
            },
            error: function (error) {
                alert('There was an error sending your message. Please try again later.');
            }
        });
    });
});
