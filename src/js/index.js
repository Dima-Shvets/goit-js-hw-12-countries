// import './sass/main.scss';
import { error } from '@pnotify/core'
import { defaults } from '@pnotify/core'
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

import refs from './refs'
import fetchCountries from './fetchCountries.js'

import countriesListTpl from '../templates/list.hbs'
import countryCardTpl from '../templates/card.hbs'

import debounce from 'lodash.debounce'

defaults.delay = 3000;

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
    const inputValue = e.target.value;
    fetchCountries(inputValue).then(countries => {
               
            if (countries.length === 1) {
                const markup = countryCardTpl(...countries);
                refs.content.innerHTML = markup;
                return
            };
            
            if (countries.length > 2 && countries.length < 10) {
                const markup = countriesListTpl(countries);
                refs.content.innerHTML = markup;
                return
            };

            showNotification();
    })
}

function showNotification () {
    error({
        text: "Too many matches found. Please enter a more specific query!",
    })
    refs.content.innerHTML = "";
}


