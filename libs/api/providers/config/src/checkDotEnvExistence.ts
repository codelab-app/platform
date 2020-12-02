import findConfig from 'findup-sync'

const DEFAULT_DOTENV_FILE = '.env'

export const checkDotEnvExistence = () => {
  const path = findConfig(DEFAULT_DOTENV_FILE)

  if (path) {
    throw new Error(
      `Environment check error: ".env"-file exist. Please remove .env to proceed`,
    )
  }
}
