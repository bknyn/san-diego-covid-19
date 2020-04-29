export const StringFormatter = (title, format = 'slug') => {
  switch (format) {
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
