function convertDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration % 60;

  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  } else {
    return `${minutesStr}:${secondsStr}`;
  }
}
function timeStringToDuration(timeString: string): number {
  const [hours, minutes] = timeString.split(':');
  const durationInMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return durationInMinutes;
}


export { convertDuration , timeStringToDuration };
