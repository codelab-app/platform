import { generateSchemas, writeSchemasToFile } from './processors'

interface GenerateSchemaProps {
  // Function to be generated
  target: Function
  // Output file location
  filePath: string
}

export const generateSchema = (props: GenerateSchemaProps) => {
  writeSchemasToFile(generateSchemas(props.target), props.filePath)
}

// generateSchema({
//   target: GridWithTabs,
//   filePath: path.join(__dirname),
// })
