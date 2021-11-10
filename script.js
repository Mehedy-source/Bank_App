'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');




const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements) {
  //delete previous movements before we query next ones
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) { //mov is movement 
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `

<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1}
          ${type}</div>
          
          <div class="movements__value">${mov}</div>
        </div> `;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  }) //end od foreach 
}

displayMovements(account1.movements);

const user = 'Steven Thomas Williams'; //i need stw abbreviation 
const createUserNames = function (arr_with_accounts) {

  arr_with_accounts.forEach(function (one_account) {

    one_account.username = one_account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join(''); //join letters without any seperator

    // console.log(username)
    // return username;
  })
};
createUserNames(accounts)
console.log(accounts);

const calcDisplayBalance = function (movements){
  const balance2 = movements.reduce ((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance2} BDT`

}



const calcDisplaySummary = function (acc){
  const incomes = acc.movements 
  .filter(mov => mov > 0)
  .reduce((acc,mov) =>acc + mov, 0);
  labelSumIn.textContent = `${incomes} BDT`;

  const outcomes = acc.movements 
  .filter(mov => mov < 0)
  .reduce((acc,mov) =>acc + mov, 0);
  labelSumOut.textContent = `${outcomes} BDT`;//Math.abs(outcomes)

  //1.2% of deposit
  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit * acc.interestRate) / 100)
  .reduce((acc, inter) => acc + inter, 0);
  labelSumInterest.textContent = `${parseFloat(interest).toFixed(2)} BDT`
}

calcDisplaySummary(account3.movements);

let currentAccount;
btnLogin.addEventListener('click', function(e){
  //prevent form from permitting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username ===
    inputLoginUsername.value);
    console.log(currentAccount)

    if(currentAccount?.pin == Number(inputLoginPin.value)){
      console.log('LOGIN OK');
      
      //display UI and welcome message
      labelWelcome.textContent = `Welcome back,
      ${currentAccount.owner.split(' ')[0]}`
      containerApp.style.opacity = 100

      //display movements
      calcDisplayMovements(currentAccount.movements);
      
      //display summary
      calcDisplaySummary(currentAccount);

      //display balance
      calcDisplayBalance(curentAccount.movements);
    
      //clear input fields
      inputLoginUsername.value = ''
      inputLoginPin.vlaue = ''
    }
})

btnTransfer.addEventListener('click', function(e){
e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
  acc => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAcc)
  if(amount > 0 &&
    currentAccount.balance >= amount
  ){
    
  }

});


//const deposits = movements.filter(function (mov)){
//return mov >0;
//});
const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(movements);
console.log(deposits);

//REDUCE 
//acc - accumulator - snowball 
//cur - current  , i - index
//const balance = movements.reduce(function (acc, cur, i, arr){
//console.log(`Iteration ${i}: ${acc}`)
//return acc+ cur;
//}, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);