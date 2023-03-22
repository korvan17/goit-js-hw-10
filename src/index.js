import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
// import
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  console.log(e.target.value);
}

fetch(
  'https://restcountries.com/v3.1/name/deu?fields=name,capital,population,flags,languages'
)
  .then(r => r.json())
  .then(data => {
    console.log(data);
    Notify.success(`data.length - ${data.length}`);
  });
