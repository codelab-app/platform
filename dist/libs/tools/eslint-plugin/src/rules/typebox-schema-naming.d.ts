import { ESLintUtils } from '@typescript-eslint/utils';
export declare const createESLintRule: <Options extends readonly unknown[], MessageIds extends string>({ name, meta, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<Options, MessageIds>>) => ESLintUtils.RuleModule<MessageIds, Options, ESLintUtils.RuleListener>;
export declare const typeboxSchemaNaming: ESLintUtils.RuleModule<"suffixWithSchema", [], ESLintUtils.RuleListener>;
