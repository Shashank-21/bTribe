export default function timeDisplay(timeString) {
  const [hourString, minuteString] = timeString.split(":");
  const hours = parseInt(hourString);
  let ampm = "";
  let hoursReturn = 0;
  if (hours === 0) {
    hoursReturn = 12;
    ampm = "AM";
  } else if (hours === 12) {
    hoursReturn = 12;
    ampm = "PM";
  } else if (hours < 12) {
    hoursReturn = hours;
    ampm = "AM";
  } else {
    hoursReturn = hours % 12;
    ampm = "PM";
  }
  return `${hoursReturn}:${minuteString} ${ampm}`;
}
