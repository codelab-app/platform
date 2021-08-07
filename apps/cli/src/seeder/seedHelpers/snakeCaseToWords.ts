export const snakeCaseToWords = (input: string) =>
  input
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
