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
  pace!: number;
  type = 'running';
  description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
    months[this.date.getMonth()]
  } ${this.date.getDate()}`;

  constructor(
    public coords: Coords,
    public distance: number,
    public duration: number,
    public cadence: number
  ) {
    super(coords, distance, duration);
    this.cadence = cadence;
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
  speed!: number;
  type = 'cycling';
  description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
    months[this.date.getMonth()]
  } ${this.date.getDate()}`;

  constructor(
    public coords: Coords,
    public distance: number,
    public duration: number,
    public elevationGain: number
  ) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();
  }

  calcSpeed() {
    // km/hour
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

/////////////////////////////// main app class
class App {
  private map: any;
  private mapEvent: any;
  private workouts: Workout[] = [];

  constructor() {
    this.getPosition();

    // Events Listeners
    // Adding a new workout
    elements.form.addEventListener('submit', this.newWorkout.bind(this));

    // Changing the workout type
    elements.inputType.addEventListener('change', this.toggleElevationField);

    // Clicking on the workout li
    elements.containerWorkouts.addEventListener(
      'click',
      this.moveToPopup.bind(this)
    );
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

  private hideForm() {
    elements.inputDistance.value = elements.inputCadence.value = elements.inputDuration.value = elements.inputElevation.value =
      '';

    elements.form.style.display = 'none';
    elements.form.classList.add('hidden');
    setTimeout(() => (elements.form.style.display = 'grid'), 1000);
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

    // form validator
    const inputValidator = (...inputs: number[]) =>
      inputs.every(input => input && input > 0);

    // Getting the latitude and longitude from the click
    const { lat, lng } = this.mapEvent.latlng;

    // Get data form the form
    const type: 'running' | 'cycling' = elements.inputType.value as
      | 'running'
      | 'cycling';
    const distance = +elements.inputDistance.value;
    const duration = +elements.inputDuration.value;
    let workout: Running | Cycling;

    // create new running or cycling object based on workout type
    if (type === 'running') {
      const cadence = +elements.inputCadence.value;

      // check if the data is valid
      if (!inputValidator(distance, duration) || !cadence)
        return alert('Inputs have to be positive numbers!');

      // create the class
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevationGain = +elements.inputElevation.value;

      // check if the data is valid
      if (!inputValidator(distance, duration) || !elevationGain)
        return alert('Inputs have to be positive numbers!');

      // create the class
      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    // add the object to the workout array
    this.workouts.push(workout!);

    // render the workout on the map as a marker
    this.renderWorkoutMarker(workout!);

    // render the workout on the list
    this.renderWorkout(workout!);

    // hide the form and clear the input fields
    this.hideForm();
  }

  private renderWorkoutMarker(workout: Running | Cycling) {
    L.marker(workout.coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  private renderWorkout(workout: Running | Cycling) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    if (workout.type === 'running')
      html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${(workout as Running).pace.toFixed(
              1
            )}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${(workout as Running).cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
    `;
    else
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${(workout as Cycling).speed.toFixed(
              1
            )}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${
              (workout as Cycling).elevationGain
            }</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
    `;

    elements.form.insertAdjacentHTML('afterend', html);
  }

  private moveToPopup(e: Event) {
    const workoutEl = (e.target as HTMLElement).closest(
      '.workout'
    ) as HTMLElement;

    if (!workoutEl) return;

    const workoutCoords = this.workouts.find(
      workout => workout.id === workoutEl.dataset.id
    )?.coords;

    this.map.setView(workoutCoords, 12);
  }
}

// App
const app = new App();

// Functions
