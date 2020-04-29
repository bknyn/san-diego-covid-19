/**
 * Calculates the moving average for a given time period
 *
 * @param {Object[]} array - The full array of objects containing the data
 * @param {number} array[].dailyDelta - The daily change for the day's data
 * @param {number} index - An index value used to slice the array
 * @param {number} days - Time period in days that should be used
 * @return {number} The calculated moving average to 2 decimal points of precision
 */
export const CalculateMovingAverage = (array, index, days) => {
  const slicedArray = array.slice(index - (days - 1), index + 1)
  const maValue = slicedArray.reduce((total, node) => total + node.dailyDelta, 0) / days
  return maValue.toFixed(2)
}

/**
 * Caclulate the percent difference between two numbers
 *
 * @param {number} initial - The starting value
 * @param {number} current - The current value
 * @param {number=} precision - How many decimal points in the returned value
 * @return {number} The calculated percent difference
 */
export const PercentDiff = (initial, current, precision = 2) => {
  return (((current - initial) / initial) * 100).toFixed(precision);
}
