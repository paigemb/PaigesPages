/*Query Logic for Google Books API */
import axios from "axios";

/***********************************************************************************************************/
/* Web Storage API local storage */
// stores data after browser closes
// store access and refresh token from query params in local storage
// when API request is made, check if token is valid/not expired
// if yes, use. if not use refresh token and store in local storage w/updated timestamp
// note: local storage stores everything as strings --> must also check for undefined
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

// Map for local storage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time", //3600 seconds
  timestamp: "spotify_token_timestamp", //timestamp of when the access token currently in use was fetched
};

// Map to retrieve local storage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};
/***********************************************************************************************************/

/***********************************************************************************************************/
/* Access Token logic */

/**
 * Clear out all local storage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // loop through local storage and remove all
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // reload to home page w/login button
  window.location = window.location.origin;
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in local storage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES; //destructuring for simplicity
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in Node, then update values in localStorage with data from response.
 * async b/c of the API call to /refresh_token endpoint
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or if in a reload infinite loop (?)
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error("No refresh token available");
      logout();
    }

    // Use `/refresh_token` endpoint from Node
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );

    // Update local storage values
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Reload the page for local storage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Handles logic for retrieving the Spotify access token from local storage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //store tokens in local storage
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };
  // If there's an error OR the token in localStorage has expired, refresh the token
  const hasError = urlParams.get("error");
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }
  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }
  // If there is no token in local storage but there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }
  // hopefully not
  return false;
};

export const accessToken = getAccessToken();