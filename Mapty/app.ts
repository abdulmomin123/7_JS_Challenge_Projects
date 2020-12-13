// Dom elements
const elements = {
  form: document.querySelector('.form') as HTMLFormElement,
  containerWorkouts: document.querySelector('.workouts') as HTMLUListElement,
  inputType: document.querySelector('.form__input--type') as HTMLSelectElement,
  inputDistance: document.querySelector(
    '.form__input--distance'
  ) as HTMLInputElement,
  inputDuration: document.querySelector(
    '.form__input--duration'
  ) as HTMLInputElement,
  inputCadence: document.querySelector(
    '.form__input--cadence'
  ) as HTMLInputElement,
  inputElevation: document.querySelector(
    '.form__input--elevation'
  ) as HTMLInputElement,
};

// Global variables
declare const L: any;

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

// Functions
// Get users position and display the map
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      // Adding a click handler on the map
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    _err => alert('Could not get your location : (')
  );

// Events Listeners
