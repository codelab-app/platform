import { IValidationService } from '@codelab/shared-abstract-infra';
import { Static, TKind, TSchema } from '@sinclair/typebox';
import { TypeBoxProvider } from '../provider/typebox.provider';
/**
 * Create a facade around `NestedValidator`
 */
export declare class ValidationService implements IValidationService {
    private typeBox;
    static getInstance(typeBox: TypeBoxProvider): ValidationService;
    private constructor();
    /**
     * Asserts that data matches the schema for the given kind.
     *
     * Supports custom validation through schema['validate'] function:
     *
     * ```typescript
     * const EmailSchema = Type.String({
     *   format: 'email',
     *   validate: (value: string) => {
     *     return value.includes('@company.com')
     *   }
     * })
     * ```
     *
     * Custom validation runs before standard TypeBox validation.
     * If custom validation fails, throws error with provided message.
     *
     * @throws {Error} When validation fails
     */
    asserts<T extends TSchema>(kind: TKind, data: unknown, options?: {
        message: string;
    }): asserts data is Static<T>;
    /**
     * Create facade for commonly used methods
     */
    assertsDefined<T>(data: T, message?: string): asserts data is NonNullable<T>;
    /**
     * Validates and cleans data according to the schema for the given kind.
     * Removes any properties not defined in the schema.
     *
     * @throws {Error} When validation fails
     */
    parse<T extends TSchema>(schema: T, data: unknown, options?: {
        message: string;
    }): Static<T>;
    /**
     * Parses a value or throws an `AssertError` if invalid
     *
     * Using `Value.Parse` caused circular dep issue inside `@computed`
     *
     * https://github.com/sinclairzx81/typebox?tab=readme-ov-file#parse
     */
    parseDefined<T>(data: T): NonNullable<T>;
    /**
     * Extends typebox `SchemaOptions` with custom `validate` key
     */
    validate(kind: TKind, data: Readonly<unknown>): any;
    /**
     * Validates data against a provided schema
     */
    validateSchema<T extends TSchema>(schema: T, data: Readonly<unknown>): Static<T>;
    private static instance?;
    private createValidator;
    /**
     * Run custom validation on Typebox schema
     *
     * Type.Object({}, { validate: (data: unknown) => { return true } })
     */
    private runCustomValidation;
}
