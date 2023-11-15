import { ESLintUtils } from '@typescript-eslint/utils';
export declare const createESLintRule: <TOptions extends readonly unknown[], TMessageIds extends string, TRuleListener extends import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener = import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>({ name, meta, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<TOptions, TMessageIds, TRuleListener>>) => import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<TMessageIds, TOptions, TRuleListener>;
export declare const antDesignIconImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"iconImportPath", never[], {
    ImportDeclaration: (node: import("@typescript-eslint/types/dist/generated/ast-spec").ImportDeclaration) => void;
}>;
