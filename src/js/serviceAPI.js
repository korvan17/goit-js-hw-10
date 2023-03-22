const BASE_URL = 'https://restcountries.com/v3.1/';

class countryAPI {
  constructor() {
    this.responce = '';
    this.data = {};
    this.amount = 0;
    this.dataArray = [];
  }
  fetchFromServer() {
    fetch(`${BASE_URL} name / ${responce}`)
      .then(r => r.json())
      .then(data => {
        if (data.length > 1) {
          this.dataArray = data.map(element => {
            ({
              flags: data.flags.svg,
              name: data.name.official,
            });
          });
        } else {
          this.data = {
            flags: data.flags.svg,
            name: data.name.official,
            capital: data.capital[0],
            population: data.population,
            languages: data.languages,
          };
        }
      });
  }
}
