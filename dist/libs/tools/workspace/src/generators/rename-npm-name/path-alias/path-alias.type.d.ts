export type PathAlias = string;
export type PathAliasMap = Record<PathAlias, {
    expected: string;
    path: string;
    name: string | null;
}>;
