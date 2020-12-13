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

// Global variables and classes
let map: any, mapEvent: any;

class App {
  constructor() {
    //
  }

  private getPosition() {
    //
  }

  private loadMap() {
    //
  }

  private showForm() {
    //
  }

  private toggleElevationField() {
    //
  }

  private newWorkout() {
    //
  }
}
declare const L: {
  map: Function;
  tileLayer: Function;
  marker: Function;
  popup: Function;
};

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

      // Displaying the map on users coords
      map = L.map('map').setView(coords, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Adding a click handler on the map
      map.on('click', (e: any) => {
        mapEvent = e;

        // Displaying the form
        elements.form.classList.remove('hidden');
        elements.inputDistance.focus();
      });
    },
    _err => alert('Could not get your location : (')
  );

// Displays the marker
const displayMarker = (e: Event) => {
  e.preventDefault();

  // Clearing the input fields
  elements.inputDistance.value = elements.inputCadence.value = elements.inputDuration.value = elements.inputElevation.value =
    '';

  // Getting the latitude and longitude from the click
  const { lat, lng } = mapEvent.latlng;

  // Displaying the marker on the clicked spot
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
};

// Changes the workout type
const changeWorkoutType = () => {
  [elements.inputElevation, elements.inputCadence].forEach(input =>
    (input.closest('.form__row') as HTMLDivElement).classList.toggle(
      'form__row--hidden'
    )
  );
};

// Events Listeners
// Adding a new workout
elements.form.addEventListener('submit', displayMarker);

// Changing the workout type
elements.inputType.addEventListener('change', changeWorkoutType);
