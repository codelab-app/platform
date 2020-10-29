import {defaultFieldResolver, DirectiveLocation, GraphQLDirective, GraphQLField} from "@apollo/graphql"
import { SchemaDirectiveVisitor } from 'apollo-server';
import {Logger} from "@nestjs/common"


export class UpperCaseDirective extends SchemaDirectiveVisitor {

    visitFieldDefinition(field: any) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args: any[]) {
            const result = await resolve.apply(this, args);
            Logger.log(`result ${result}`);
            if (typeof result === "string") {
                return result.toUpperCase();
            }
            return result;
        };
    }

    // static getDirectiveDeclaration(directiveName, schema) {
    //     return new GraphQLDirective({
    //         name: directiveName,
    //         locations: [
    //             DirectiveLocation.OBJECT,
    //             DirectiveLocation.FIELD_DEFINITION,
    //         ],
    //         args: {
    //             requires: {
    //                 // Having the schema available here is important for
    //                 // obtaining references to existing type objects, such
    //                 // as the Role enum.
    //                 type: schema.getType('Role'),
    //                 defaultValue: 'ADMIN',
    //             }
    //         }
    //     });
    // }
}
