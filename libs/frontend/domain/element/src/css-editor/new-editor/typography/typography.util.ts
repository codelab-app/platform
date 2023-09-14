interface Font {
  family: string
  weights: Array<string>
}

/**
 * Extracts the font data from the google fonts link in the body of the document
 * The link is added when the GoogleFonts component is added to the _app page.
 */
const getGoogleFontsLink = () => {
  const linkElement = document.querySelector(
    "body link[href^='https://fonts.googleapis.com/css2']",
  )

  if (linkElement) {
    return linkElement.getAttribute('href')
  }

  return null
}

/**
 * Extracts the info about fonts included in the google fonts link
 */
export const extractFontDataFromUrl = (): Array<Font> => {
  const url = getGoogleFontsLink()

  if (!url) {
    return []
  }

  // get only the part of the url that contains the font family and weights info
  const match = url.match(/(?<=\?family=).*(?=&display=swap)/)

  if (!match) {
    return []
  }

  const familyStrings = match[0].split('&family=')

  return familyStrings.reduce((acc, familyString) => {
    const [family, weightsString] = familyString.split(':wght@')

    if (!family) {
      return acc
    }

    // Default to 400 if no weights are specified
    const weightsArray = weightsString
      ? weightsString.split(/[;&]/).filter((weight) => weight !== '')
      : ['400']

    acc.push({
      family: family.replace(/\+/g, ' '),
      weights: weightsArray,
    })

    return acc
  }, new Array<Font>())
}
