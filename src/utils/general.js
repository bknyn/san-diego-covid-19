/**
 * Returns object with title, slug, and camelCase keys
 *
 * @param {string} title - The title of the segment to convert
 * @returns {Object} - The object of formatted strings with title, slug, and camelCase keys
 */
export const SegmentFormatter = (title) => {
  return {
    title: title,
    get slug() { return this.title.toLowerCase().replace(/\s+/g, '-') },
    get camelCase() { return this.title.toLowerCase().replace(/\s+([a-z])/g, (g) => g[1].toUpperCase()) }
  }
}
