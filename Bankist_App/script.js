'use strict';

// Elements
const elements = {
  labelWelcome: document.querySelector('.welcome'),
  labelDate: document.querySelector('.date'),
  labelBalance: document.querySelector('.balance__value'),
  labelSumIn: document.querySelector('.summary__value--in'),
  labelSumOut: document.querySelector('.summary__value--out'),
  labelSumInterest: document.querySelector('.summary__value--interest'),
  labelTimer: document.querySelector('.timer'),

  containerApp: document.querySelector('.app'),
  containerMovements: document.querySelector('.movements'),

  btnLogin: document.querySelector('.login__btn'),
  btnTransfer: document.querySelector('.form__btn--transfer'),
  btnLoan: document.querySelector('.form__btn--loan'),
  btnClose: document.querySelector('.form__btn--close'),
  btnSort: document.querySelector('.btn--sort'),

  inputLoginUsername: document.querySelector('.login__input--user'),
  inputLoginPin: document.querySelector('.login__input--pin'),
  inputTransferTo: document.querySelector('.form__input--to'),
  inputTransferAmount: document.querySelector('.form__input--amount'),
  inputLoanAmount: document.querySelector('.form__input--loan-amount'),
  inputCloseUsername: document.querySelector('.form__input--user'),
  inputClosePin: document.querySelector('.form__input--pin'),
};

// Data
class Account {
  constructor(username, owner, pin) {
    this.username = username;
    this.owner = owner;
    this.pin = pin;

    // Static Properties
    this.interestRate = 1.2;
    this.currency = '$';
  }

  setMovements(movArr, movDatesArr) {
    this.movements = movArr;
    this.movementsDates = movDatesArr;
  }

  getCurrentBal() {
    return this.movements.reduce((acc, cur) => acc + cur);
  }

  getTotalIn() {
    return this.movements
      .filter(mov => mov > 0)
      .reduce((acc, cur) => acc + cur)
      .toFixed(2);
  }

  getTotalOut() {
    return this.movements
      .filter(mov => mov < 0)
      .reduce((acc, cur) => acc + cur)
      .toFixed(2);
  }

  getTotalInterest() {
    return ((this.getTotalIn() * this.interestRate) / 100).toFixed(2);
  }

  transferMoney(amount, transferTo) {
    const receiver = accounts.find(acc => acc.username === transferTo);

    if (
      receiver &&
      amount > 0 &&
      amount <= this.getCurrentBal() &&
      transferTo !== this.username
    ) {
      this.movements.push(-amount);
      receiver.movements.push(amount);
      updateUI();
    }
  }

  logout() {
    //
  }
}

const account1 = {
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [
  new Account('ffff', 'Abdul Momin', 1111),
  new Account('gggg', 'Jonas S.', 2222),
];

accounts[0].setMovements(
  [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ]
);
accounts[1].setMovements(
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ]
);

let loggedInUser;
let isSorted = false;

// Authentication
const renderEl = arr => {
  // Clear movements before inserting
  elements.containerMovements.innerHTML = '';

  arr.forEach(el =>
    elements.containerMovements.insertAdjacentHTML('afterbegin', el)
  );
};

const renderMov = (acc, sorted = false) => {
  const movArr = sorted
    ? [...acc.movements].sort((a, b) => (a > b ? 1 : -1))
    : acc.movements;

  const allMovements = movArr.map((mov, i) => {
    const movDate = new Date(loggedInUser.movementsDates[i]);

    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    const markup = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
      <div class="movements__date">${movDate.getDay()}/${
      movDate.getMonth() + 1
    }/${movDate.getFullYear()}</div>
      <div class="movements__value">${mov}&nbsp;${acc.currency}</div>
    </div>
    `;

    return markup;
  });

  renderEl(allMovements);
  isSorted = !isSorted;
};

const updateUI = () => {
  const date = new Date();

  elements.inputLoginUsername.value = elements.inputLoginPin.value = elements.inputTransferTo.value = elements.inputTransferAmount.value =
    '';
  elements.inputLoginPin.blur();
  elements.labelWelcome.textContent = `Good Evening, ${
    loggedInUser.owner.split(' ')[0]
  }!`;
  elements.labelDate.textContent =
    `${date.getDate()}`.padStart(2, 0) +
    `/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
  elements.labelBalance.textContent = `${loggedInUser.getCurrentBal()} ${
    loggedInUser.currency
  }`;
  renderMov(loggedInUser, false);
  elements.labelSumIn.textContent = `${loggedInUser.getTotalIn()} ${
    loggedInUser.currency
  }`;
  elements.labelSumOut.textContent = `${Math.abs(loggedInUser.getTotalOut())} ${
    loggedInUser.currency
  }`;
  elements.labelSumInterest.textContent = `${loggedInUser.getTotalInterest()} ${
    loggedInUser.currency
  }`;

  elements.containerApp.classList.add('logged-in');
};

const authUser = e => {
  e.preventDefault();

  loggedInUser = accounts.find(
    acc =>
      elements.inputLoginUsername.value === acc.username &&
      parseInt(elements.inputLoginPin.value) === acc.pin
  );

  if (loggedInUser) updateUI();
};

const transferMoney = e => {
  e.preventDefault();

  const [amount, transferTo] = [
    parseFloat(elements.inputTransferAmount.value),
    elements.inputTransferTo.value,
  ];
  loggedInUser.transferMoney(amount, transferTo);
};

const requestLoan = e => {
  e.preventDefault();

  const reqAmount = parseFloat(elements.inputLoanAmount.value);

  if (
    reqAmount > 0 &&
    loggedInUser.movements.some(mov => mov >= reqAmount * 0.1)
  )
    setTimeout(() => {
      loggedInUser.movements.push(reqAmount);
      updateUI();
    }, 2000);

  elements.inputLoanAmount.value = '';
};

const closeAccount = e => {
  e.preventDefault();

  const [confirmUser, confirmPin] = [
    elements.inputCloseUsername.value,
    parseInt(elements.inputClosePin.value),
  ];
  const toClose = accounts.findIndex(
    acc => loggedInUser.username === acc.username
  );

  if (
    confirmUser === loggedInUser.username &&
    confirmPin === loggedInUser.pin
  ) {
    accounts.splice(toClose, 1);
    elements.inputCloseUsername.value = elements.inputClosePin.value = '';
    elements.containerApp.classList.remove('logged-in');
  }
};

const sortMovements = () => {
  renderMov(loggedInUser, isSorted);
};

// Event Handlers
// Login
elements.btnLogin.addEventListener('click', authUser);

// Transfer money
elements.btnTransfer.addEventListener('click', transferMoney);

// Request Loan
elements.btnLoan.addEventListener('click', requestLoan);

// Close account
elements.btnClose.addEventListener('click', closeAccount);

// Sort Movements
elements.btnSort.addEventListener('click', sortMovements);
