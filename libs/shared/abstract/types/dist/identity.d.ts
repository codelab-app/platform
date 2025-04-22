/**
 * Identity type that forces TypeScript to compute object types, but only works for hovering the newly assigned type. If we hover source type it becomes more complicated.
 *
 * So it is recommended to assign to a new type for complex types
 *
 * ---
 *
 * The `& {}` pattern forces TypeScript to eagerly compute and display the expanded type:
 *
 * - Makes TypeScript show the full expanded object structure rather than type expressions
 * - Shows all properties in tooltips and error messages
 * - Preserves literal types in some contexts
 * - Improves IDE hover information by "flattening" the display
 */
export type Identity<T> = {
    [K in keyof T]: T[K];
} & {};
