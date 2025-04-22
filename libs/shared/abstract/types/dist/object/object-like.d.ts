/**
 * https://github.com/microsoft/TypeScript/issues/50087#issuecomment-1199411533
 *
 * https://github.com/microsoft/TypeScript/wiki/Breaking-Changes/83af27fca396d172b4d895d480b10c3bacf89112#-k-string-unknown--is-no-longer-a-wildcard-assignment-target
 */
export type ObjectLike = Record<string, any>;
export type UnknownObjectLike = Record<string, unknown>;
