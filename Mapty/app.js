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
class Workout {
    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
        this.id = `${Date.now()}`.slice(-10);
        this.date = new Date();
    }
}
class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
        this.cadence = cadence;
        this.cadence = cadence;
        this.calcPace();
    }
    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
        this.elevationGain = elevationGain;
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}
class App {
    constructor() {
        this.getPosition();
        elements.form.addEventListener('submit', this.newWorkout.bind(this));
        elements.inputType.addEventListener('change', this.toggleElevationField);
    }
    getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this.loadMap.bind(this), () => alert('Could not get your location : ('));
    }
    loadMap(position) {
        const { latitude, longitude } = position.coords;
        this.map = L.map('map').setView([latitude, longitude], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        this.map.on('click', this.showForm.bind(this));
    }
    showForm(e) {
        this.mapEvent = e;
        elements.form.classList.remove('hidden');
        elements.inputDistance.focus();
    }
    toggleElevationField() {
        [elements.inputElevation, elements.inputCadence].forEach(input => input.closest('.form__row').classList.toggle('form__row--hidden'));
    }
    newWorkout(e) {
        e.preventDefault();
        const inputValidator = (...inputs) => inputs.every(input => input && input > 0);
        const { lat, lng } = this.mapEvent.latlng;
        const type = elements.inputType.value;
        const distance = +elements.inputDistance.value;
        const duration = +elements.inputDuration.value;
        if (type === 'running') {
            const cadence = +elements.inputCadence.value;
            if (!inputValidator(distance, duration) || !cadence)
                return alert('Inputs have to be positive numbers!');
            const workout = new Running([lat, lng], distance, duration, cadence);
            this.workouts.push(workout);
        }
        if (type === 'cycling') {
            const elevationGain = +elements.inputElevation.value;
            if (!inputValidator(distance, duration) || !elevationGain)
                return alert('Inputs have to be positive numbers!');
            const workout = new Cycling([lat, lng], distance, duration, elevationGain);
            this.workouts.push(workout);
        }
        L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        }))
            .setPopupContent('Workout')
            .openPopup();
        elements.inputDistance.value = elements.inputCadence.value = elements.inputDuration.value = elements.inputElevation.value =
            '';
    }
}
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
const app = new App();
