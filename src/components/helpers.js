export const CalculateMovingAverage = (array, index, days) => {
  const slicedArray = array.slice(index - (days - 1), index + 1)
  const maValue = slicedArray.reduce((total, node) => total + node.dailyDelta, 0) / days
  return maValue.toFixed(2)
}

export const PercentDiff = (initial, current, precision = 2) => {
  return (((current-initial)/initial)*100).toFixed(precision);
}

export const StringFormatter = (title, format = 'slug') => {
  switch(format) {
    case 'slug':
      // lower case and replace spaces with hyphens
      return title.toLowerCase().replace(/\s+/g, '-')
    case 'camelCase':
      // lower case, find spaces and convert follow character to upper case
      return title.toLowerCase().replace(/\s+([a-z])/g, (g) => g[1].toUpperCase())
    default:
      return title
  }
}
