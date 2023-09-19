import fs from 'fs'
import path from 'path'

export const writeFileSyncWithDirs = (filePath: string, content: string) => {
  // Extract the directory name from the file path
  const directoryPath = path.dirname(filePath)

  // Ensure the directory exists (and create it and any necessary parent directories if it doesn't)
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true })
  }

  // Write the file
  fs.writeFileSync(filePath, content)
}
