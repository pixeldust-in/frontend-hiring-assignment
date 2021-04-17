import { config } from '../environment.js';
import axios from 'axios';

export const shiftService = {
    getShifts,
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