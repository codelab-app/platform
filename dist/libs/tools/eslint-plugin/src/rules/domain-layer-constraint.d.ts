import { ESLintUtils } from '@typescript-eslint/utils';
export declare const createESLintRule: <Options extends readonly unknown[], MessageIds extends string>({ meta, name, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<Options, MessageIds, unknown>>) => ESLintUtils.RuleModule<MessageIds, Options, unknown, ESLintUtils.RuleListener>;
export declare const domainLayerConstraint: ESLintUtils.RuleModule<"endpointGraphqlConstraint" | "fragmentGraphqlConstraint" | "graphqlExtension" | "noCodegenImport", [], unknown, ESLintUtils.RuleListener>;
