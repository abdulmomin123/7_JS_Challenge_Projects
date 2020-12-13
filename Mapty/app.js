"use strict";
const elements = {
    form: document.querySelector('.form'),
    containerWorkouts: document.querySelector('.workouts'),
    inputType: document.querySelector('.form__input--type'),
    inputDistance: document.querySelector('.form__input--distance'),
    inputDuration: document.querySelector('.form__input--duration'),
    inputCadence: document.querySelector('.form__input--cadence'),
    inputElevation: document.querySelector('.form__input--elevation'),
};
let map, mapEvent;
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude];
        map = L.map('map').setView(coords, 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        L.marker(coords)
            .addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
        map.on('click', (e) => {
            mapEvent = e;
            elements.form.classList.remove('hidden');
            elements.inputDistance.focus();
        });
    }, _err => alert('Could not get your location : ('));
const displayMarker = (e) => {
    e.preventDefault();
    elements.inputDistance.value = elements.inputCadence.value = elements.inputDuration.value = elements.inputElevation.value =
        '';
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
    }))
        .setPopupContent('Workout')
        .openPopup();
};
const changeWorkoutType = () => {
    [elements.inputElevation, elements.inputCadence].forEach(input => input.closest('.form__row').classList.toggle('form__row--hidden'));
};
elements.form.addEventListener('submit', displayMarker);
elements.inputType.addEventListener('change', changeWorkoutType);
