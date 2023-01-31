// my-constructor-parser.ts
import type {
  BaseType,
  Context,
  ReferenceType,
  SubNodeParser,
} from 'ts-json-schema-generator'
// use typescript exported by TJS to avoid version conflict
import { StringType, ts } from 'ts-json-schema-generator'

export class CustomTjsgParser implements SubNodeParser {
  supportsNode(node: ts.Node): boolean {
    console.log(node)

    return node.kind === ts.SyntaxKind.ConstructorType
  }

  createType(
    node: ts.Node,
    context: Context,
    reference?: ReferenceType,
  ): BaseType {
    console.log(node, context, reference)

    // Treat constructors as strings in this example
    return new StringType()
  }
}
