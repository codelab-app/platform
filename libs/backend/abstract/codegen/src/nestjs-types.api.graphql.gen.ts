
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TypeKind {
    PrimitiveType = "PrimitiveType",
    ArrayType = "ArrayType",
    InterfaceType = "InterfaceType",
    EnumType = "EnumType",
    LambdaType = "LambdaType",
    ElementType = "ElementType",
    RenderPropsType = "RenderPropsType",
    ReactNodeType = "ReactNodeType",
    UnionType = "UnionType",
    MonacoType = "MonacoType",
    PageType = "PageType",
    AppType = "AppType"
}

export enum ElementTypeKind {
    AllElements = "AllElements",
    DescendantsOnly = "DescendantsOnly",
    ChildrenOnly = "ChildrenOnly"
}

export enum PrimitiveTypeKind {
    String = "String",
    Integer = "Integer",
    Float = "Float",
    Boolean = "Boolean"
}

export enum MonacoLanguage {
    TypeScript = "TypeScript",
    JavaScript = "JavaScript",
    CSS = "CSS",
    JSON = "JSON",
    Graphql = "Graphql",
    CSSINJS = "CSSINJS"
}

export interface GetTypeInput {
    where: WhereUniqueType;
}

export interface WhereUniqueType {
    id?: Nullable<string>;
    name?: Nullable<string>;
    atomId?: Nullable<string>;
    enumTypeValueId?: Nullable<string>;
}

export interface GetTypeGraphInput {
    where: WhereUniqueTypeGraph;
}

export interface WhereUniqueTypeGraph {
    id?: Nullable<string>;
    name?: Nullable<string>;
    atomId?: Nullable<string>;
}

export interface GetTypesInput {
    where?: Nullable<TypesWhereInput>;
}

export interface TypesWhereInput {
    ids?: Nullable<string[]>;
    kind?: Nullable<TypeKind>;
    name?: Nullable<string>;
}

export interface GetFieldInput {
    byInterface?: Nullable<FieldByInterfaceFilter>;
    byId?: Nullable<FieldByIdFilter>;
}

export interface FieldByInterfaceFilter {
    interfaceId: string;
    fieldKey: string;
}

export interface FieldByIdFilter {
    fieldId: string;
}

export interface ImportTypesInput {
    payload: string;
}

export interface CreateTypeInput {
    name: string;
    typeKind: TypeKind;
    primitiveType?: Nullable<CreatePrimitiveTypeInput>;
    arrayType?: Nullable<CreateArrayTypeInput>;
    enumType?: Nullable<CreateEnumTypeInput>;
    unionType?: Nullable<CreateUnionType>;
    elementType?: Nullable<CreateElementTypeInput>;
    monacoType?: Nullable<CreateMonacoTypeInput>;
}

export interface CreatePrimitiveTypeInput {
    primitiveKind: PrimitiveTypeKind;
}

export interface CreateArrayTypeInput {
    itemTypeId: string;
}

export interface CreateEnumTypeInput {
    allowedValues: CreateEnumTypeValueInput[];
}

export interface CreateEnumTypeValueInput {
    name?: Nullable<string>;
    value: string;
}

export interface CreateUnionType {
    typeIdsOfUnionType: string[];
}

export interface CreateElementTypeInput {
    kind: ElementTypeKind;
}

export interface CreateMonacoTypeInput {
    language: MonacoLanguage;
}

export interface UpdateEnumTypeInput {
    typeId: string;
    updateData: UpdateEnumTypeData;
}

export interface UpdateEnumTypeData {
    allowedValues: UpdateEnumTypeValueData[];
    name: string;
}

export interface UpdateEnumTypeValueData {
    id?: Nullable<string>;
    name?: Nullable<string>;
    value: string;
}

export interface UpdatePrimitiveTypeInput {
    typeId: string;
    updateData: UpdatePrimitiveKindData;
}

export interface UpdatePrimitiveKindData {
    primitiveKind: PrimitiveTypeKind;
    name: string;
}

export interface UpdateUnionTypeInput {
    updateData: UpdateUnionTypeData;
    typeId: string;
}

export interface UpdateUnionTypeData {
    name: string;
    typeIdsOfUnionType: string[];
}

export interface UpdateTypeInput {
    updateData: UpdateTypeData;
    typeId: string;
}

export interface UpdateTypeData {
    name: string;
}

export interface DeleteTypeInput {
    typeId: string;
}

export interface CreateFieldInput {
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    interfaceId: string;
    type: TypeRef;
}

export interface TypeRef {
    existingTypeId?: Nullable<string>;
    newType?: Nullable<CreateTypeInput>;
}

export interface UpdateFieldInput {
    interfaceId: string;
    fieldId: string;
    updateData: UpdateFieldData;
}

export interface UpdateFieldData {
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    type: TypeRef;
}

export interface DeleteFieldInput {
    fieldId: string;
    interfaceId: string;
}

export interface TypeEdge {
    source: string;
    target: string;
}

export interface Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
}

export interface ObjectRef {
    id: string;
}

export interface CreateResponse {
    id: string;
}

export interface Field {
    id: string;
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    target: string;
    source: string;
}

export interface BaseTypeEdge extends TypeEdge {
    source: string;
    target: string;
}

export interface FieldTypeEdge extends TypeEdge {
    source: string;
    target: string;
    id: string;
    key: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface ArrayType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
    itemType: ObjectRef;
}

export interface ElementType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
    elementKind: ElementTypeKind;
}

export interface EnumTypeValue {
    id: string;
    name?: Nullable<string>;
    value: string;
}

export interface EnumType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
    allowedValues: EnumTypeValue[];
}

export interface InterfaceType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
    fields: Field[];
}

export interface LambdaType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
}

export interface PrimitiveType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
    primitiveKind: PrimitiveTypeKind;
}

export interface ReactNodeType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
}

export interface RenderPropsType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
}

export interface AppType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
}

export interface MonacoType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
    language: MonacoLanguage;
}

export interface PageType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
}

export interface UnionType extends Type {
    typeKind: TypeKind;
    id: string;
    name: string;
    owner?: Nullable<ObjectRef>;
    typeGraph: TypeGraph;
    typesOfUnionType: ObjectRef[];
}

export interface TypeGraph {
    vertices: TypeVertex[];
    edges: TypeEdge[];
}

export interface IQuery {
    getType(input: GetTypeInput): Nullable<Type> | Promise<Nullable<Type>>;
    getTypeGraph(input: GetTypeGraphInput): Nullable<TypeGraph> | Promise<Nullable<TypeGraph>>;
    getTypes(input?: Nullable<GetTypesInput>): Type[] | Promise<Type[]>;
    getField(input: GetFieldInput): Nullable<Field> | Promise<Nullable<Field>>;
}

export interface IMutation {
    importTypes(input: ImportTypesInput): Nullable<CreateResponse[]> | Promise<Nullable<CreateResponse[]>>;
    seedBaseTypes(): Nullable<Void> | Promise<Nullable<Void>>;
    createType(input: CreateTypeInput): Type | Promise<Type>;
    updateEnumType(input: UpdateEnumTypeInput): Nullable<EnumType> | Promise<Nullable<EnumType>>;
    updatePrimitiveType(input: UpdatePrimitiveTypeInput): Nullable<PrimitiveType> | Promise<Nullable<PrimitiveType>>;
    updateUnionType(input: UpdateUnionTypeInput): Nullable<UnionType> | Promise<Nullable<UnionType>>;
    updateType(input: UpdateTypeInput): Nullable<Type> | Promise<Nullable<Type>>;
    deleteType(input: DeleteTypeInput): Nullable<Type> | Promise<Nullable<Type>>;
    createField(input: CreateFieldInput): Field | Promise<Field>;
    updateField(input: UpdateFieldInput): Nullable<Field> | Promise<Nullable<Field>>;
    deleteField(input: DeleteFieldInput): Nullable<Field> | Promise<Nullable<Field>>;
}

export type Void = any;
export type TypeVertex = EnumType | PrimitiveType | ArrayType | ElementType | InterfaceType | LambdaType | PageType | AppType | RenderPropsType | ReactNodeType | UnionType | MonacoType;
type Nullable<T> = T | null;
