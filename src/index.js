import './css/styles.css';
import APIservices from './js/serviceAPI';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
// import manyMarkup from './templates/manyCountry.hbs';
// import oneMarkup from './templates/oneCcountry.hbs';

// console.log(manyMarkup({ flags: 'first', name: 'name' }));

const num = new Intl.NumberFormat('uk-UK');

const apiCountry = new APIservices();
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  text: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  //   refs.text.innerHTML = '';
  apiCountry.responce = e.target.value.trim();
  if (apiCountry.responce) {
    apiCountry.fetchFromServer().then(markUp);
  } else {
    refs.text.innerHTML = '';
  }
}

function markUp(data) {
  if (data.length > 10) {
    refs.text.innerHTML = '';
    Notify.success(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length === 1) {
    refs.text.innerHTML = '';
    refs.text.insertAdjacentHTML('beforeend', oneCountryMarkup(data[0]));
  } else {
    refs.text.innerHTML = '';
    refs.text.insertAdjacentHTML('beforeend', manyCountryMarkup(data));
  }
}

function oneCountryMarkup({ flags, name, capital, languages, population }) {
  // const data = {
  //   flags,
  //   name,
  //   population,
  //   capital,
  // };
  // data.languages = Object.values(languages).join(', ');
  // return data;
  const markUp = `<div class="item bigName" >
     <img class="icon-flag bigFlag" src="${flags.svg}" alt="flag">
     <p class="country-name">${name.official}</p>
    </div> 
    <p class="country-name"><span class="nameItem">Capital: </span>${capital}</p>
    <p class="country-name"><span class="nameItem">Population: </span>${num.format(
      population
    )}</p>
    <p class="country-name"><span class="nameItem">Languages: </span>${Object.values(
      languages
    ).join(', ')}</p>
`;
  return markUp;
}

function manyCountryMarkup(data) {
  const markUp = data.map(({ flags, name }) => {
    return `<li class="item">
    <img class="icon-flag" src="${flags.svg}" alt="flag">
    <p class="country-name">${name.official}</p>
</li>`;
  });
  return markUp.join('');
}
