import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class HealthOutput {
    @Field({ nullable: true })
    isRunning: boolean = false;
}
