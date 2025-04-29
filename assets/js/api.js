/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */


'use strict';

const api_key = '0d86af7c7c97dc309c424679ef035b40';

/**
 * @param {string} URL Api URL
 * @param {function} callback Callback function
 */
export const fetchData = function(URL, callback) {
    fetch(`${URL}&appid=${api_key}`)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data:', error));
}

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;
    },
    airpollution(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
    },
    reverseGeo(lat, lon) {
        return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${api_key}`;
    },

    /**
     * @param {string} query search e.g.: "London", "Newwork" 
     */

    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`;
    }

}
