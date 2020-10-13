import findConfig from 'findup-sync'

export const envConfig = findConfig('.env') ?? ''
