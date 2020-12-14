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
// the leaflet library
declare const L: {
  map: Function;
  tileLayer: Function;
  marker: Function;
  popup: Function;
};

type Coords = [number, number];

// workout class
class Workout {
  id: string;
  date: Date;

  constructor(
    public coords: Coords,
    public distance: number,
    public duration: number
  ) {
    this.id = `${Date.now()}`.slice(-10);
    this.date = new Date();
  }
}

// running class
class Running extends Workout {
  pace: number;

  constructor(
    public coords: Coords,
    public distance: number,
    public duration: number,
    public cadence: number
  ) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.pace = 0;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

// cycling class
class Cycling extends Workout {
  speed: number;

  constructor(
    public coords: Coords,
    public distance: number,
    public duration: number,
    public elevationGain: number
  ) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.speed = 0;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/hour
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const cy = new Cycling([1, 2], 11, 11, 11);
const wk = new Running([1, 2], 11, 11, 11);

console.log(cy, wk);

/////////////////////////////// main app class
class App {
  private map: any;
  private mapEvent: any;

  constructor() {
    this.getPosition();

    // Events Listeners
    // Adding a new workout
    elements.form.addEventListener('submit', this.newWorkout.bind(this));

    // Changing the workout type
    elements.inputType.addEventListener('change', this.toggleElevationField);
  }

  private getPosition() {
    // Get users position
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.loadMap.bind(this), () =>
        alert('Could not get your location : (')
      );
  }

  private loadMap(position: any) {
    const { latitude, longitude } = position.coords;

    // Displaying the map on users coords
    this.map = L.map('map').setView([latitude, longitude], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Adding a click handler on the map
    this.map.on('click', this.showForm.bind(this));
  }

  private showForm(e: Event) {
    this.mapEvent = e;

    // Displaying the form
    elements.form.classList.remove('hidden');
    elements.inputDistance.focus();
  }

  private toggleElevationField() {
    [elements.inputElevation, elements.inputCadence].forEach(input =>
      (input.closest('.form__row') as HTMLDivElement).classList.toggle(
        'form__row--hidden'
      )
    );
  }

  private newWorkout(e: Event) {
    e.preventDefault();

    // Get data form the form

    // check if the data is valid

    // create new running or cycling object based on workout type

    // add the object to the workout array

    // render the workout on the map

    // render the workout on the list

    // hide the form and clear the input fields
    elements.inputDistance.value = elements.inputCadence.value = elements.inputDuration.value = elements.inputElevation.value =
      '';

    // Getting the latitude and longitude from the click
    const { lat, lng } = this.mapEvent.latlng;

    // Displaying the marker on the clicked spot
    L.marker([lat, lng])
      .addTo(this.map)
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

// App
const app = new App();

// Functions
