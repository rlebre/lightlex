export const formatDuration = (minutes: number) => {
  if (minutes != null || minutes !== 0) {
    const hours = Math.floor(minutes / 60);
    const minutesutes = minutes % 60;
    return hours !== 0 ? hours + ' hr' + ' ' + minutesutes + ' minutes' : minutesutes + ' minutes';
  } else {
    return 'null';
  }
};
