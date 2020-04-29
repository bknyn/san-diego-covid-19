/**
 * Returns number string formatted with commas
 *
 * @param {string} number - String of number to add commas to
 */
export const AddCommasToNumberString = number => number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * Returns number string with +/- prefixed
 *
 * @param {string} number - String of number to prefix
 */
export const AddPrefixOperator = number => number >= 0 ? `+${number}` : `${number}`
