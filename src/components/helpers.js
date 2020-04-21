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

export const DataFormatter = (dataArray, segment) => {
  const addDeltasArray = dataArray.map( ({node}, index, array) =>  {
    let delta = null

    if (index > 0) {
      delta = node[segment] - array[index - 1].node[segment]
    }

    return {
      ...node,
      rawDataPoint: parseInt(node[segment], 0),
      dailyDelta: delta
    }
  })

  return addDeltasArray.map( (node, index, array) => {
    let movingAverage = null

    if (index > 5) {
      movingAverage = (array.slice(index - 5, index).reduce((total, node) => total + parseInt(node.dailyDelta), 0)) / 5
    }

    return {
      ...node,
      movingAverage: movingAverage
    }
  })
}
