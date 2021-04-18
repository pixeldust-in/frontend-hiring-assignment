import { config } from '../environment.js';
import axios from 'axios';

export const shiftService = {
  getShifts,
  bookShifts,
  cancelShift
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
    axios
      .post(url, shift)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error.response.data.message.toString());
      });
  });
}
async function cancelShift(shift) {
  let url = config.urls.CANCEL_SHIFT.replace('**', shift.id);
  return new Promise((resolve, reject) => {
    axios
      .post(url, shift)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error.response.data.message.toString());
      });
  });
}
