
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    Admin = "Admin",
    User = "User",
    Guest = "Guest"
}

export interface GetUserInput {
    id?: Nullable<string>;
    auth0Id?: Nullable<string>;
}

export interface GetUsersInput {
    page: number;
    perPage: number;
    query: string;
    sort: string;
}

export interface UpsertUserInput {
    data: UpsertUserDataInput;
    where?: Nullable<UserWhereUniqueInput>;
}

export interface UpsertUserDataInput {
    auth0Id: string;
    roles: Role[];
}

export interface UserWhereUniqueInput {
    id?: Nullable<string>;
    auth0Id?: Nullable<string>;
}

export interface DeleteUserInput {
    id: string;
}

export interface User {
    id: string;
    auth0Id: string;
    roles: Role[];
}

export interface IQuery {
    getMe(): Nullable<User> | Promise<Nullable<User>>;
    getUser(input: GetUserInput): Nullable<User> | Promise<Nullable<User>>;
    getUsers(input?: Nullable<GetUsersInput>): User[] | Promise<User[]>;
}

export interface IMutation {
    upsertUser(input: UpsertUserInput): User | Promise<User>;
    deleteUser(input: DeleteUserInput): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
