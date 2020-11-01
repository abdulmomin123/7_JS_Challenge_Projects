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
    this.movements = [1000, 2000, -100, -200];
    this.interestRate = 1.2;
    this.currency = '$';
  }

  getCurrentBal() {
    return this.movements.reduce((acc, cur) => acc + cur);
  }

  getTotalIn() {
    return this.movements
      .filter(mov => mov > 0)
      .reduce((acc, cur) => acc + cur);
  }

  getTotalOut() {
    return this.movements
      .filter(mov => mov < 0)
      .reduce((acc, cur) => acc + cur);
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

const accounts = [
  new Account('ffff', 'Abdul Momin', 1111),
  new Account('gggg', 'Jonas S.', 2222),
];

accounts[1].movements.push(5000, 3400, -150, -790, -3210, -1000, 8500, -30);

let loggedInUser;

// Authentication
const renderEl = arr => {
  // Clear movements before inserting
  elements.containerMovements.innerHTML = '';

  arr.forEach(el =>
    elements.containerMovements.insertAdjacentHTML('afterbegin', el)
  );
};

const renderMov = acc => {
  const allMovements = acc.movements.map((mov, i) => {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    const markup = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
      <div class="movements__date">12/03/2020</div>
      <div class="movements__value">${mov}&nbsp;${acc.currency}</div>
    </div>
    `;

    return markup;
  });

  renderEl(allMovements);
};

const updateUI = () => {
  const date = new Date();

  elements.inputLoginUsername.value = elements.inputLoginPin.value = elements.inputTransferTo.value = elements.inputTransferAmount.value =
    '';
  elements.inputLoginPin.blur();
  elements.labelWelcome.textContent = `Good Evening, ${
    loggedInUser.owner.split(' ')[0]
  }!`;
  elements.labelDate.textContent = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
  elements.labelBalance.textContent = `${loggedInUser.getCurrentBal()} ${
    loggedInUser.currency
  }`;
  renderMov(loggedInUser);
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
  const sortedMov = loggedInUser.movements.sort((a, b) => (a < b ? 1 : -1));

  console.log(sortedMov);
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
