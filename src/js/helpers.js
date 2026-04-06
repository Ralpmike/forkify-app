import { TIMOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url, errorMsg = 'Something went wrong') {
    try {
        const response = await Promise.race([timeout(TIMOUT_SEC), fetch(url)]);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${ data.message || errorMsg} (${response.status})`);
        }
        // if(data.results === 0 ){
        //   throw new Error(`No recipes found for your query. Please try again!`);
        // }

        return data;
    } catch (err) {
        throw err;
    }
}