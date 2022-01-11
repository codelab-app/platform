
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface GetTagInput {
    where: WhereUniqueTag;
}

export interface WhereUniqueTag {
    name?: Nullable<string>;
    id?: Nullable<string>;
}

export interface GetTagsInput {
    ids?: Nullable<string[]>;
}

export interface GetTagGraphsInput {
    where?: Nullable<TagsWhereInput>;
}

export interface TagsWhereInput {
    ids?: Nullable<string[]>;
}

export interface CreateTagInput {
    name: string;
    parentTagId?: Nullable<string>;
}

export interface UpdateTagInput {
    id: string;
    data: UpdateTagData;
}

export interface UpdateTagData {
    name: string;
}

export interface DeleteTagsInput {
    ids: string[];
}

export interface UpsertTagInput {
    data: CreateTagInput;
    where?: Nullable<TagWhereUniqueInput>;
}

export interface TagWhereUniqueInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface ImportTagsInput {
    payload: string;
}

export interface Tag {
    id: string;
    name: string;
    parent?: Nullable<string>;
    children: string[];
    isRoot: boolean;
}

export interface TagEdge {
    source: string;
    target: string;
    order?: Nullable<number>;
}

export interface TagGraph {
    vertices: TagVertex[];
    edges: TagEdge[];
}

export interface IQuery {
    getTag(input: GetTagInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    getTags(input?: Nullable<GetTagsInput>): Tag[] | Promise<Tag[]>;
    getTagGraph(): Nullable<TagGraph> | Promise<Nullable<TagGraph>>;
    getTagGraphs(input?: Nullable<GetTagGraphsInput>): TagGraph | Promise<TagGraph>;
}

export interface IMutation {
    createTag(input: CreateTagInput): Tag | Promise<Tag>;
    updateTag(input: UpdateTagInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    deleteTags(input: DeleteTagsInput): Nullable<Tag[]> | Promise<Nullable<Tag[]>>;
    upsertTag(input: UpsertTagInput): Tag | Promise<Tag>;
    importTags(input: ImportTagsInput): Nullable<Void> | Promise<Nullable<Void>>;
}

export type Void = any;
export type TagVertex = Tag;
type Nullable<T> = T | null;
