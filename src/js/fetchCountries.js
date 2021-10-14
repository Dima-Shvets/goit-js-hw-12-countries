const BASE_URL = 'https://restcountries.com/v2';

export default function (searchQuery) {
    console.log(searchQuery)
    return fetch(`${BASE_URL}/name/${searchQuery}`).then(responce => responce.json())
}

