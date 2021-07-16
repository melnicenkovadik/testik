
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (timestamp, showDate = false, showTime = false) => {
  const date = new Date(timestamp);
  const dayName = days[date.getDay()];
  const day = (`0${date.getDate()}`).slice(-2);
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = (`0${date.getHours()}`).slice(-2);
  const minutes = (`0${date.getMinutes()}`).slice(-2);
  const seconds = (`0${date.getSeconds()}`).slice(-2);

  if (showTime) {
    return `${showDate ? `${dayName}, ${day} ${months[month]} ${year} ` : ''}${hours}:${minutes}:${seconds}`;
  }
  return `${showDate ? `${day} ${months[month]} ${year} ` : ''}`;
};

export default formatDate;
