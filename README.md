# Translator App with TS/React/Sass
<span style="font-size:1.25em;">**This app uses RapidAPi for translation.**

    In order to run it locally, you need to go to https://rapidapi.com/hub, create a new account. Subscribe to https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text Api.

    Change endpoint to translate and get the following keys;
    1- X-RapidAPI-Key
    2- X-RapidAPI-Host

    Create a .env file and add the following variables in order;

    1- VITE_X_RAPID_API_KEY -> X-RapidAPI-Key
    2- VITE_X_RAPID_API_HOST -> X-RapidAPI-Host
    3- VITE_TRANSLATOR_API_URL -> The URL you get from Rapid api to make requests.

## To run
    npm install
    npm run dev

