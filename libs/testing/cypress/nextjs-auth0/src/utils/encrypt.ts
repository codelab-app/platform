import hkdf from 'futoin-hkdf'
import type { KeyLike } from 'jose'
import { CompactEncrypt, generateSecret, importJWK } from 'jose'

const BYTE_LENGTH = 32
const ENCRYPTION_INFO = 'JWE CEK'
const options = { hash: 'SHA-256' }

const deriveKey = (secret: string) =>
  hkdf(secret, BYTE_LENGTH, { info: ENCRYPTION_INFO, ...options })

interface EncryptData {
  [key: string]: unknown
  secret: string
}

export const encrypt = async (arg: EncryptData): Promise<string> => {
  const { secret, ...thingToEncrypt } = arg
  const derivedKeyBuffer = deriveKey(secret)

  const key = await importJWK({
    k: derivedKeyBuffer.toString('base64'),
    kty: 'oct',
  })

  const epochNow = (Date.now() / 1000) | 0

  const jwe = await new CompactEncrypt(
    Buffer.from(JSON.stringify(thingToEncrypt)),
  )
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
      exp: epochNow + 7 * 24 * 60 * 60,
      iat: epochNow,
      uat: epochNow,
    })
    .encrypt(key)

  return jwe
}
