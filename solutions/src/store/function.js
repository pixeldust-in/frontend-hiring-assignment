export const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export const sortBookedList = (list) => {
  let booked = [];
  list.sort((a, b) => (a.endTime > b.endTime && 1) || -1);
  list.forEach((element, index) => {
    if (element.booked) {
      booked.push(list[index]);
    }
  });
  return booked;
};
