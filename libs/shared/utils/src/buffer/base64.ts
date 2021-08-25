import CryptoJS from 'crypto-js'

export const stringToBase64 = (text: string) => {
  return Buffer.from(text).toString('base64')
}

export const base64ToUtf8 = (base64: string) => {
  const words = CryptoJS.enc.Base64.parse(base64)

  return CryptoJS.enc.Utf8.stringify(words)
}
