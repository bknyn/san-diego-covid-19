export const PercentDiff = (initial, current, precision = 2) => {
  return (((current-initial)/initial)*100).toFixed(precision);
}
