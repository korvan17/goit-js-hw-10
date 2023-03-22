import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
// import
const DEBOUNCE_DELAY = 300;

fetch(
  'https://restcountries.com/v3.1/name/sw?fields=name,capital,population,flags,languages'
)
  .then(r => r.json())
  .then(data => {
    console.log(data);
    Notify.success(`data.length - ${data.length}`);
  });
