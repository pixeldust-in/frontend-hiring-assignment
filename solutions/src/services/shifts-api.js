import { config } from '../environment.js';
import axios from 'axios';

export const shiftService = {
  getShifts,
  bookShifts,
};

async function getShifts() {
  return new Promise((resolve, reject) => {
    axios
      .get(config.urls.GET_SHIFTS)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

async function bookShifts(shift) {
  let url = config.urls.BOOK_SHIFT.replace('**', shift.id);
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'Access-Control-Allow-Origin': '*' },
      date: shift,
      url,
    };
    axios(options)
      .post()
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
