import type { SourceWithOperations } from '@graphql-codegen/gql-tag-operations';
import type { Source } from '@graphql-tools/utils';
import type { FragmentDefinitionNode, OperationDefinitionNode } from 'graphql';
export type BuildNameFunction = (type: FragmentDefinitionNode | OperationDefinitionNode) => string;
export declare const processSources: (sources: Array<Source>, buildName: BuildNameFunction) => SourceWithOperations[];
