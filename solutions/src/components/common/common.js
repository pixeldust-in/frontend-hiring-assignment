export const common = {
  sortBookedList,
  formatDateTime,
};

function sortBookedList(list) {
  let booked = [];
  list.sort((a, b) => (a.endTime > b.endTime && 1) || -1);
  list.forEach((element, index) => {
    if (element.booked) {
      booked.push(list[index]);
    }
  });
  return booked;
}

function formatDateTime(date) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('EN-us', options);
}
