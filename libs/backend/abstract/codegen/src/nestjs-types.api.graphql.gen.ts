
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface GetLambdaInput {
    lambdaId: string;
}

export interface CreateLambdaInput {
    name: string;
    body: string;
}

export interface DeleteLambdaInput {
    lambdaId: string;
}

export interface UpdateLambdaInput {
    name: string;
    body: string;
    id: string;
}

export interface ExecuteLambdaInput {
    lambdaId: string;
    payload?: Nullable<string>;
}

export interface Lambda {
    id: string;
    ownerId: string;
    name: string;
    body: string;
}

export interface LambdaPayload {
    payload: string;
}

export interface IQuery {
    getLambda(input: GetLambdaInput): Nullable<Lambda> | Promise<Nullable<Lambda>>;
    getLambdas(): Lambda[] | Promise<Lambda[]>;
}

export interface IMutation {
    createLambda(input: CreateLambdaInput): Lambda | Promise<Lambda>;
    deleteLambda(input: DeleteLambdaInput): Lambda | Promise<Lambda>;
    updateLambda(input: UpdateLambdaInput): Nullable<Lambda> | Promise<Nullable<Lambda>>;
    executeLambda(input: ExecuteLambdaInput): Nullable<LambdaPayload> | Promise<Nullable<LambdaPayload>>;
}

type Nullable<T> = T | null;
