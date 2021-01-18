// import "./styles.css";
const select = document.querySelector(".country");

const SELECT_COUNTRY = "country";

const handleOnChange = () => localStorage.setItem(SELECT_COUNTRY, select.value);

function loadCountry() {
  const country = localStorage.getItem(SELECT_COUNTRY);
  const countryList = select.options;
  if (country !== null) {
    for (let arr of countryList) {
      if (arr.value.indexOf(country) > -1) {
        select.value = country;
        break;
      }
    }
  }
  select.addEventListener("change", handleOnChange);
}

(() => {
  loadCountry();
})();
