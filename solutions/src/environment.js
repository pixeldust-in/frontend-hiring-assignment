const BASE_URL = 'http://127.0.0.1:8080/';

const constants = {
  urls: {
    BASE_URL,
    GET_SHIFTS: BASE_URL + 'shifts',
    BOOK_SHIFT: BASE_URL + 'shifts/**/book',
  },
  constants: {
    XYZ: 'EXAMPLE',
  },
};
export const config = constants;
