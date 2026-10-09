// Shared "plan your stay" picker for main.html / garden.html / full.html.
// Canonical accommodation data — must stay in sync with booking.html's
// .accommodation-option data-* attributes.
const ACCOMMODATIONS = {
    'garden-bungalows': {
        pageUrl: 'garden.html',
        title: 'Garden Bungalow',
        nightly: { type: 'garden-bungalows-nightly', price: 40 },
        weekly: { type: 'garden-bungalows-weekly', price: 257 },
        maxAdults: 2,
        maxChildren: 1
    },
    'main-house': {
        pageUrl: 'main.html',
        title: 'Main House',
        nightly: { type: 'main-house-nightly', price: 130 },
        weekly: { type: 'main-house-weekly', price: 910 },
        maxAdults: 6,
        maxChildren: 3
    },
    'entire-villa': {
        pageUrl: 'full.html',
        title: 'Entire Villa',
        nightly: { type: 'entire-villa-nightly', price: 250 },
        weekly: { type: 'entire-villa-weekly', price: 1950 },
        maxAdults: 12,
        maxChildren: 6
    }
};

// Ordered smallest to largest so the first accommodation that fits wins.
const ACCOMMODATION_ORDER = ['garden-bungalows', 'main-house', 'entire-villa'];

function suggestAccommodation(adults, children) {
    for (const slug of ACCOMMODATION_ORDER) {
        const acc = ACCOMMODATIONS[slug];
        if (adults <= acc.maxAdults && children <= acc.maxChildren) {
            return slug;
        }
    }
    return 'entire-villa';
}

function initStayWidget(currentSlug) {
    const checkinInput = document.querySelector('.stay-widget .datepicker-checkin');
    const checkoutInput = document.querySelector('.stay-widget .datepicker-checkout');
    const adultsSelect = document.querySelector('.stay-widget .stay-adults');
    const childrenSelect = document.querySelector('.stay-widget .stay-children');
    const suggestionBanner = document.querySelector('.stay-suggestion');
    const nightlyLink = document.getElementById('book-nightly-link');
    const weeklyLink = document.getElementById('book-weekly-link');

    if (!checkinInput || !checkoutInput || !adultsSelect || !childrenSelect) {
        return;
    }

    const checkoutPicker = flatpickr(checkoutInput, {
        minDate: new Date().fp_incr(1),
        dateFormat: 'Y-m-d'
    });

    const checkinPicker = flatpickr(checkinInput, {
        minDate: 'today',
        dateFormat: 'Y-m-d',
        onChange: function (selectedDates) {
            if (selectedDates.length > 0) {
                checkoutPicker.set('minDate', new Date(selectedDates[0]).fp_incr(1));
            }
        }
    });

    function buildBookingUrl(rate) {
        const acc = ACCOMMODATIONS[currentSlug];
        const params = new URLSearchParams();
        params.set('type', rate.type);
        params.set('price', rate.price);
        params.set('title', `${acc.title} - ${rate.type.endsWith('weekly') ? 'Weekly Rate' : 'Nightly Rate'}`);

        if (checkinInput.value) params.set('checkin', checkinInput.value);
        if (checkoutInput.value) params.set('checkout', checkoutInput.value);
        params.set('adults', adultsSelect.value);
        params.set('children', childrenSelect.value);

        return `booking.html?${params.toString()}`;
    }

    function buildSwitchUrl(targetSlug) {
        const params = new URLSearchParams();
        if (checkinInput.value) params.set('checkin', checkinInput.value);
        if (checkoutInput.value) params.set('checkout', checkoutInput.value);
        params.set('adults', adultsSelect.value);
        params.set('children', childrenSelect.value);
        return `${ACCOMMODATIONS[targetSlug].pageUrl}?${params.toString()}`;
    }

    function refresh() {
        const adults = parseInt(adultsSelect.value, 10) || 1;
        const children = parseInt(childrenSelect.value, 10) || 0;

        if (nightlyLink) nightlyLink.href = buildBookingUrl(ACCOMMODATIONS[currentSlug].nightly);
        if (weeklyLink) weeklyLink.href = buildBookingUrl(ACCOMMODATIONS[currentSlug].weekly);

        if (!suggestionBanner) return;

        const suggested = suggestAccommodation(adults, children);
        if (suggested === currentSlug) {
            suggestionBanner.hidden = true;
            return;
        }

        const suggestedAcc = ACCOMMODATIONS[suggested];
        suggestionBanner.hidden = false;
        suggestionBanner.innerHTML = `Based on your party of ${adults} adult${adults === 1 ? '' : 's'}${children > 0 ? ` and ${children} child${children === 1 ? '' : 'ren'}` : ''}, <strong>${suggestedAcc.title}</strong> is a better fit — <a href="${buildSwitchUrl(suggested)}">switch to ${suggestedAcc.title}</a>`;
    }

    checkinInput.addEventListener('change', refresh);
    checkoutInput.addEventListener('change', refresh);
    adultsSelect.addEventListener('change', refresh);
    childrenSelect.addEventListener('change', refresh);

    // Pre-fill from a switch-page link, if present.
    const params = new URLSearchParams(window.location.search);
    const paramCheckin = params.get('checkin');
    const paramCheckout = params.get('checkout');
    const paramAdults = params.get('adults');
    const paramChildren = params.get('children');

    if (paramCheckin) checkinPicker.setDate(paramCheckin, true);
    if (paramCheckout) checkoutPicker.setDate(paramCheckout, true);
    if (paramAdults && adultsSelect.querySelector(`option[value="${CSS.escape(paramAdults)}"]`)) {
        adultsSelect.value = paramAdults;
    }
    if (paramChildren && childrenSelect.querySelector(`option[value="${CSS.escape(paramChildren)}"]`)) {
        childrenSelect.value = paramChildren;
    }

    refresh();
}
