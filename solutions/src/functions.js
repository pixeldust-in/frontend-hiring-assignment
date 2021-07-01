export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    const date = new Date(x[key]).toLocaleDateString("EN-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    (rv[date] = rv[date] || []).push(x);
    return rv;
  }, {});
};

export const groupByObject = function (objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = new Date(obj[property]).toLocaleDateString("EN-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
};

export const sortByDate = function (obj) {
  return Object.entries(obj).sort((a, b) => {
    if (new Date(a[0]) > new Date(b[0])) return 1;
    else return -1;
  });
};

export const sortByTime = function (arr) {
  return arr.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1;
    } else if (a.startTime > b.startTime) {
      return 1;
    } else if (a.endTime < b.endTime) {
      return 1;
    } else if (a.endTime < b.endTime) {
      return -1;
    }
    return 0;
  });
};

export const getHours = (arr) => {
  var hour = 0,
    min = 0;
  arr.forEach((element) => {
    hour +=
      new Date(element.endTime).getHours() -
      new Date(element.startTime).getHours();
    min +=
      new Date(element.endTime).getMinutes() -
      new Date(element.startTime).getMinutes();
  });

  if (min >= 60) {
    hour += Number(min / 60);
    min -= Number(min / 60) * 60;
  }

  return [hour, min];
};

export const checkOverLapped = (data, start, end) => {
  var overlap = false;

  // eslint-disable-next-line
  Object.keys(data).map((ar) => {
    data[ar].forEach((element) => {
      if (
        element.booked &&
        ((new Date(start) >= new Date(element.startTime) &&
          new Date(start) < new Date(element.endTime)) ||
          (new Date(end) > new Date(element.startTime) &&
            new Date(end) <= new Date(element.endTime)))
      ) {
        overlap = true;
        return true;
      }
    });
  });

  return overlap;
};
