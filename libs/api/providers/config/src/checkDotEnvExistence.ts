import findConfig from 'findup-sync'

export const checkDotEnvExistence = () => {
  const defaultDotevFile = '.env'
  const path = findConfig(defaultDotevFile)

  if (path) {
    throw new Error(
      `Environment check error: ".env"-file exist. Please remove .env to proceed`,
    )
  }
}
