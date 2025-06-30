import { ESLintUtils } from '@typescript-eslint/utils';
export declare const createESLintRule: <Options extends readonly unknown[], MessageIds extends string>({ name, meta, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<Options, MessageIds>>) => ESLintUtils.RuleModule<MessageIds, Options>;
export declare const domainLayerConstraint: ESLintUtils.RuleModule<"endpointGraphqlConstraint" | "fragmentGraphqlConstraint" | "graphqlExtension" | "noCodegenImport", [], ESLintUtils.RuleListener>;
