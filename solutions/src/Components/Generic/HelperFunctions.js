const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const getTime = (unixTimestamp) => {
  let date = new Date(parseInt(unixTimestamp));
  return unixTimestamp
    ? `${date.getHours()}:${
        (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
      }`
    : null;
};

const getDate = (unixTimestamp) => {
  let today = new Date().getDate();
  let dateObj = new Date(parseInt(unixTimestamp)),
    date = dateObj.getDate(),
    month = months[dateObj.getMonth()];
  if (date === today) return "Today";
  else if (date === today + 1) return "Tomorrow";
  else return `${month} ${date}`;
};

const groupByTime = (shiftData, startTime, endTime) => {
  return shiftData.reduce((data, obj) => {
    if (new Date().getTime() < obj[endTime])
      (data[getDate(obj[startTime])] =
        data[getDate(obj[startTime])] || []).push(obj);
    return data;
  }, {});
};

const sortArray = (array) => {
  return (
    array &&
    array.sort((a, b) => {
      return a.startTime - b.startTime;
    })
  );
};

const isButtonDisabled = (unixTimestamp) => {
  return unixTimestamp < new Date().getTime();
};

export { getTime, getDate, groupByTime, sortArray, isButtonDisabled };
