import { Static, TSchema } from '@sinclair/typebox';
import { StandardValidator } from 'typebox-validators';
/**
 * The standard validator checks the top level object properties and handles nested discriminated unions
 *
 * This uses Ajv under the hood, does not work with `TypeRegistry`
 *
 * @throws {ValidationException} When validation fails
 */
export declare class NestedValidator<S extends TSchema> extends StandardValidator<S> {
    protected cleanCopyOfValue<VS extends TSchema>(schema: Readonly<VS>, value: Static<VS>): Static<VS>;
    private cleanNestedObject;
}
