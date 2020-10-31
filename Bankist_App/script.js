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
  constructor(owner, pin) {
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
    return;
  }

  transferMoney(amount) {
    //
  }

  requestLoan(amount) {
    //
  }

  closeAccount() {
    //
  }

  logout() {
    //
  }
}

const accounts = [new Account('ffff', 1111)];

// Authentication
const authUser = e => {
  e.preventDefault();

  const userName = elements.inputLoginUsername.value;
  const pin = parseInt(elements.inputLoginPin.value);

  accounts.forEach(acc => {
    if (userName === acc.owner && pin === acc.pin) {
      elements.containerApp.classList.toggle('logged-in');
    }
  });

  console.log(userName, pin);
};

// Event Handlers
elements.btnLogin.addEventListener('click', authUser);

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// const accounts = [account1, account2, account3, account4];

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
