/**
 * @license MIT
 * @fileoverview Manage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee
 */

'use strict';

// Make sure the path to app.js is correct relative to this file!
import { updateWeather, error404 } from "./app.js"; 

const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"; // London

const currentLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      res => {
        const { latitude, longitude } = res.coords;
        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
      },
      err => {
        console.error("Geolocation failed, redirecting to default location.", err);
        window.location.hash = defaultLocation;
      }
    );
  } else {
    console.error("Geolocation not supported by this browser.");
    window.location.hash = defaultLocation;
  }
};

/**
 * @param {string} query - Searched query 
 */
const searchedLocation = (query = "") => {
  if (query) {
    updateWeather(...query.split("&"));
  } else {
    error404();
  }
};

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation]
]);

const checkHash = function () {
  const requestURL = window.location.hash.slice(1);
  const [route, query] = requestURL.includes("?") ? requestURL.split("?") : [requestURL, ""];

  if (routes.has(route)) {
    routes.get(route)(query);
  } else {
    error404();
  }
};

// When the URL hash changes, check and load the appropriate route
window.addEventListener("hashchange", checkHash);

// When the page loads initially
window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/current-location";
  } else {
    checkHash();
  }
});
