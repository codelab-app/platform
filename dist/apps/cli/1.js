"use strict";
exports.id = 1;
exports.ids = [1];
exports.modules = {

/***/ 9:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  DatabaseService: () => (/* reexport */ DatabaseService),
  GRAPHQL_SCHEMA_PROVIDER: () => (/* reexport */ GRAPHQL_SCHEMA_PROVIDER),
  GraphQLSchemaModule: () => (/* reexport */ GraphQLSchemaModule),
  GraphQLSchemaProvider: () => (/* reexport */ GraphQLSchemaProvider),
  NEO4J_DRIVER_PROVIDER: () => (/* reexport */ NEO4J_DRIVER_PROVIDER),
  Neo4jDriverProvider: () => (/* reexport */ Neo4jDriverProvider),
  Neo4jModule: () => (/* reexport */ Neo4jModule),
  Neo4jService: () => (/* reexport */ Neo4jService),
  OgmModule: () => (/* reexport */ OgmModule),
  OgmService: () => (/* reexport */ OgmService),
  PURE_RESOLVER_PROVIDER: () => (/* reexport */ PURE_RESOLVER_PROVIDER),
  PureResolverProvider: () => (/* reexport */ PureResolverProvider),
  actionSelectionSet: () => (/* reexport */ actionSelectionSet),
  apiActionSelectionSet: () => (/* reexport */ apiActionSelectionSet),
  appSelectionSet: () => (/* reexport */ appSelectionSet),
  arrayTypeSelectionSet: () => (/* reexport */ arrayTypeSelectionSet),
  atomSelectionSet: () => (/* reexport */ atomSelectionSet),
  authGuardSelectionSet: () => (/* reexport */ authGuardSelectionSet),
  baseAppSelectionSet: () => (/* reexport */ baseAppSelectionSet),
  basePageSelectionSet: () => (/* reexport */ basePageSelectionSet),
  baseTypeSelection: () => (/* reexport */ baseTypeSelection),
  codeActionSelectionSet: () => (/* reexport */ codeActionSelectionSet),
  codeMirrorTypeSelectionSet: () => (/* reexport */ codeMirrorTypeSelectionSet),
  componentSelectionSet: () => (/* reexport */ componentSelectionSet),
  domainSelectionSet: () => (/* reexport */ domainSelectionSet),
  duplicateElement: () => (/* reexport */ duplicateElement_cypher_namespaceObject),
  elementSelectionSet: () => (/* reexport */ elementSelectionSet),
  enumTypeSelectionSet: () => (/* reexport */ enumTypeSelectionSet),
  exportApiActionSelectionSet: () => (/* reexport */ exportApiActionSelectionSet),
  exportAppSelectionSet: () => (/* reexport */ exportAppSelectionSet),
  exportAtomSelectionSet: () => (/* reexport */ exportAtomSelectionSet),
  exportCodeActionSelectionSet: () => (/* reexport */ exportCodeActionSelectionSet),
  exportComponentSelectionSet: () => (/* reexport */ exportComponentSelectionSet),
  exportElementSelectionSet: () => (/* reexport */ exportElementSelectionSet),
  exportFieldSelectionSet: () => (/* reexport */ exportFieldSelectionSet),
  exportPageSelectionSet: () => (/* reexport */ exportPageSelectionSet),
  exportStoreSelectionSet: () => (/* reexport */ exportStoreSelectionSet),
  exportTagSelectionSet: () => (/* reexport */ exportTagSelectionSet),
  fieldSelectionSet: () => (/* reexport */ fieldSelectionSet),
  getBaseTypes: () => (/* reexport */ getBaseTypes_cypher_namespaceObject),
  getClosestContainerNodeCypher: () => (/* reexport */ getClosestContainerNode_cypher_namespaceObject),
  getDependentTypes: () => (/* reexport */ getDependentTypes_cypher_namespaceObject),
  getDescendantComponentIds: () => (/* reexport */ getDescendantComponentIds_cypher_namespaceObject),
  getDescendantsCypher: () => (/* reexport */ getDescendants_cypher_namespaceObject),
  getElementDependantTypes: () => (/* reexport */ getElementDependantTypes_cypher_namespaceObject),
  getElementWithDescendants: () => (/* reexport */ getElementWithDescendants),
  getTagGraphs: () => (/* reexport */ getTagGraphs_cypher_namespaceObject),
  getTypeDescendants: () => (/* reexport */ getTypeDescendants_cypher_namespaceObject),
  getTypeDescendantsOGM: () => (/* reexport */ getTypeDescendantsOGM_cypher_namespaceObject),
  getTypeReferences: () => (/* reexport */ getTypeReferences_cypher_namespaceObject),
  interfaceTypeSelectionSet: () => (/* reexport */ interfaceTypeSelectionSet),
  isTypeDescendantOf: () => (/* reexport */ isTypeDescendantOf_cypher_namespaceObject),
  neo4jConfig: () => (/* reexport */ neo4jConfig),
  nestNeo4jGraphqlModule: () => (/* reexport */ nestNeo4jGraphqlModule),
  ownerFieldSelectionSet: () => (/* reexport */ ownerFieldSelectionSet),
  pageSelectionSet: () => (/* reexport */ pageSelectionSet),
  preferenceSelectionSet: () => (/* reexport */ preferenceSelectionSet),
  primitiveTypeSelectionSet: () => (/* reexport */ primitiveTypeSelectionSet),
  propSelectionSet: () => (/* reexport */ propSelectionSet),
  pureTypeDefs: () => (/* reexport */ pureTypeDefs),
  redirectSelectionSet: () => (/* reexport */ redirectSelectionSet),
  resourceSelectionSet: () => (/* reexport */ resourceSelectionSet),
  setupTestingContext: () => (/* reexport */ setupTestingContext),
  storeSelectionSet: () => (/* reexport */ storeSelectionSet),
  tagDescendants: () => (/* reexport */ tagDescendants_cypher_namespaceObject),
  tagIsRoot: () => (/* reexport */ tagIsRoot_cypher_namespaceObject),
  tagSelectionSet: () => (/* reexport */ tagSelectionSet),
  unionTypeSelectionSet: () => (/* reexport */ unionTypeSelectionSet),
  userSelectionSet: () => (/* reexport */ userSelectionSet)
});

;// ../../libs/backend/infra/adapter/neo4j/src/cypher/component/getDescendantComponentIds.cypher
const getDescendantComponentIds_cypher_namespaceObject = "CALL apoc.path.subgraphAll(\n  this,\n  {\n    relationshipFilter: 'COMPONENT_ROOT|<TREE_FIRST_CHILD|<NODE_SIBLING|RENDER_COMPONENT_TYPE'\n  }\n) YIELD nodes AS descendants\n\nUNWIND descendants AS descendant\n  WITH descendant\n    WHERE 'Component' IN LABELS(descendant)\n\nRETURN collect(DISTINCT descendant.id)\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/component/index.ts



;// ../../libs/backend/infra/adapter/neo4j/src/cypher/element/duplicateElement.cypher
const duplicateElement_cypher_namespaceObject = "MATCH (parentNode:Element)-[rootLink:PARENT_OF_ELEMENT]->(element:Element {id: $elementId})\n\nCALL apoc.path.subgraphAll(\n    element,\n    { relationshipFilter: 'PARENT_OF_ELEMENT>|PROPS_OF_ELEMENT>|HOOKS_OF_ELEMENT>|RENDER_ATOM_TYPE>' }\n) YIELD nodes, relationships\n\nCALL apoc.refactor.cloneSubgraph(\n    nodes + [parentNode],\n    relationships + [rootLink],\n    {\n        skipProperties:['id'],\n        standinNodes:[[parentNode,parentNode]]\n    }\n) YIELD input, output as createdNode, error\n\nSET createdNode.id = apoc.create.uuid()\n\nRETURN collect(createdNode.id) as ids\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/element/getClosestContainerNode.cypher
const getClosestContainerNode_cypher_namespaceObject = "MATCH (this:Element)\n\n// For root Element, we get all descendants\nCALL apoc.path.subgraphNodes(\n  element,\n  {\n    relationshipFilter: 'TREE_FIRST_CHILD>|NODE_SIBLING>|<ROOT_PAGE_ELEMENT|<COMPONENT_ROOT',\n    labelFilter:'/Component|/Page'\n  }\n)\nYIELD node\n\nRETURN node\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/element/getDescendants.cypher
const getDescendants_cypher_namespaceObject = "MATCH (rootElement: Element {id: $rootId})\nOPTIONAL MATCH (firstChild: Element)-[:TREE_FIRST_CHILD]->(rootElement)\n\n// For root Element, we get all descendants\nCALL apoc.path.subgraphAll(\n  firstChild,\n  { relationshipFilter: '<TREE_FIRST_CHILD|<NODE_SIBLING|RENDER_COMPONENT_TYPE>' }\n) YIELD nodes AS descendants\n\n// Get isRoot by checking if parent exists\n// CALL {\n//   WITH element\n//   RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag { id: tag.id }) ) as has_no_parent\n// }\n\n// Need to filter out root node\nRETURN [node IN descendants WHERE node.id <> rootElement.id], rootElement {.*}\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/element/getElementDependantTypes.cypher
const getElementDependantTypes_cypher_namespaceObject = "// query searches for nodes that are descendants of node with 'id'\n// returning the related nodes found within a depth range of 1 to 10 hops away from the starting node.\nMATCH (this {id: $id})\n-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|FIELD_TYPE|UNION_TYPE_CHILD*1..10]->(type)\nWHERE NOT type.id = $id AND NOT (type:PrimitiveType OR type:ReactNodeType OR type:CodeMirrorType OR type:RichTextType OR type:ActionType OR type:RenderPropType)\nRETURN DISTINCT {id: type.id, __typename: LAST(labels(type))}\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/element/index.ts






;// ../../libs/backend/infra/adapter/neo4j/src/cypher/tag/getTagGraphs.cypher
const getTagGraphs_cypher_namespaceObject = "MATCH (tags:Tag)\n\nUNWIND tags AS tag\n\n// For each Tag, we get all descendants\nCALL apoc.path.subgraphAll(\n  tag,\n  { relationshipFilter: '>CHILDREN' }\n) YIELD nodes AS descendants\n\n// Get isRoot by checking if parent exists\nCALL {\n  WITH tag\n  RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag {id: tag.id}) ) as has_no_parent\n}\n\n// Need to filter out root node by getting disjunction\nRETURN tag {.*, isRoot: has_no_parent },\n  apoc.coll.disjunction(\n    [node IN descendants | node.id],\n    [tag.id]\n  )\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/tag/tagDescendants.cypher
const tagDescendants_cypher_namespaceObject = "Match (tag:Tag {id: $rootId})\n\n// For root Element, we get all descendants\nCALL apoc.path.subgraphAll(\n  tag,\n  { relationshipFilter: '>CHILDREN' }\n) YIELD nodes AS descendants\n\n// Need to filter out root node\nRETURN [node IN descendants WHERE node.id <> tag.id], tag {.*}\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/tag/tagIsRoot.cypher
const tagIsRoot_cypher_namespaceObject = "// `this` refers to current node context\nRETURN NOT exists((:Tag)-[:CHILDREN]->({ id: this.id }))\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/tag/index.ts





;// ../../libs/backend/infra/adapter/neo4j/src/cypher/type/getBaseTypes.cypher
const getBaseTypes_cypher_namespaceObject = "MATCH (type:Type)\nWHERE type.name =~ $name OR isEmpty($name)\nWITH count(type) AS totalCount, $name AS name\n\nMATCH (type:Type)-[:OWNED_BY]-(owner:User)\nWHERE type.name =~ name OR isEmpty($name)\nRETURN type, owner, totalCount\n\nORDER BY type.name\nSKIP $skip\nLIMIT $limit\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/type/getDependentTypes.cypher
const getDependentTypes_cypher_namespaceObject = "// Get all the types that the current type depend on, excluding system types\n// The query will explore specific relationships that are no more than 3 levels deep from current type\n// Does not include itself\nMATCH (this {id: $id})\n-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|FIELD_TYPE|UNION_TYPE_CHILD*1..10]->(t)\nWHERE NOT t.id = $id AND NOT (t:PrimitiveType OR t:ReactNodeType OR t:CodeMirrorType OR t:RichTextType OR t:ActionType OR t:RenderPropType)\nRETURN {id: t.id, __typename: LAST(labels(t))}\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/type/getTypeDescendants.cypher
const getTypeDescendants_cypher_namespaceObject = "//\n// Different parameters are injected based on the context.\n//\n// - `this` is used in graphql @cypher context\n// - `$this` is used in JS session driver context\n//\n// coalesce() returns the first non-null value\n//\n// https://neo4j.com/labs/apoc/4.0/graph-querying/expand-subgraph/#expand-subgraph-relationship-filters\n//\n// >FIELD_TYPE is so we can get the end node of the field\n\nMatch (type:Type {id: $this})\n\nCALL apoc.path.subgraphAll(\n  type,\n  {\n    relationshipFilter: '>ARRAY_ITEM_TYPE|>UNION_TYPE_CHILD|>INTERFACE_FIELD|>FIELD_TYPE',\n    labelFilter: '>Type|>Field'\n  }\n) YIELD nodes\n\nRETURN [node in nodes | node.id]\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/type/getTypeDescendantsOGM.cypher
const getTypeDescendantsOGM_cypher_namespaceObject = "//\n// Different parameters are injected based on the context.\n//\n// - `this` is used in graphql @cypher context\n// - `$this` is used in JS session driver context\n//\n// coalesce() returns the first non-null value\n//\n\nMATCH (type:InterfaceType {id: $id})\n\nCALL apoc.path.subgraphAll(\n  type,\n  {\n    relationshipFilter: '>ARRAY_ITEM_TYPE|>UNION_TYPE_CHILD|>INTERFACE_FIELD|>FIELD_TYPE',\n    labelFilter: '>Type|>Field'\n  }\n) YIELD nodes\n\nRETURN [node in nodes | { id: node.id, kind: node.kind, name: node.name }]\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/type/getTypeReferences.cypher
const getTypeReferences_cypher_namespaceObject = "// Returns a list of all Type and Atom entities that reference the type with the given id\n//\n// This could be different types of relationships like\n//\n// - Atom-Api\n// - ArrayType-itemType\n// - InterfaceType-field\n// - UnionType-unionTypeChild\n//\nMATCH (this {id: $typeId})<-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|UNION_TYPE_CHILD|ATOM_API]-(t)\nRETURN {name: t.name, label: labels(t)[0]}\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/type/isTypeDescendantOf.cypher
const isTypeDescendantOf_cypher_namespaceObject = "MATCH\n  (parentType {id: $parentTypeId})-[r:ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD*0..]->\n  (descendantType {id: $descendantTypeId})\n  WHERE labels(descendantType)[0] ENDS WITH 'Type'\n\nRETURN count(descendantType) > 0 as isDescendant\n";
;// ../../libs/backend/infra/adapter/neo4j/src/cypher/type/index.ts








;// ../../libs/backend/infra/adapter/neo4j/src/cypher/index.ts





// EXTERNAL MODULE: external "tslib"
var external_tslib_ = __webpack_require__(1);
// EXTERNAL MODULE: external "@nestjs/common"
var common_ = __webpack_require__(2);
// EXTERNAL MODULE: external "@nestjs/config"
var config_ = __webpack_require__(3);
// EXTERNAL MODULE: external "env-var"
var external_env_var_ = __webpack_require__(6);
;// ../../libs/backend/infra/adapter/digitalocean/src/digitalocean.config.ts


const digitaloceanConfig = (0,config_.registerAs)('digitalocean', () => ({
    apiToken: external_env_var_.get('DIGITALOCEAN_API_TOKEN').default('').asString(),
    dropletName: external_env_var_.get('DIGITALOCEAN_DROPLET_NAME').required().asString(),
}));

// EXTERNAL MODULE: external "dots-wrapper"
var external_dots_wrapper_ = __webpack_require__(21);
;// ../../libs/backend/infra/adapter/digitalocean/src/digitalocean.service.ts
var _a;

// import { getEnv } from '@codelab/shared/config'




let DigitaloceanService = class DigitaloceanService {
    constructor(config) {
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'https://api.digitalocean.com/v2'
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = (0,external_dots_wrapper_.createApiClient)({ token: config.apiToken });
    }
    async createDomain(name) {
        const input = {
            name,
        };
        const { data: { domain }, } = await this.client.domain.createDomain(input);
        return domain;
    }
    async deleteDomain(name) {
        const input = {
            name,
        };
        return await this.client.domain.deleteDomain(input);
    }
    async getDomainRecords(domainName) {
        const input = {
            domain_name: domainName,
            // per_page: 100,
        };
        const { data: { domain_records }, } = await this.client.domain.listDomainRecords(input);
        return domain_records;
    }
    async getSitesDroplet() {
        const input = {
            per_page: 100,
        };
        const { data: { droplets }, } = await this.client.droplet.listDroplets(input);
        return droplets.find((droplet) => droplet.name === 'sites');
    }
    /**
     * Only way to update
     */
    async updateDomain(oldName, newName) {
        await this.deleteDomain(oldName);
        return this.createDomain(newName);
    }
};
DigitaloceanService = (0,external_tslib_.__decorate)([
    (0,common_.Injectable)(),
    (0,external_tslib_.__param)(0, (0,common_.Inject)(digitaloceanConfig.KEY)),
    (0,external_tslib_.__metadata)("design:paramtypes", [typeof (_a = typeof config_.ConfigType !== "undefined" && config_.ConfigType) === "function" ? _a : Object])
], DigitaloceanService);


;// ../../libs/backend/infra/adapter/digitalocean/src/digitalocean.module.ts





let DigitaloceanModule = class DigitaloceanModule {
};
DigitaloceanModule = (0,external_tslib_.__decorate)([
    (0,common_.Module)({
        exports: [DigitaloceanService],
        imports: [
            config_.ConfigModule.forRoot({
                ignoreEnvVars: true,
                load: [digitaloceanConfig],
            }),
        ],
        providers: [DigitaloceanService],
    })
], DigitaloceanModule);


;// ../../libs/backend/infra/adapter/neo4j/src/neo4j.config.ts


const neo4jConfig = (0,config_.registerAs)('neo4j', () => {
    return {
        password: external_env_var_.get('NEO4J_PASSWORD').required().asString(),
        uri: external_env_var_.get('NEO4J_URI').required().asUrlObject(),
        user: external_env_var_.get('NEO4J_USER').required().asString(),
    };
});

// EXTERNAL MODULE: external "neo4j-driver"
var external_neo4j_driver_ = __webpack_require__(10);
var external_neo4j_driver_default = /*#__PURE__*/__webpack_require__.n(external_neo4j_driver_);
;// ../../libs/backend/infra/adapter/neo4j/src/infra/neo4j.constant.ts
const NEO4J_DRIVER_PROVIDER = 'NEO4J_DRIVER_PROVIDER';

;// ../../libs/backend/infra/adapter/neo4j/src/infra/neo4j.service.ts
var neo4j_service_a;




let Neo4jService = class Neo4jService {
    constructor(driver) {
        Object.defineProperty(this, "driver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: driver
        });
    }
    async withReadTransaction(readTransaction, close = false) {
        const session = this.driver.session();
        return session
            .executeRead((txn) => readTransaction(txn))
            .catch((error) => {
            console.error(error);
            throw error;
        })
            .finally(async () => {
            await session.close();
            /**
             * Need to keep connection open for jest, otherwise subsequent specs won't work
             */
            if (close) {
                await this.driver.close();
            }
        });
    }
    async withWriteTransaction(writeTransaction, close = false) {
        const session = this.driver.session();
        return session
            .executeWrite((txn) => writeTransaction(txn))
            .catch((error) => {
            console.error(error);
            throw error;
        })
            .finally(async () => {
            await session.close();
            /**
             * Need to keep connection open for jest, otherwise subsequent specs won't work
             */
            if (close) {
                await this.driver.close();
            }
        });
    }
};
Neo4jService = (0,external_tslib_.__decorate)([
    (0,common_.Injectable)(),
    (0,external_tslib_.__param)(0, (0,common_.Inject)(NEO4J_DRIVER_PROVIDER)),
    (0,external_tslib_.__metadata)("design:paramtypes", [typeof (neo4j_service_a = typeof external_neo4j_driver_.Driver !== "undefined" && external_neo4j_driver_.Driver) === "function" ? neo4j_service_a : Object])
], Neo4jService);


;// ../../libs/backend/infra/adapter/neo4j/src/infra/database.service.ts
var database_service_a;



/**
 * This class is tested in application layer, since it requires application seeders to create the data
 */
let DatabaseService = class DatabaseService {
    constructor(neo4jService) {
        Object.defineProperty(this, "neo4jService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4jService
        });
    }
    async atomTypes() {
        const query = `
      MATCH (n)
      WHERE NOT (n:User
        OR (n:Atom)
        OR (n:Type)-[:ATOM_API|FIELD_TYPE*1..]-(:Atom)
        OR (n:Field)-[:ATOM_API|INTERFACE_FIELD*1..]-(:Atom)
        OR (n:EnumTypeValue)
      )
      DETACH DELETE n
    `;
        return await this.neo4jService.withReadTransaction((txn) => txn.run(query));
    }
    /**
     *
     * Used by spec mostly, so we don't close the pool otherwise subsequent specs won't run
     *
     * Deletes everything in database
     *
     * @param close
     * @returns
     */
    async resetDatabase(close = false) {
        const query = `
      MATCH (n)
      DETACH DELETE n
    `;
        return this.neo4jService.withWriteTransaction((txn) => txn.run(query), close);
    }
    async resetDatabaseExceptUser(close = false) {
        const query = `
      MATCH (n)
      WHERE NOT n:User
      DETACH DELETE n
    `;
        return this.neo4jService.withWriteTransaction((txn) => txn.run(query), close);
    }
    /**
     * Keep the default renderType
     */
    // async resetDatabaseExceptUserAndAtom(close = false) {
    //   const query = `
    //     MATCH (n)
    //     WHERE NOT (n:User
    //       OR (n:Atom AND n.name = 'ReactFragment')
    //       OR (n:InterfaceType AND n.name = 'ReactFragment API')
    //     )
    //     DETACH DELETE n
    //   `
    //   return await this.runCypherQuery(close, query)
    // }
    /**
     * Don't remove `Type` that is related to Atom
     */
    async resetUserData(close = false) {
        const query = `
      MATCH (n)
      WHERE NOT (n:User
        OR (n:Preference)
        OR (n:Atom)
        OR (n:PrimitiveType)
        OR (n:RenderPropType)
        OR (n:ReactNodeType)
        OR (n:RichTextType)
        OR (n:CodeMirrorType)
        OR (n:Type|Field|EnumTypeValue)-[:ATOM_API|FIELD_TYPE|INTERFACE_FIELD|ALLOWED_VALUE*1..5]-(:Atom)
      )
      DETACH DELETE n
    `;
        return await this.neo4jService.withWriteTransaction((txn) => txn.run(query), close);
    }
};
DatabaseService = (0,external_tslib_.__decorate)([
    (0,common_.Injectable)(),
    (0,external_tslib_.__metadata)("design:paramtypes", [typeof (database_service_a = typeof Neo4jService !== "undefined" && Neo4jService) === "function" ? database_service_a : Object])
], DatabaseService);


;// ../../libs/backend/infra/adapter/neo4j/src/infra/neo4j.provider.ts



const Neo4jDriverProvider = {
    inject: [neo4jConfig.KEY],
    provide: NEO4J_DRIVER_PROVIDER,
    useFactory: (config) => {
        const password = config.password;
        const uri = config.uri.toString();
        const username = config.user;
        const neo4jDriver = external_neo4j_driver_default().driver(uri, external_neo4j_driver_default().auth.basic(username, password));
        return neo4jDriver;
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/infra/neo4j.module.ts
var neo4j_module_a;








let Neo4jModule = class Neo4jModule {
    constructor(neo4jService) {
        Object.defineProperty(this, "neo4jService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4jService
        });
    }
    async onModuleDestroy() {
        await this.neo4jService.driver.close();
    }
};
Neo4jModule = (0,external_tslib_.__decorate)([
    (0,common_.Module)({
        exports: [NEO4J_DRIVER_PROVIDER, Neo4jService, DatabaseService],
        imports: [
            config_.ConfigModule.forRoot({
                ignoreEnvVars: true,
                load: [neo4jConfig],
            }),
        ],
        providers: [Neo4jDriverProvider, Neo4jService, DatabaseService],
    }),
    (0,external_tslib_.__metadata)("design:paramtypes", [typeof (neo4j_module_a = typeof Neo4jService !== "undefined" && Neo4jService) === "function" ? neo4j_module_a : Object])
], Neo4jModule);


// EXTERNAL MODULE: external "@graphql-tools/merge"
var merge_ = __webpack_require__(12);
;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/action/action.resolver.ts
const actionResolver = {
    BaseAction: {
        __resolveType: (action) => action.type,
    },
};

// EXTERNAL MODULE: external "change-case-all"
var external_change_case_all_ = __webpack_require__(13);
// EXTERNAL MODULE: external "remeda"
var external_remeda_ = __webpack_require__(7);
// EXTERNAL MODULE: external "slugify"
var external_slugify_ = __webpack_require__(14);
var external_slugify_default = /*#__PURE__*/__webpack_require__.n(external_slugify_);
;// ../../libs/shared/utils/src/transform/strings-helpers.ts


/**
 * Splits to space by capital and dashes
 *
 * @deprecated Used internally
 */
const _splitByCapital = (str) => str.split(/(?=[A-Z])/).join(' ');
/**
 * Splits to space by capital and dashes
 *
 * @deprecated Used internally
 */
const _spacedLowerCase = (input) => {
    return (0,external_remeda_.pipe)(input, _splitByCapital, external_change_case_all_.Case.no);
    // This doesn't work since it does no case first before splitting
    // Case.no(input, {
    //   delimiter: ' ',
    // })
};

;// ../../libs/shared/utils/src/transform/strings.ts
/* eslint-disable no-restricted-imports */




const stripQuotes = (value) => value.replace(/['"]/g, '');
const capitalizeFirstLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1);
// custom implementation of slugify method because can't rely on voca.slugify.
// there are collisions, for example for strings like "My1 App", "My1app", "My 1 App"
// the same slug is generated "my-1-app" and we can't reverse it back to original string.
// in same time our custom implementation will generate "my1-app", "my1app", "my-1-app"
const slugify = (value) => {
    return external_slugify_default()(value, {
        lower: true,
        // remove: /[*+~.()%'"!:@$^]/g,
        strict: true,
    });
};
const getNameFromSlug = (str) => {
    return str ? str.split('-').map(capitalizeFirstLetter).join(' ') : '';
};
/**
 * Convert camelCase to kebab-case, but only for keys, not values
 *
 * Example: "fontFamily: 'Gloria Hallelujah'" => "font-family: 'Gloria Hallelujah'"
 */
const camelCaseToKebabCaseOnlyKeys = (input) => input?.replace(/(\w+)(\s*)(?=:)/g, (match) => match.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`));
/**
 * Transform both `camelCase`, `PascalCase` to title case
 */
const kebabCase = (input) => {
    return (0,external_remeda_.pipe)(input, _spacedLowerCase, external_change_case_all_.Case.kebab);
};
/**
 * Takes `kebab-case`, `camelCase`, `PascalCase` and transforms it to title case
 */
const titleCase = (input) => {
    return external_change_case_all_.Case.title(external_change_case_all_.Case.sentence(input));
};
/**
 * Creates initials out of a string
 */
const initials = (words) => {
    const spaced = _spacedLowerCase(words);
    return spaced
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
};

;// ../../libs/shared/utils/src/regex/uuid-regex.ts
const uuidRegex = /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/g;
const removeUuidAndDashPrefix = (input) => {
    const reg = new RegExp(`${uuidRegex.source}-`, 'gi');
    return input.replace(reg, '');
};

;// ../../libs/shared/domain-old/src/app/app.properties.ts

const appCompositeKey = (app, user) => `${user.id}-${slugify(app.name)}`;
const appNameFromCompositeKey = (app) => {
    const slug = appSlugFromCompositeKey(app);
    return titleCase(slug);
};
const appSlugFromCompositeKey = (app) => {
    const slug = removeUuidAndDashPrefix(app.compositeKey);
    return slug;
};
const AppProperties = {
    appCompositeKey,
    appNameFromCompositeKey,
    appSlugFromCompositeKey,
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/app/app.resolver.ts

/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
const app_resolver_name = AppProperties.appNameFromCompositeKey;
/**
 * Takes the name and slugify it
 */
const slug = AppProperties.appSlugFromCompositeKey;
const appResolver = {
    App: {
        name: app_resolver_name,
        slug,
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/atom/atom.resolver.ts
const atomResolver = {
    Atom: {
    // __typename: typename,
    },
};

;// ../../libs/shared/domain-old/src/component/component.properties.ts

const SEPARATOR_SYMBOL = '-';
const componentCompositeKey = (component, user) => `${user.id}${SEPARATOR_SYMBOL}${component.slug}`;
const componentNameFromCompositeKey = (component) => {
    const slug = componentSlugFromCompositeKey(component);
    return titleCase(slug);
};
const componentSlugFromCompositeKey = (component) => {
    const slug = removeUuidAndDashPrefix(component.compositeKey);
    return slug;
};
const ComponentProperties = {
    componentCompositeKey,
    componentNameFromCompositeKey,
    componentSlugFromCompositeKey,
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/component/component.resolver.ts

const component_resolver_name = ComponentProperties.componentNameFromCompositeKey;
const component_resolver_slug = (component) => {
    return ComponentProperties.componentSlugFromCompositeKey(component);
};
const componentResolver = {
    Component: {
        name: component_resolver_name,
        slug: component_resolver_slug,
    },
    Mutation: {},
    Query: {},
};

// EXTERNAL MODULE: external "dns"
var external_dns_ = __webpack_require__(15);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(16);
;// ../../libs/backend/infra/adapter/dns/src/dns.service.ts




const lookupARecord = async (domain) => {
    const resolve = (0,external_util_.promisify)(external_dns_.resolve4);
    const results = await resolve(domain);
    return results;
};
let DnsService = class DnsService {
    constructor() {
        Object.defineProperty(this, "lookupARecord", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: lookupARecord
        });
    }
};
DnsService = (0,external_tslib_.__decorate)([
    (0,common_.Injectable)()
], DnsService);


;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/domain/field/domain-config.ts

const domainConfig = async ({ name, }) => {
    try {
        const records = await lookupARecord(name);
        const exists = records.some((record) => record === '157.230.192.129');
        return { misconfigured: !exists };
    }
    catch (error) {
        console.error('Domain config error:', error);
        // For testing only
        return { misconfigured: false };
    }
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/domain/domain.resolver.ts

const domainResolver = {
    Domain: {
        domainConfig: domainConfig,
    },
};

;// ../../libs/shared/domain-old/src/element/element.properties.ts

const elementCompositeKey = (elementName, closestContainerNode) => {
    return `${closestContainerNode.id}-${elementName}`;
};
const elementNameFromCompositeKey = (element) => {
    const slug = elementSlugFromCompositeKey(element);
    return titleCase(slug);
};
const elementSlugFromCompositeKey = (element) => {
    const slug = removeUuidAndDashPrefix(element.compositeKey);
    return slug;
};
const ElementProperties = {
    elementCompositeKey,
    elementNameFromCompositeKey,
    elementSlugFromCompositeKey,
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/element/field/element-name.ts

/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
const element_name_name = ElementProperties.elementNameFromCompositeKey;

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/element/field/element-slug.ts

/**
 * Takes the name and slugify it
 */
const element_slug_slug = (element, args, context, info) => ElementProperties.elementSlugFromCompositeKey(element);

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/element/element.resolver.ts


const elementResolver = {
    Element: {
        __typename: 'Element',
        // We only use the OGM resolver, but we set a dummy resolver here to hide the console errors
        dependantTypes: [],
        name: element_name_name,
        // renderType,
        slug: element_slug_slug,
    },
    ElementRenderType: {
        __resolveType: (node) => {
            /**
             * `__resolveType` is there by default, for ones that don't exist, we have __typename
             */
            const resolveType = 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            node.__resolveType ?? node.__typename;
            if (!resolveType) {
                console.debug(node);
                throw new Error('Missing __resolveType');
            }
            return resolveType;
        },
    },
    Mutation: {},
    Query: {},
};

;// ../../libs/shared/domain-old/src/page/page.properties.ts

const pageCompositeKey = (page, app) => {
    return `${app.id}-${page.name}`;
};
const pageNameFromCompositeKey = (page) => page.compositeKey.replace(`${page.app.id}-`, '');
const pageSlugFromCompositeKey = (page) => {
    return slugify(PageProperties.pageNameFromCompositeKey(page));
};
const PageProperties = {
    pageCompositeKey,
    pageNameFromCompositeKey,
    pageSlugFromCompositeKey,
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/page/field/page-name.ts

/**
 * `_compoundName` contains format `appId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
const pageName = PageProperties.pageNameFromCompositeKey;

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/page/field/page-slug.ts

/**
 * Takes the name and slugify it
 */
const pageSlug = (page) => {
    return PageProperties.pageSlugFromCompositeKey(page);
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/page/page.resolver.ts


const pageResolver = {
    Mutation: {},
    Page: {
        name: pageName,
        slug: pageSlug,
    },
    Query: {},
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/type/type.resolver.ts


const TYPE_RESOLVER_PROVIDER = 'TYPE_RESOLVER_PROVIDER';
const TypeResolverProvider = {
    inject: [Neo4jService],
    provide: TYPE_RESOLVER_PROVIDER,
    useFactory: async (neo4jService) => {
        // const baseTypes: IFieldResolver<
        //   GraphQLRequestContext,
        //   unknown,
        //   QueryBaseTypesArgs
        // > = (_, params) =>
        //   neo4jService.withReadTransaction(async (txn) => {
        //     const { options } = params
        //     const limit = options?.limit ?? 99999
        //     const skip = options?.offset ?? 0
        //     const name = options?.where?.name ?? ''
        //     const { records: getTypesRecords } = await txn.run(getBaseTypes, {
        //       limit: int(limit),
        //       name,
        //       skip: int(skip),
        //     })
        //     const totalCountRecord = getTypesRecords[0]?.get('totalCount')
        //     const totalCount = totalCountRecord
        //       ? int(totalCountRecord).toNumber()
        //       : 0
        //     const items = getTypesRecords.map((record) => {
        //       const type = record.get('type').properties
        //       // const owner = record.get('owner').properties
        //       return {
        //         ...type,
        //         __typename: 'BaseType',
        //         // owner,
        //       }
        //     })
        //     return {
        //       items,
        //       totalCount,
        //     }
        //   })
        const descendantTypesIds = (node) => {
            return neo4jService.withReadTransaction(async (txn) => {
                const { records } = await txn.run(getTypeDescendants_cypher_namespaceObject, {
                    this: node.id,
                });
                return records[0]?.get(0) ?? [];
            });
        };
        return {
            AnyType: {
                __resolveType: (type) => type.kind,
            },
            ArrayType: {
                descendantTypesIds,
            },
            IBaseType: {
                __resolveType: (type) => type.kind,
            },
            InterfaceType: {
                descendantTypesIds,
            },
            UnionType: {
                descendantTypesIds,
            },
        };
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/pure-resolvers.ts









const PURE_RESOLVER_PROVIDER = 'PURE_RESOLVER_PROVIDER';
const PureResolverProvider = {
    inject: [TYPE_RESOLVER_PROVIDER],
    provide: PURE_RESOLVER_PROVIDER,
    useFactory: async (typeResolver) => {
        const pureResolvers = (0,merge_.mergeResolvers)([
            appResolver,
            componentResolver,
            atomResolver,
            actionResolver,
            domainResolver,
            elementResolver,
            pageResolver,
            typeResolver,
        ]);
        return pureResolvers;
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/infra/ogm.constant.ts
const OGM_PROVIDER = 'OGM_PROVIDER';

// EXTERNAL MODULE: external "@neo4j/graphql-ogm"
var graphql_ogm_ = __webpack_require__(11);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(17);
;// ../../libs/backend/infra/adapter/neo4j/src/schema/common.schema.ts

const commonSchema = (0,client_.gql) `
  scalar JSON
  scalar JSONObject
`;

// EXTERNAL MODULE: external "graphql-request"
var external_graphql_request_ = __webpack_require__(18);
;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/action.schema.ts

const actionSchema = (0,external_graphql_request_.gql) `
  enum ActionKind {
    """
    Action with custom code
    """
    CodeAction

    """
    Action responsible for fetching data from a resource
    """
    ApiAction
  }

  interface BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @settable(onUpdate: false)
    store: Store! @declareRelationship
    element: Element @declareRelationship
  }

  type CodeAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: CodeAction)
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
    element: Element @relationship(type: "ELEMENT_ACTION", direction: OUT)
    """
    Code to run when action is triggered
    """
    code: String!
  }

  type ApiAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: ApiAction)
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
    element: Element @relationship(type: "ELEMENT_ACTION", direction: OUT)

    """
    Response handlers
    """
    successAction: AnyAction
      @relationship(type: "SUCCESS_ACTION", direction: OUT)
    errorAction: AnyAction @relationship(type: "ERROR_ACTION", direction: OUT)

    """
    Resource to fetch data from
    """
    resource: Resource! @relationship(type: "RESOURCE_ACTION", direction: OUT)
    config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)
  }

  union AnyAction = ApiAction | CodeAction
`;

;// ../../libs/backend/shared/util/src/escape-dot-paths.ts
/**
 * `.` -> `\\.`
 */
const escapeDotPathKeys = (key) => {
    return key.replace(/\./g, '\\\\.');
};

;// ../../libs/shared/abstract/core/src/user/jwt.interface.ts
const JWT_CLAIMS = 'https://api.codelab.app/jwt/claims';

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/user.schema.ts



const rolesPath = escapeDotPathKeys(`${JWT_CLAIMS}.roles`);
/**
 * Validation auth rule to allow read access for regular authenticated user
 */
const allowReadAccess = `
{
  operations: [READ],
  where: {}
}`;
/**
 * Validation auth rule to allow full access for Admin users
 */
const allowFullAccessForAdmin = `
{
  operations: [READ, UPDATE, CREATE, DELETE],
  where: { jwt: { roles_INCLUDES: "Admin" } }
}`;
/**
 * Auth rule to allow full access for Admin users
 */
const allowFullAccessForOwner = `
{
  operations: [UPDATE, CREATE, DELETE],
  where: { node: { owner: { auth0Id: "$jwt.sub" } } }
}
`;
/**
 * Authorization rule to allow Read access for regular users, and full access for Admin and Owner
 */
// export const authOwnerOrAdmin = `
//   @authorization(
//     validate: [
//       ${allowReadAccess}
//       ${allowFullAccessForAdmin}
//       ${allowFullAccessForOwner}
//     ]
//   )
// `
const authOwnerOrAdmin = '';
const userSchema = (0,client_.gql) `
  # https://neo4j.com/docs/graphql/current/authentication-and-authorization/configuration/
  type JWT @jwt {
    roles: [String!]! @jwtClaim(path: "${rolesPath}")
  }

  enum Role {
    User
    Admin
  }

  interface WithOwner {
    owner: User! @declareRelationship
  }

  type User {
    id: ID! @unique @settable(onUpdate: false)
    auth0Id: String! @unique
    email: String! @unique
    username: String! @unique
    types: [IBaseType!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    elements: [Element!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
    atoms: [Atom!]! @relationship(type: "OWNED_BY", direction: IN)
    # Some issue using required array of enum, can't add using []! signature
    # roles: [Role!] @default(value: User)
    roles: [Role!]
    tags: [Tag!]! @relationship(type: "OWNED_BY", direction: IN)
    preferences: Preference @relationship(type: "OWNED_BY", direction: IN)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/app.schema.ts


const appSchema = (0,client_.gql) `
  type App implements WithOwner ${authOwnerOrAdmin} {
    id: ID! @unique @settable(onUpdate: false)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # userId-name format to make it unique across user
    compositeKey: String! @unique
    name: String! @customResolver(requires: "owner { id } compositeKey ")
    slug: String! @customResolver(requires: "owner { id } compositeKey")
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    domains: [Domain!]! @relationship(type: "APP_DOMAIN", direction: IN)
  }
`;

;// ../../libs/shared/infra/gql/src/gql/graphql.ts
var ActionKind;
(function (ActionKind) {
    /** Action responsible for fetching data from a resource */
    ActionKind["ApiAction"] = "ApiAction";
    /** Action with custom code */
    ActionKind["CodeAction"] = "CodeAction";
})(ActionKind || (ActionKind = {}));
var AtomType;
(function (AtomType) {
    AtomType["AntDesignAffix"] = "AntDesignAffix";
    AtomType["AntDesignAlert"] = "AntDesignAlert";
    AtomType["AntDesignAnchor"] = "AntDesignAnchor";
    AtomType["AntDesignAnchorLink"] = "AntDesignAnchorLink";
    AtomType["AntDesignAutoComplete"] = "AntDesignAutoComplete";
    AtomType["AntDesignAvatar"] = "AntDesignAvatar";
    AtomType["AntDesignBackTop"] = "AntDesignBackTop";
    AtomType["AntDesignBadge"] = "AntDesignBadge";
    AtomType["AntDesignBreadcrumb"] = "AntDesignBreadcrumb";
    AtomType["AntDesignBreadcrumbItem"] = "AntDesignBreadcrumbItem";
    AtomType["AntDesignBreadcrumbSeparator"] = "AntDesignBreadcrumbSeparator";
    AtomType["AntDesignButton"] = "AntDesignButton";
    AtomType["AntDesignCalendar"] = "AntDesignCalendar";
    AtomType["AntDesignCard"] = "AntDesignCard";
    AtomType["AntDesignCardGrid"] = "AntDesignCardGrid";
    AtomType["AntDesignCardMeta"] = "AntDesignCardMeta";
    AtomType["AntDesignCarousel"] = "AntDesignCarousel";
    AtomType["AntDesignCascader"] = "AntDesignCascader";
    AtomType["AntDesignCheckbox"] = "AntDesignCheckbox";
    AtomType["AntDesignCheckboxGroup"] = "AntDesignCheckboxGroup";
    AtomType["AntDesignCollapse"] = "AntDesignCollapse";
    AtomType["AntDesignCollapsePanel"] = "AntDesignCollapsePanel";
    AtomType["AntDesignComment"] = "AntDesignComment";
    AtomType["AntDesignConfigProvider"] = "AntDesignConfigProvider";
    AtomType["AntDesignDatePicker"] = "AntDesignDatePicker";
    AtomType["AntDesignDescriptions"] = "AntDesignDescriptions";
    AtomType["AntDesignDescriptionsItem"] = "AntDesignDescriptionsItem";
    AtomType["AntDesignDivider"] = "AntDesignDivider";
    AtomType["AntDesignDrawer"] = "AntDesignDrawer";
    AtomType["AntDesignDropdown"] = "AntDesignDropdown";
    AtomType["AntDesignDropdownButton"] = "AntDesignDropdownButton";
    AtomType["AntDesignEmpty"] = "AntDesignEmpty";
    AtomType["AntDesignForm"] = "AntDesignForm";
    AtomType["AntDesignFormErrorList"] = "AntDesignFormErrorList";
    AtomType["AntDesignFormItem"] = "AntDesignFormItem";
    AtomType["AntDesignFormList"] = "AntDesignFormList";
    AtomType["AntDesignFormProvider"] = "AntDesignFormProvider";
    AtomType["AntDesignGridCol"] = "AntDesignGridCol";
    AtomType["AntDesignGridRow"] = "AntDesignGridRow";
    AtomType["AntDesignIcon"] = "AntDesignIcon";
    AtomType["AntDesignImage"] = "AntDesignImage";
    AtomType["AntDesignInput"] = "AntDesignInput";
    AtomType["AntDesignInputNumber"] = "AntDesignInputNumber";
    AtomType["AntDesignInputSearch"] = "AntDesignInputSearch";
    AtomType["AntDesignInputTextArea"] = "AntDesignInputTextArea";
    AtomType["AntDesignLayout"] = "AntDesignLayout";
    AtomType["AntDesignLayoutContent"] = "AntDesignLayoutContent";
    AtomType["AntDesignLayoutFooter"] = "AntDesignLayoutFooter";
    AtomType["AntDesignLayoutHeader"] = "AntDesignLayoutHeader";
    AtomType["AntDesignLayoutSider"] = "AntDesignLayoutSider";
    AtomType["AntDesignList"] = "AntDesignList";
    AtomType["AntDesignListItem"] = "AntDesignListItem";
    AtomType["AntDesignListItemMeta"] = "AntDesignListItemMeta";
    AtomType["AntDesignMentions"] = "AntDesignMentions";
    AtomType["AntDesignMentionsOption"] = "AntDesignMentionsOption";
    AtomType["AntDesignMenu"] = "AntDesignMenu";
    AtomType["AntDesignMessage"] = "AntDesignMessage";
    AtomType["AntDesignModal"] = "AntDesignModal";
    AtomType["AntDesignNotification"] = "AntDesignNotification";
    AtomType["AntDesignPagination"] = "AntDesignPagination";
    AtomType["AntDesignPopconfirm"] = "AntDesignPopconfirm";
    AtomType["AntDesignPopover"] = "AntDesignPopover";
    AtomType["AntDesignProgress"] = "AntDesignProgress";
    AtomType["AntDesignRadio"] = "AntDesignRadio";
    AtomType["AntDesignRadioGroup"] = "AntDesignRadioGroup";
    AtomType["AntDesignRate"] = "AntDesignRate";
    AtomType["AntDesignResult"] = "AntDesignResult";
    AtomType["AntDesignSegmented"] = "AntDesignSegmented";
    AtomType["AntDesignSelect"] = "AntDesignSelect";
    AtomType["AntDesignSelectOption"] = "AntDesignSelectOption";
    AtomType["AntDesignSkeleton"] = "AntDesignSkeleton";
    AtomType["AntDesignSlider"] = "AntDesignSlider";
    AtomType["AntDesignSpace"] = "AntDesignSpace";
    AtomType["AntDesignSpin"] = "AntDesignSpin";
    AtomType["AntDesignStatistic"] = "AntDesignStatistic";
    AtomType["AntDesignSteps"] = "AntDesignSteps";
    AtomType["AntDesignStepsStep"] = "AntDesignStepsStep";
    AtomType["AntDesignSwitch"] = "AntDesignSwitch";
    AtomType["AntDesignTable"] = "AntDesignTable";
    AtomType["AntDesignTabs"] = "AntDesignTabs";
    AtomType["AntDesignTabsTabPane"] = "AntDesignTabsTabPane";
    AtomType["AntDesignTag"] = "AntDesignTag";
    AtomType["AntDesignTimePicker"] = "AntDesignTimePicker";
    AtomType["AntDesignTimeline"] = "AntDesignTimeline";
    AtomType["AntDesignTimelineItem"] = "AntDesignTimelineItem";
    AtomType["AntDesignTooltip"] = "AntDesignTooltip";
    AtomType["AntDesignTransfer"] = "AntDesignTransfer";
    AtomType["AntDesignTree"] = "AntDesignTree";
    AtomType["AntDesignTreeSelect"] = "AntDesignTreeSelect";
    AtomType["AntDesignTypographyParagraph"] = "AntDesignTypographyParagraph";
    AtomType["AntDesignTypographyText"] = "AntDesignTypographyText";
    AtomType["AntDesignTypographyTitle"] = "AntDesignTypographyTitle";
    AtomType["AntDesignUpload"] = "AntDesignUpload";
    AtomType["ExternalComponent"] = "ExternalComponent";
    AtomType["GridLayout"] = "GridLayout";
    AtomType["HookGraphqlMutation"] = "HookGraphqlMutation";
    AtomType["HookGraphqlQuery"] = "HookGraphqlQuery";
    AtomType["HookQueryConfig"] = "HookQueryConfig";
    AtomType["HookQueryLambda"] = "HookQueryLambda";
    AtomType["HookQueryPage"] = "HookQueryPage";
    AtomType["HookQueryPages"] = "HookQueryPages";
    AtomType["HookRecoilState"] = "HookRecoilState";
    AtomType["HookRouter"] = "HookRouter";
    AtomType["HtmlA"] = "HtmlA";
    AtomType["HtmlAbbr"] = "HtmlAbbr";
    AtomType["HtmlArea"] = "HtmlArea";
    AtomType["HtmlArticle"] = "HtmlArticle";
    AtomType["HtmlAside"] = "HtmlAside";
    AtomType["HtmlAudio"] = "HtmlAudio";
    AtomType["HtmlB"] = "HtmlB";
    AtomType["HtmlBase"] = "HtmlBase";
    AtomType["HtmlBdo"] = "HtmlBdo";
    AtomType["HtmlBlockquote"] = "HtmlBlockquote";
    AtomType["HtmlBr"] = "HtmlBr";
    AtomType["HtmlButton"] = "HtmlButton";
    AtomType["HtmlCanvas"] = "HtmlCanvas";
    AtomType["HtmlCaption"] = "HtmlCaption";
    AtomType["HtmlCite"] = "HtmlCite";
    AtomType["HtmlCode"] = "HtmlCode";
    AtomType["HtmlCol"] = "HtmlCol";
    AtomType["HtmlData"] = "HtmlData";
    AtomType["HtmlDatalist"] = "HtmlDatalist";
    AtomType["HtmlDetails"] = "HtmlDetails";
    AtomType["HtmlDfn"] = "HtmlDfn";
    AtomType["HtmlDialog"] = "HtmlDialog";
    AtomType["HtmlDiv"] = "HtmlDiv";
    AtomType["HtmlDl"] = "HtmlDl";
    AtomType["HtmlEm"] = "HtmlEm";
    AtomType["HtmlEmbed"] = "HtmlEmbed";
    AtomType["HtmlFieldset"] = "HtmlFieldset";
    AtomType["HtmlFooter"] = "HtmlFooter";
    AtomType["HtmlForm"] = "HtmlForm";
    AtomType["HtmlH1"] = "HtmlH1";
    AtomType["HtmlH2"] = "HtmlH2";
    AtomType["HtmlH3"] = "HtmlH3";
    AtomType["HtmlH4"] = "HtmlH4";
    AtomType["HtmlH5"] = "HtmlH5";
    AtomType["HtmlH6"] = "HtmlH6";
    AtomType["HtmlHead"] = "HtmlHead";
    AtomType["HtmlHeader"] = "HtmlHeader";
    AtomType["HtmlHr"] = "HtmlHr";
    AtomType["HtmlI"] = "HtmlI";
    AtomType["HtmlIframe"] = "HtmlIframe";
    AtomType["HtmlImg"] = "HtmlImg";
    AtomType["HtmlInput"] = "HtmlInput";
    AtomType["HtmlKbd"] = "HtmlKbd";
    AtomType["HtmlLabel"] = "HtmlLabel";
    AtomType["HtmlLegend"] = "HtmlLegend";
    AtomType["HtmlLi"] = "HtmlLi";
    AtomType["HtmlLink"] = "HtmlLink";
    AtomType["HtmlMain"] = "HtmlMain";
    AtomType["HtmlMap"] = "HtmlMap";
    AtomType["HtmlMark"] = "HtmlMark";
    AtomType["HtmlMath"] = "HtmlMath";
    AtomType["HtmlMeta"] = "HtmlMeta";
    AtomType["HtmlMeter"] = "HtmlMeter";
    AtomType["HtmlNav"] = "HtmlNav";
    AtomType["HtmlNoscript"] = "HtmlNoscript";
    AtomType["HtmlObject"] = "HtmlObject";
    AtomType["HtmlOl"] = "HtmlOl";
    AtomType["HtmlOptgroup"] = "HtmlOptgroup";
    AtomType["HtmlOption"] = "HtmlOption";
    AtomType["HtmlOutput"] = "HtmlOutput";
    AtomType["HtmlP"] = "HtmlP";
    AtomType["HtmlParam"] = "HtmlParam";
    AtomType["HtmlPicture"] = "HtmlPicture";
    AtomType["HtmlPre"] = "HtmlPre";
    AtomType["HtmlProgress"] = "HtmlProgress";
    AtomType["HtmlQ"] = "HtmlQ";
    AtomType["HtmlRuby"] = "HtmlRuby";
    AtomType["HtmlS"] = "HtmlS";
    AtomType["HtmlSamp"] = "HtmlSamp";
    AtomType["HtmlScript"] = "HtmlScript";
    AtomType["HtmlSection"] = "HtmlSection";
    AtomType["HtmlSelect"] = "HtmlSelect";
    AtomType["HtmlSmall"] = "HtmlSmall";
    AtomType["HtmlSource"] = "HtmlSource";
    AtomType["HtmlSpan"] = "HtmlSpan";
    AtomType["HtmlStrong"] = "HtmlStrong";
    AtomType["HtmlStyle"] = "HtmlStyle";
    AtomType["HtmlSub"] = "HtmlSub";
    AtomType["HtmlSup"] = "HtmlSup";
    AtomType["HtmlSvg"] = "HtmlSvg";
    AtomType["HtmlTable"] = "HtmlTable";
    AtomType["HtmlTd"] = "HtmlTd";
    AtomType["HtmlTemplate"] = "HtmlTemplate";
    AtomType["HtmlTextarea"] = "HtmlTextarea";
    AtomType["HtmlTh"] = "HtmlTh";
    AtomType["HtmlTime"] = "HtmlTime";
    AtomType["HtmlTitle"] = "HtmlTitle";
    AtomType["HtmlTr"] = "HtmlTr";
    AtomType["HtmlTrack"] = "HtmlTrack";
    AtomType["HtmlU"] = "HtmlU";
    AtomType["HtmlUl"] = "HtmlUl";
    AtomType["HtmlVar"] = "HtmlVar";
    AtomType["HtmlVideo"] = "HtmlVideo";
    AtomType["HtmlWbr"] = "HtmlWbr";
    AtomType["LexicalEditor"] = "LexicalEditor";
    AtomType["MuiAccordion"] = "MuiAccordion";
    AtomType["MuiAccordionActions"] = "MuiAccordionActions";
    AtomType["MuiAccordionDetails"] = "MuiAccordionDetails";
    AtomType["MuiAccordionSummary"] = "MuiAccordionSummary";
    AtomType["MuiAlert"] = "MuiAlert";
    AtomType["MuiAlertTitle"] = "MuiAlertTitle";
    AtomType["MuiAppBar"] = "MuiAppBar";
    AtomType["MuiAutocomplete"] = "MuiAutocomplete";
    AtomType["MuiAvatar"] = "MuiAvatar";
    AtomType["MuiAvatarGroup"] = "MuiAvatarGroup";
    AtomType["MuiBackdrop"] = "MuiBackdrop";
    AtomType["MuiBadge"] = "MuiBadge";
    AtomType["MuiBadgeUnstyled"] = "MuiBadgeUnstyled";
    AtomType["MuiBottomNavigation"] = "MuiBottomNavigation";
    AtomType["MuiBottomNavigationAction"] = "MuiBottomNavigationAction";
    AtomType["MuiBox"] = "MuiBox";
    AtomType["MuiBreadcrumbs"] = "MuiBreadcrumbs";
    AtomType["MuiButton"] = "MuiButton";
    AtomType["MuiButtonBase"] = "MuiButtonBase";
    AtomType["MuiButtonGroup"] = "MuiButtonGroup";
    AtomType["MuiButtonUnstyled"] = "MuiButtonUnstyled";
    AtomType["MuiCalendarPicker"] = "MuiCalendarPicker";
    AtomType["MuiCalendarPickerSkeleton"] = "MuiCalendarPickerSkeleton";
    AtomType["MuiCard"] = "MuiCard";
    AtomType["MuiCardActionArea"] = "MuiCardActionArea";
    AtomType["MuiCardActions"] = "MuiCardActions";
    AtomType["MuiCardContent"] = "MuiCardContent";
    AtomType["MuiCardHeader"] = "MuiCardHeader";
    AtomType["MuiCardMedia"] = "MuiCardMedia";
    AtomType["MuiCheckbox"] = "MuiCheckbox";
    AtomType["MuiChip"] = "MuiChip";
    AtomType["MuiCircularProgress"] = "MuiCircularProgress";
    AtomType["MuiClickAwayListener"] = "MuiClickAwayListener";
    AtomType["MuiClockPicker"] = "MuiClockPicker";
    AtomType["MuiCollapse"] = "MuiCollapse";
    AtomType["MuiContainer"] = "MuiContainer";
    AtomType["MuiCssBaseline"] = "MuiCssBaseline";
    AtomType["MuiDataGrid"] = "MuiDataGrid";
    AtomType["MuiDatePicker"] = "MuiDatePicker";
    AtomType["MuiDateRangePicker"] = "MuiDateRangePicker";
    AtomType["MuiDateRangePickerDay"] = "MuiDateRangePickerDay";
    AtomType["MuiDateTimePicker"] = "MuiDateTimePicker";
    AtomType["MuiDesktopDatePicker"] = "MuiDesktopDatePicker";
    AtomType["MuiDesktopDateRangePicker"] = "MuiDesktopDateRangePicker";
    AtomType["MuiDesktopDateTimePicker"] = "MuiDesktopDateTimePicker";
    AtomType["MuiDesktopTimePicker"] = "MuiDesktopTimePicker";
    AtomType["MuiDialog"] = "MuiDialog";
    AtomType["MuiDialogActions"] = "MuiDialogActions";
    AtomType["MuiDialogContent"] = "MuiDialogContent";
    AtomType["MuiDialogContentText"] = "MuiDialogContentText";
    AtomType["MuiDialogTitle"] = "MuiDialogTitle";
    AtomType["MuiDivider"] = "MuiDivider";
    AtomType["MuiDrawer"] = "MuiDrawer";
    AtomType["MuiFab"] = "MuiFab";
    AtomType["MuiFade"] = "MuiFade";
    AtomType["MuiFilledInput"] = "MuiFilledInput";
    AtomType["MuiFormControl"] = "MuiFormControl";
    AtomType["MuiFormControlLabel"] = "MuiFormControlLabel";
    AtomType["MuiFormControlUnstyled"] = "MuiFormControlUnstyled";
    AtomType["MuiFormGroup"] = "MuiFormGroup";
    AtomType["MuiFormHelperText"] = "MuiFormHelperText";
    AtomType["MuiFormLabel"] = "MuiFormLabel";
    AtomType["MuiGlobalStyles"] = "MuiGlobalStyles";
    AtomType["MuiGrid"] = "MuiGrid";
    AtomType["MuiGridColDef"] = "MuiGridColDef";
    AtomType["MuiGrow"] = "MuiGrow";
    AtomType["MuiHidden"] = "MuiHidden";
    AtomType["MuiIcon"] = "MuiIcon";
    AtomType["MuiIconButton"] = "MuiIconButton";
    AtomType["MuiImageList"] = "MuiImageList";
    AtomType["MuiImageListItem"] = "MuiImageListItem";
    AtomType["MuiImageListItemBar"] = "MuiImageListItemBar";
    AtomType["MuiInput"] = "MuiInput";
    AtomType["MuiInputAdornment"] = "MuiInputAdornment";
    AtomType["MuiInputBase"] = "MuiInputBase";
    AtomType["MuiInputLabel"] = "MuiInputLabel";
    AtomType["MuiLinearProgress"] = "MuiLinearProgress";
    AtomType["MuiLink"] = "MuiLink";
    AtomType["MuiList"] = "MuiList";
    AtomType["MuiListItem"] = "MuiListItem";
    AtomType["MuiListItemAvatar"] = "MuiListItemAvatar";
    AtomType["MuiListItemButton"] = "MuiListItemButton";
    AtomType["MuiListItemIcon"] = "MuiListItemIcon";
    AtomType["MuiListItemSecondaryAction"] = "MuiListItemSecondaryAction";
    AtomType["MuiListItemText"] = "MuiListItemText";
    AtomType["MuiListSubheader"] = "MuiListSubheader";
    AtomType["MuiLoadingButton"] = "MuiLoadingButton";
    AtomType["MuiMasonry"] = "MuiMasonry";
    AtomType["MuiMasonryItem"] = "MuiMasonryItem";
    AtomType["MuiMenu"] = "MuiMenu";
    AtomType["MuiMenuItem"] = "MuiMenuItem";
    AtomType["MuiMenuList"] = "MuiMenuList";
    AtomType["MuiMobileDatePicker"] = "MuiMobileDatePicker";
    AtomType["MuiMobileDateRangePicker"] = "MuiMobileDateRangePicker";
    AtomType["MuiMobileDateTimePicker"] = "MuiMobileDateTimePicker";
    AtomType["MuiMobileStepper"] = "MuiMobileStepper";
    AtomType["MuiMobileTimePicker"] = "MuiMobileTimePicker";
    AtomType["MuiModal"] = "MuiModal";
    AtomType["MuiModalUnstyled"] = "MuiModalUnstyled";
    AtomType["MuiMonthPicker"] = "MuiMonthPicker";
    AtomType["MuiNativeSelect"] = "MuiNativeSelect";
    AtomType["MuiNoSsr"] = "MuiNoSsr";
    AtomType["MuiOutlinedInput"] = "MuiOutlinedInput";
    AtomType["MuiPagination"] = "MuiPagination";
    AtomType["MuiPaginationItem"] = "MuiPaginationItem";
    AtomType["MuiPaper"] = "MuiPaper";
    AtomType["MuiPickersDay"] = "MuiPickersDay";
    AtomType["MuiPopover"] = "MuiPopover";
    AtomType["MuiPopper"] = "MuiPopper";
    AtomType["MuiPortal"] = "MuiPortal";
    AtomType["MuiRadio"] = "MuiRadio";
    AtomType["MuiRadioGroup"] = "MuiRadioGroup";
    AtomType["MuiRating"] = "MuiRating";
    AtomType["MuiScopedCssBaseline"] = "MuiScopedCssBaseline";
    AtomType["MuiSelect"] = "MuiSelect";
    AtomType["MuiSkeleton"] = "MuiSkeleton";
    AtomType["MuiSlide"] = "MuiSlide";
    AtomType["MuiSlider"] = "MuiSlider";
    AtomType["MuiSliderUnstyled"] = "MuiSliderUnstyled";
    AtomType["MuiSnackbar"] = "MuiSnackbar";
    AtomType["MuiSnackbarContent"] = "MuiSnackbarContent";
    AtomType["MuiSpeedDial"] = "MuiSpeedDial";
    AtomType["MuiSpeedDialAction"] = "MuiSpeedDialAction";
    AtomType["MuiSpeedDialIcon"] = "MuiSpeedDialIcon";
    AtomType["MuiStack"] = "MuiStack";
    AtomType["MuiStaticDatePicker"] = "MuiStaticDatePicker";
    AtomType["MuiStaticDateRangePicker"] = "MuiStaticDateRangePicker";
    AtomType["MuiStaticDateTimePicker"] = "MuiStaticDateTimePicker";
    AtomType["MuiStaticTimePicker"] = "MuiStaticTimePicker";
    AtomType["MuiStep"] = "MuiStep";
    AtomType["MuiStepButton"] = "MuiStepButton";
    AtomType["MuiStepConnector"] = "MuiStepConnector";
    AtomType["MuiStepContent"] = "MuiStepContent";
    AtomType["MuiStepIcon"] = "MuiStepIcon";
    AtomType["MuiStepLabel"] = "MuiStepLabel";
    AtomType["MuiStepper"] = "MuiStepper";
    AtomType["MuiSvgIcon"] = "MuiSvgIcon";
    AtomType["MuiSwipeableDrawer"] = "MuiSwipeableDrawer";
    AtomType["MuiSwitch"] = "MuiSwitch";
    AtomType["MuiSwitchUnstyled"] = "MuiSwitchUnstyled";
    AtomType["MuiTab"] = "MuiTab";
    AtomType["MuiTabContext"] = "MuiTabContext";
    AtomType["MuiTabList"] = "MuiTabList";
    AtomType["MuiTabPanel"] = "MuiTabPanel";
    AtomType["MuiTabScrollButton"] = "MuiTabScrollButton";
    AtomType["MuiTable"] = "MuiTable";
    AtomType["MuiTableBody"] = "MuiTableBody";
    AtomType["MuiTableCell"] = "MuiTableCell";
    AtomType["MuiTableContainer"] = "MuiTableContainer";
    AtomType["MuiTableFooter"] = "MuiTableFooter";
    AtomType["MuiTableHead"] = "MuiTableHead";
    AtomType["MuiTablePagination"] = "MuiTablePagination";
    AtomType["MuiTableRow"] = "MuiTableRow";
    AtomType["MuiTableSortLabel"] = "MuiTableSortLabel";
    AtomType["MuiTabs"] = "MuiTabs";
    AtomType["MuiTextField"] = "MuiTextField";
    AtomType["MuiTextareaAutosize"] = "MuiTextareaAutosize";
    AtomType["MuiTimePicker"] = "MuiTimePicker";
    AtomType["MuiTimeline"] = "MuiTimeline";
    AtomType["MuiTimelineConnector"] = "MuiTimelineConnector";
    AtomType["MuiTimelineContent"] = "MuiTimelineContent";
    AtomType["MuiTimelineDot"] = "MuiTimelineDot";
    AtomType["MuiTimelineItem"] = "MuiTimelineItem";
    AtomType["MuiTimelineOppositeContent"] = "MuiTimelineOppositeContent";
    AtomType["MuiTimelineSeparator"] = "MuiTimelineSeparator";
    AtomType["MuiToggleButton"] = "MuiToggleButton";
    AtomType["MuiToggleButtonGroup"] = "MuiToggleButtonGroup";
    AtomType["MuiToolbar"] = "MuiToolbar";
    AtomType["MuiTooltip"] = "MuiTooltip";
    AtomType["MuiTreeItem"] = "MuiTreeItem";
    AtomType["MuiTreeView"] = "MuiTreeView";
    AtomType["MuiTypography"] = "MuiTypography";
    AtomType["MuiUnstableTrapFocus"] = "MuiUnstableTrapFocus";
    AtomType["MuiYearPicker"] = "MuiYearPicker";
    AtomType["MuiZoom"] = "MuiZoom";
    AtomType["NextLink"] = "NextLink";
    AtomType["Query"] = "Query";
    AtomType["ReactFragment"] = "ReactFragment";
    AtomType["Script"] = "Script";
    AtomType["State"] = "State";
    AtomType["Text"] = "Text";
    AtomType["TextList"] = "TextList";
})(AtomType || (AtomType = {}));
var BaseActionImplementation;
(function (BaseActionImplementation) {
    BaseActionImplementation["ApiAction"] = "ApiAction";
    BaseActionImplementation["CodeAction"] = "CodeAction";
})(BaseActionImplementation || (BaseActionImplementation = {}));
var BreakpointType;
(function (BreakpointType) {
    BreakpointType["Desktop"] = "Desktop";
    BreakpointType["MobileLandscape"] = "MobileLandscape";
    BreakpointType["MobilePortrait"] = "MobilePortrait";
    BreakpointType["Tablet"] = "Tablet";
})(BreakpointType || (BreakpointType = {}));
var CodeMirrorLanguage;
(function (CodeMirrorLanguage) {
    CodeMirrorLanguage["Css"] = "Css";
    CodeMirrorLanguage["CssInJs"] = "CssInJs";
    CodeMirrorLanguage["Graphql"] = "Graphql";
    CodeMirrorLanguage["Javascript"] = "Javascript";
    CodeMirrorLanguage["Json"] = "Json";
    CodeMirrorLanguage["Typescript"] = "Typescript";
})(CodeMirrorLanguage || (CodeMirrorLanguage = {}));
var ElementTypeKind;
(function (ElementTypeKind) {
    ElementTypeKind["AllElements"] = "AllElements";
    ElementTypeKind["ChildrenOnly"] = "ChildrenOnly";
    ElementTypeKind["DescendantsOnly"] = "DescendantsOnly";
    ElementTypeKind["ExcludeDescendantsElements"] = "ExcludeDescendantsElements";
})(ElementTypeKind || (ElementTypeKind = {}));
var EventType;
(function (EventType) {
    EventType["Create"] = "CREATE";
    EventType["CreateRelationship"] = "CREATE_RELATIONSHIP";
    EventType["Delete"] = "DELETE";
    EventType["DeleteRelationship"] = "DELETE_RELATIONSHIP";
    EventType["Update"] = "UPDATE";
})(EventType || (EventType = {}));
var IBaseTypeImplementation;
(function (IBaseTypeImplementation) {
    IBaseTypeImplementation["ActionType"] = "ActionType";
    IBaseTypeImplementation["AppType"] = "AppType";
    IBaseTypeImplementation["ArrayType"] = "ArrayType";
    IBaseTypeImplementation["CodeMirrorType"] = "CodeMirrorType";
    IBaseTypeImplementation["ElementType"] = "ElementType";
    IBaseTypeImplementation["EnumType"] = "EnumType";
    IBaseTypeImplementation["InterfaceType"] = "InterfaceType";
    IBaseTypeImplementation["LambdaType"] = "LambdaType";
    IBaseTypeImplementation["PageType"] = "PageType";
    IBaseTypeImplementation["PrimitiveType"] = "PrimitiveType";
    IBaseTypeImplementation["ReactNodeType"] = "ReactNodeType";
    IBaseTypeImplementation["RenderPropType"] = "RenderPropType";
    IBaseTypeImplementation["RichTextType"] = "RichTextType";
    IBaseTypeImplementation["UnionType"] = "UnionType";
})(IBaseTypeImplementation || (IBaseTypeImplementation = {}));
var PageKind;
(function (PageKind) {
    PageKind["InternalServerError"] = "InternalServerError";
    PageKind["NotFound"] = "NotFound";
    PageKind["Provider"] = "Provider";
    PageKind["Regular"] = "Regular";
})(PageKind || (PageKind = {}));
var PrimitiveTypeKind;
(function (PrimitiveTypeKind) {
    PrimitiveTypeKind["Boolean"] = "Boolean";
    PrimitiveTypeKind["Integer"] = "Integer";
    PrimitiveTypeKind["Number"] = "Number";
    PrimitiveTypeKind["String"] = "String";
})(PrimitiveTypeKind || (PrimitiveTypeKind = {}));
var RedirectTargetType;
(function (RedirectTargetType) {
    /** Redirect to a page in the same app */
    RedirectTargetType["Page"] = "Page";
    /** Redirect responsible for fetching data from a resource */
    RedirectTargetType["Url"] = "Url";
})(RedirectTargetType || (RedirectTargetType = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["GraphQl"] = "GraphQl";
    ResourceType["Rest"] = "Rest";
})(ResourceType || (ResourceType = {}));
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["User"] = "User";
})(Role || (Role = {}));
/** An enum for sorting in either ascending or descending order. */
var SortDirection;
(function (SortDirection) {
    /** Sort by field values in ascending order. */
    SortDirection["Asc"] = "ASC";
    /** Sort by field values in descending order. */
    SortDirection["Desc"] = "DESC";
})(SortDirection || (SortDirection = {}));
var TypeKind;
(function (TypeKind) {
    TypeKind["ActionType"] = "ActionType";
    TypeKind["AppType"] = "AppType";
    TypeKind["ArrayType"] = "ArrayType";
    TypeKind["CodeMirrorType"] = "CodeMirrorType";
    TypeKind["ElementType"] = "ElementType";
    TypeKind["EnumType"] = "EnumType";
    TypeKind["InterfaceType"] = "InterfaceType";
    TypeKind["LambdaType"] = "LambdaType";
    TypeKind["PageType"] = "PageType";
    TypeKind["PrimitiveType"] = "PrimitiveType";
    TypeKind["ReactNodeType"] = "ReactNodeType";
    TypeKind["RenderPropType"] = "RenderPropType";
    TypeKind["RichTextType"] = "RichTextType";
    TypeKind["UnionType"] = "UnionType";
})(TypeKind || (TypeKind = {}));
var WithDescendantsImplementation;
(function (WithDescendantsImplementation) {
    WithDescendantsImplementation["ArrayType"] = "ArrayType";
    WithDescendantsImplementation["InterfaceType"] = "InterfaceType";
    WithDescendantsImplementation["UnionType"] = "UnionType";
})(WithDescendantsImplementation || (WithDescendantsImplementation = {}));
var WithOwnerImplementation;
(function (WithOwnerImplementation) {
    WithOwnerImplementation["App"] = "App";
    WithOwnerImplementation["Atom"] = "Atom";
    WithOwnerImplementation["AuthGuard"] = "AuthGuard";
    WithOwnerImplementation["Component"] = "Component";
    WithOwnerImplementation["Preference"] = "Preference";
    WithOwnerImplementation["Resource"] = "Resource";
    WithOwnerImplementation["Tag"] = "Tag";
})(WithOwnerImplementation || (WithOwnerImplementation = {}));
class TypedDocumentString extends String {
    constructor(value, __meta__) {
        super(value);
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
        });
        Object.defineProperty(this, "__meta__", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: __meta__
        });
        Object.defineProperty(this, "__apiType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    toString() {
        return this.value;
    }
}
const DomainFragmentDoc = new TypedDocumentString(`
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
    `, { fragmentName: 'Domain' });
const OwnerFragmentDoc = new TypedDocumentString(`
    fragment Owner on User {
  id
}
    `, { fragmentName: 'Owner' });
const PagePreviewFragmentDoc = new TypedDocumentString(`
    fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
    `, { fragmentName: 'PagePreview' });
const AppPreviewFragmentDoc = new TypedDocumentString(`
    fragment AppPreview on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...PagePreview
  }
  slug
}
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Owner on User {
  id
}`, { fragmentName: 'AppPreview' });
const BaseTypeFragmentDoc = new TypedDocumentString(`
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
    `, { fragmentName: 'BaseType' });
const ActionTypeFragmentDoc = new TypedDocumentString(`
    fragment ActionType on ActionType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'ActionType' });
const AppTypeFragmentDoc = new TypedDocumentString(`
    fragment AppType on AppType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'AppType' });
const ArrayTypeFragmentDoc = new TypedDocumentString(`
    fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'ArrayType' });
const CodeMirrorTypeFragmentDoc = new TypedDocumentString(`
    fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'CodeMirrorType' });
const ElementTypeFragmentDoc = new TypedDocumentString(`
    fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'ElementType' });
const EnumTypeValueFragmentDoc = new TypedDocumentString(`
    fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
    `, { fragmentName: 'EnumTypeValue' });
const EnumTypeFragmentDoc = new TypedDocumentString(`
    fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}`, { fragmentName: 'EnumType' });
const FieldFragmentDoc = new TypedDocumentString(`
    fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
    `, { fragmentName: 'Field' });
const InterfaceTypeFragmentDoc = new TypedDocumentString(`
    fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}`, { fragmentName: 'InterfaceType' });
const LambdaTypeFragmentDoc = new TypedDocumentString(`
    fragment LambdaType on LambdaType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'LambdaType' });
const PageTypeFragmentDoc = new TypedDocumentString(`
    fragment PageType on PageType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'PageType' });
const PrimitiveTypeFragmentDoc = new TypedDocumentString(`
    fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'PrimitiveType' });
const ReactNodeTypeFragmentDoc = new TypedDocumentString(`
    fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'ReactNodeType' });
const RenderPropTypeFragmentDoc = new TypedDocumentString(`
    fragment RenderPropType on RenderPropType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'RenderPropType' });
const RichTextTypeFragmentDoc = new TypedDocumentString(`
    fragment RichTextType on RichTextType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'RichTextType' });
const UnionTypeFragmentDoc = new TypedDocumentString(`
    fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: 'UnionType' });
const TypeFragmentDoc = new TypedDocumentString(`
    fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: 'Type' });
const PropFragmentDoc = new TypedDocumentString(`
    fragment Prop on Prop {
  data
  id
}
    `, { fragmentName: 'Prop' });
const TagPreviewFragmentDoc = new TypedDocumentString(`
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
    `, { fragmentName: 'TagPreview' });
const AtomBuilderFragmentDoc = new TypedDocumentString(`
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: 'AtomBuilder' });
const ElementFragmentDoc = new TypedDocumentString(`
    fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Prop on Prop {
  data
  id
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: 'Element' });
const BaseActionFragmentDoc = new TypedDocumentString(`
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
    `, { fragmentName: 'BaseAction' });
const CodeActionFragmentDoc = new TypedDocumentString(`
    fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}`, { fragmentName: 'CodeAction' });
const ResourceFragmentDoc = new TypedDocumentString(`
    fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
    fragment Prop on Prop {
  data
  id
}`, { fragmentName: 'Resource' });
const ApiActionFragmentDoc = new TypedDocumentString(`
    fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: 'ApiAction' });
const ActionFragmentDoc = new TypedDocumentString(`
    fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: 'Action' });
const StoreFragmentDoc = new TypedDocumentString(`
    fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: 'Store' });
const PageFragmentDoc = new TypedDocumentString(`
    fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: 'Page' });
const AppFragmentDoc = new TypedDocumentString(`
    fragment App on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...Page
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: 'App' });
const PageDevelopmentFragmentDoc = new TypedDocumentString(`
    fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: 'PageDevelopment' });
const AppBuilderFragmentDoc = new TypedDocumentString(`
    fragment AppBuilder on App {
  id
  name
  owner {
    ...Owner
  }
  pages(
    where: {OR: [{id_IN: $pageIds}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}
  ) {
    ...PageDevelopment
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: 'AppBuilder' });
const AtomProductionFragmentDoc = new TypedDocumentString(`
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
    `, { fragmentName: 'AtomProduction' });
const ElementProductionFragmentDoc = new TypedDocumentString(`
    fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomProduction
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
}
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment Prop on Prop {
  data
  id
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: 'ElementProduction' });
const PageProductionFragmentDoc = new TypedDocumentString(`
    fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomProduction
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: 'PageProduction' });
const AppProductionFragmentDoc = new TypedDocumentString(`
    fragment AppProduction on App {
  id
  name
  owner {
    ...Owner
  }
  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {
    ...PageProduction
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomProduction
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
}
fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: 'AppProduction' });
const AtomFragmentDoc = new TypedDocumentString(`
    fragment Atom on Atom {
  __typename
  api {
    ...InterfaceType
  }
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: 'Atom' });
const AuthGuardFragmentDoc = new TypedDocumentString(`
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
    fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: 'AuthGuard' });
const ComponentFragmentDoc = new TypedDocumentString(`
    fragment Component on Component {
  __typename
  api {
    id
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`, { fragmentName: 'Component' });
const ComponentBuilderFragmentDoc = new TypedDocumentString(`
    fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: 'ComponentBuilder' });
const ComponentProductionFragmentDoc = new TypedDocumentString(`
    fragment ComponentProduction on Component {
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`, { fragmentName: 'ComponentProduction' });
const HookPropFragmentDoc = new TypedDocumentString(`
    fragment HookProp on Prop {
  data
  id
}
    `, { fragmentName: 'HookProp' });
const HookFragmentDoc = new TypedDocumentString(`
    fragment Hook on Hook {
  config {
    ...HookProp
  }
  element {
    id
    name
  }
  id
  type
}
    fragment HookProp on Prop {
  data
  id
}`, { fragmentName: 'Hook' });
const RedirectFragmentDoc = new TypedDocumentString(`
    fragment Redirect on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}
    `, { fragmentName: 'Redirect' });
const ProductionStoreFragmentDoc = new TypedDocumentString(`
    fragment ProductionStore on Store {
  actions {
    ...Action
  }
  id
  name
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: 'ProductionStore' });
const TagFragmentDoc = new TypedDocumentString(`
    fragment Tag on Tag {
  children {
    id
    name
    owner {
      id
    }
  }
  descendants {
    id
    name
  }
  id
  name
  owner {
    id
  }
  parent {
    id
  }
}
    `, { fragmentName: 'Tag' });
const PreferenceFragmentDoc = new TypedDocumentString(`
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  owner {
    id
  }
}
    `, { fragmentName: 'Preference' });
const UserFragmentDoc = new TypedDocumentString(`
    fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences {
    ...Preference
  }
  roles
  username
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  owner {
    id
  }
}`, { fragmentName: 'User' });
const DomainCreatedDocument = new TypedDocumentString(`
    subscription DomainCreated {
  domainCreated {
    createdDomain {
      id
      name
    }
    event
    timestamp
  }
}
    `);
const DomainUpdatedDocument = new TypedDocumentString(`
    subscription DomainUpdated {
  domainUpdated {
    event
    timestamp
    updatedDomain {
      id
      name
    }
  }
}
    `);
const DomainDeletedDocument = new TypedDocumentString(`
    subscription DomainDeleted {
  domainDeleted {
    deletedDomain {
      id
      name
    }
    event
    timestamp
  }
}
    `);
const GetAppBuilderDocument = new TypedDocumentString(`
    query GetAppBuilder($appId: ID!, $pageIds: [ID!]) {
  actionTypes {
    ...ActionType
  }
  apps(where: {id: $appId}) {
    ...AppBuilder
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomBuilder
  }
  authGuards {
    ...AuthGuard
  }
  codeMirrorTypes {
    ...CodeMirrorType
  }
  components {
    ...ComponentBuilder
  }
  primitiveTypes {
    ...PrimitiveType
  }
  reactNodeTypes {
    ...ReactNodeType
  }
  redirects(where: {source: {app: {id: $appId}}}) {
    ...Redirect
  }
  renderPropTypes {
    ...RenderPropType
  }
  resources {
    ...Resource
  }
  richTextTypes {
    ...RichTextType
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AppBuilder on App {
  id
  name
  owner {
    ...Owner
  }
  pages(
    where: {OR: [{id_IN: $pageIds}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}
  ) {
    ...PageDevelopment
  }
  slug
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Redirect on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
const GetSelectAtomOptionsDocument = new TypedDocumentString(`
    query GetSelectAtomOptions {
  atoms {
    __typename
    id
    name
    requiredParents {
      id
      type
    }
    type
  }
}
    `);
const GetAuthGuardsDocument = new TypedDocumentString(`
    query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {
  aggregate: authGuardsAggregate(where: $where) {
    count
  }
  items: authGuards(options: $options, where: $where) {
    ...AuthGuard
  }
}
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`);
const CreateAuthGuardsDocument = new TypedDocumentString(`
    mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {
  createAuthGuards(input: $input) {
    authGuards {
      id
    }
  }
}
    `);
const UpdateAuthGuardDocument = new TypedDocumentString(`
    mutation UpdateAuthGuard($where: AuthGuardWhere, $update: AuthGuardUpdateInput) {
  updateAuthGuards(update: $update, where: $where) {
    authGuards {
      id
    }
  }
}
    `);
const DeleteAuthGuardsDocument = new TypedDocumentString(`
    mutation DeleteAuthGuards($where: AuthGuardWhere, $delete: AuthGuardDeleteInput) {
  deleteAuthGuards(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
const GetComponentBuilderDocument = new TypedDocumentString(`
    query GetComponentBuilder {
  actionTypes {
    ...ActionType
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomBuilder
  }
  codeMirrorTypes {
    ...CodeMirrorType
  }
  components {
    ...ComponentBuilder
  }
  primitiveTypes {
    ...PrimitiveType
  }
  reactNodeTypes {
    ...ReactNodeType
  }
  renderPropTypes {
    ...RenderPropType
  }
  resources {
    ...Resource
  }
  richTextTypes {
    ...RichTextType
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
const CreateComponentsDocument = new TypedDocumentString(`
    mutation CreateComponents($input: [ComponentCreateInput!]!) {
  createComponents(input: $input) {
    components {
      id
      store {
        id
      }
    }
  }
}
    `);
const DeleteComponentsDocument = new TypedDocumentString(`
    mutation DeleteComponents($where: ComponentWhere, $delete: ComponentDeleteInput) {
  deleteComponents(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
const UpdateComponentsDocument = new TypedDocumentString(`
    mutation UpdateComponents($where: ComponentWhere, $update: ComponentUpdateInput) {
  updateComponents(update: $update, where: $where) {
    components {
      id
    }
  }
}
    `);
const ComponentListDocument = new TypedDocumentString(`
    query ComponentList($options: ComponentOptions, $where: ComponentWhere) {
  aggregate: componentsAggregate(where: $where) {
    count
  }
  items: components(options: $options, where: $where) {
    ...Component
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Component on Component {
  __typename
  api {
    id
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`);
const DomainListDocument = new TypedDocumentString(`
    query DomainList($options: DomainOptions, $where: DomainWhere) {
  aggregate: domainsAggregate(where: $where) {
    count
  }
  items: domains(options: $options, where: $where) {
    ...Domain
  }
}
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}`);
const CreateDomainsDocument = new TypedDocumentString(`
    mutation CreateDomains($input: [DomainCreateInput!]!) {
  createDomains(input: $input) {
    domains {
      id
    }
  }
}
    `);
const UpdateDomainsDocument = new TypedDocumentString(`
    mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
  updateDomains(update: $update, where: $where) {
    domains {
      id
    }
  }
}
    `);
const DeleteDomainsDocument = new TypedDocumentString(`
    mutation DeleteDomains($where: DomainWhere!) {
  deleteDomains(where: $where) {
    nodesDeleted
  }
}
    `);
const CreateElementsDocument = new TypedDocumentString(`
    mutation CreateElements($input: [ElementCreateInput!]!) {
  createElements(input: $input) {
    elements {
      id
    }
  }
}
    `);
const DeleteElementsDocument = new TypedDocumentString(`
    mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
  deleteElements(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
const UpdateElementsDocument = new TypedDocumentString(`
    mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
  updateElements(update: $update, where: $where) {
    elements {
      id
    }
  }
}
    `);
const ElementListDocument = new TypedDocumentString(`
    query ElementList($options: ElementOptions, $where: ElementWhere) {
  aggregate: elementsAggregate(where: $where) {
    count
  }
  items: elements(options: $options, where: $where) {
    ...Element
  }
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Prop on Prop {
  data
  id
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const CreateHooksDocument = new TypedDocumentString(`
    mutation CreateHooks($input: [HookCreateInput!]!) {
  createHooks(input: $input) {
    hooks {
      ...Hook
    }
  }
}
    fragment HookProp on Prop {
  data
  id
}
fragment Hook on Hook {
  config {
    ...HookProp
  }
  element {
    id
    name
  }
  id
  type
}`);
const DeleteHooksDocument = new TypedDocumentString(`
    mutation DeleteHooks($where: HookWhere!) {
  deleteHooks(where: $where) {
    nodesDeleted
  }
}
    `);
const CreatePagesDocument = new TypedDocumentString(`
    mutation CreatePages($input: [PageCreateInput!]!) {
  createPages(input: $input) {
    pages {
      id
    }
  }
}
    `);
const DeletePagesDocument = new TypedDocumentString(`
    mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
  deletePages(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
const UpdatePagesDocument = new TypedDocumentString(`
    mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
  updatePages(update: $update, where: $where) {
    pages {
      id
    }
  }
}
    `);
const PageListDocument = new TypedDocumentString(`
    query PageList($options: PageOptions, $where: PageWhere) {
  aggregate: pagesAggregate(where: $where) {
    count
  }
  items: pages(options: $options, where: $where) {
    ...Page
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetRenderedPageDocument = new TypedDocumentString(`
    query GetRenderedPage($pageId: ID!) {
  pages(where: {id: $pageId}) {
    ...PageDevelopment
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const CreatePreferencesDocument = new TypedDocumentString(`
    mutation CreatePreferences($input: [PreferenceCreateInput!]!) {
  createPreferences(input: $input) {
    info {
      nodesCreated
      relationshipsCreated
    }
    preferences {
      id
    }
  }
}
    `);
const DeletePreferencesDocument = new TypedDocumentString(`
    mutation DeletePreferences($where: PreferenceWhere, $delete: PreferenceDeleteInput) {
  deletePreferences(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
const GetPreferencesDocument = new TypedDocumentString(`
    query GetPreferences($where: PreferenceWhere, $options: PreferenceOptions) {
  aggregate: preferencesAggregate(where: $where) {
    count
  }
  items: preferences(options: $options, where: $where) {
    ...Preference
  }
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  owner {
    id
  }
}`);
const UpdatePreferencesDocument = new TypedDocumentString(`
    mutation UpdatePreferences($where: PreferenceWhere, $update: PreferenceUpdateInput) {
  updatePreferences(update: $update, where: $where) {
    preferences {
      id
    }
  }
}
    `);
const CreatePropsDocument = new TypedDocumentString(`
    mutation CreateProps($input: [PropCreateInput!]!) {
  createProps(input: $input) {
    props {
      id
    }
  }
}
    `);
const UpdatePropsDocument = new TypedDocumentString(`
    mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {
  updateProps(update: $update, where: $where) {
    props {
      id
    }
  }
}
    `);
const DeletePropsDocument = new TypedDocumentString(`
    mutation DeleteProps($where: PropWhere!) {
  deleteProps(where: $where) {
    nodesDeleted
  }
}
    `);
const GetPropsDocument = new TypedDocumentString(`
    query GetProps($options: PropOptions, $where: PropWhere) {
  aggregate: propsAggregate(where: $where) {
    count
  }
  items: props(options: $options, where: $where) {
    ...Prop
  }
}
    fragment Prop on Prop {
  data
  id
}`);
const CreateRedirectsDocument = new TypedDocumentString(`
    mutation CreateRedirects($input: [RedirectCreateInput!]!) {
  createRedirects(input: $input) {
    redirects {
      id
    }
  }
}
    `);
const DeleteRedirectsDocument = new TypedDocumentString(`
    mutation DeleteRedirects($where: RedirectWhere, $delete: RedirectDeleteInput) {
  deleteRedirects(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
const UpdateRedirectsDocument = new TypedDocumentString(`
    mutation UpdateRedirects($where: RedirectWhere, $update: RedirectUpdateInput) {
  updateRedirects(update: $update, where: $where) {
    redirects {
      id
    }
  }
}
    `);
const GetRedirectsDocument = new TypedDocumentString(`
    query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {
  aggregate: redirectsAggregate(where: $where) {
    count
  }
  items: redirects(options: $options, where: $where) {
    ...Redirect
  }
}
    fragment Redirect on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}`);
const ResourceListDocument = new TypedDocumentString(`
    query ResourceList($options: ResourceOptions, $where: ResourceWhere) {
  aggregate: resourcesAggregate(where: $where) {
    count
  }
  items: resources(options: $options, where: $where) {
    ...Resource
  }
}
    fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`);
const CreateResourcesDocument = new TypedDocumentString(`
    mutation CreateResources($input: [ResourceCreateInput!]!) {
  createResources(input: $input) {
    resources {
      id
    }
  }
}
    `);
const UpdateResourceDocument = new TypedDocumentString(`
    mutation UpdateResource($where: ResourceWhere, $update: ResourceUpdateInput) {
  updateResources(update: $update, where: $where) {
    resources {
      id
    }
  }
}
    `);
const DeleteResourcesDocument = new TypedDocumentString(`
    mutation DeleteResources($where: ResourceWhere, $delete: ResourceDeleteInput) {
  deleteResources(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
const CreateCodeActionsDocument = new TypedDocumentString(`
    mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
  createCodeActions(input: $input) {
    codeActions {
      id
    }
  }
}
    `);
const CreateApiActionsDocument = new TypedDocumentString(`
    mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
  createApiActions(input: $input) {
    apiActions {
      id
    }
  }
}
    `);
const DeleteCodeActionsDocument = new TypedDocumentString(`
    mutation DeleteCodeActions($where: CodeActionWhere!, $delete: CodeActionDeleteInput) {
  deleteCodeActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteApiActionsDocument = new TypedDocumentString(`
    mutation DeleteApiActions($where: ApiActionWhere!, $delete: ApiActionDeleteInput) {
  deleteApiActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const GetActionsDocument = new TypedDocumentString(`
    query GetActions($codeActionWhere: CodeActionWhere, $apiActionWhere: ApiActionWhere) {
  apiActions(where: $apiActionWhere) {
    ...Action
  }
  codeActions(where: $codeActionWhere) {
    ...Action
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`);
const CreateStoresDocument = new TypedDocumentString(`
    mutation CreateStores($input: [StoreCreateInput!]!) {
  createStores(input: $input) {
    info {
      nodesCreated
      relationshipsCreated
    }
    stores {
      id
    }
  }
}
    `);
const DeleteStoresDocument = new TypedDocumentString(`
    mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
  deleteStores(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
const GetStoresDocument = new TypedDocumentString(`
    query GetStores($where: StoreWhere, $options: StoreOptions) {
  aggregate: storesAggregate(where: $where) {
    count
  }
  items: stores(options: $options, where: $where) {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`);
const UpdateStoresDocument = new TypedDocumentString(`
    mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
  updateStores(update: $update, where: $where) {
    stores {
      id
    }
  }
}
    `);
const UpdateCodeActionsDocument = new TypedDocumentString(`
    mutation UpdateCodeActions($update: CodeActionUpdateInput, $where: CodeActionWhere) {
  updateCodeActions(update: $update, where: $where) {
    codeActions {
      id
    }
  }
}
    `);
const UpdateApiActionsDocument = new TypedDocumentString(`
    mutation UpdateApiActions($update: ApiActionUpdateInput, $where: ApiActionWhere) {
  updateApiActions(update: $update, where: $where) {
    apiActions {
      id
    }
  }
}
    `);
const CreateTagsDocument = new TypedDocumentString(`
    mutation CreateTags($input: [TagCreateInput!]!) {
  createTags(input: $input) {
    tags {
      id
    }
  }
}
    `);
const UpdateTagsDocument = new TypedDocumentString(`
    mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
  updateTags(update: $update, where: $where) {
    tags {
      id
    }
  }
}
    `);
const DeleteTagsDocument = new TypedDocumentString(`
    mutation DeleteTags($where: TagWhere!) {
  deleteTags(where: $where) {
    nodesDeleted
  }
}
    `);
const GetTagsDocument = new TypedDocumentString(`
    query GetTags($options: TagOptions, $where: TagWhere) {
  aggregate: tagsAggregate(where: $where) {
    count
  }
  items: tags(options: $options, where: $where) {
    ...Tag
  }
}
    fragment Tag on Tag {
  children {
    id
    name
    owner {
      id
    }
  }
  descendants {
    id
    name
  }
  id
  name
  owner {
    id
  }
  parent {
    id
  }
}`);
const CreatePrimitiveTypesDocument = new TypedDocumentString(`
    mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
  types: createPrimitiveTypes(input: $input) {
    types: primitiveTypes {
      id
    }
  }
}
    `);
const CreateArrayTypesDocument = new TypedDocumentString(`
    mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
  types: createArrayTypes(input: $input) {
    types: arrayTypes {
      id
    }
  }
}
    `);
const CreateUnionTypesDocument = new TypedDocumentString(`
    mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
  types: createUnionTypes(input: $input) {
    types: unionTypes {
      id
    }
  }
}
    `);
const CreateInterfaceTypesDocument = new TypedDocumentString(`
    mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
  types: createInterfaceTypes(input: $input) {
    types: interfaceTypes {
      id
    }
  }
}
    `);
const CreateElementTypesDocument = new TypedDocumentString(`
    mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
  types: createElementTypes(input: $input) {
    types: elementTypes {
      id
    }
  }
}
    `);
const CreateRenderPropTypesDocument = new TypedDocumentString(`
    mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
  types: createRenderPropTypes(input: $input) {
    types: renderPropTypes {
      id
    }
  }
}
    `);
const CreateReactNodeTypesDocument = new TypedDocumentString(`
    mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
  types: createReactNodeTypes(input: $input) {
    types: reactNodeTypes {
      id
    }
  }
}
    `);
const CreateEnumTypesDocument = new TypedDocumentString(`
    mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
  types: createEnumTypes(input: $input) {
    types: enumTypes {
      id
    }
  }
}
    `);
const CreateLambdaTypesDocument = new TypedDocumentString(`
    mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
  types: createLambdaTypes(input: $input) {
    types: lambdaTypes {
      id
    }
  }
}
    `);
const CreatePageTypesDocument = new TypedDocumentString(`
    mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
  types: createPageTypes(input: $input) {
    types: pageTypes {
      id
    }
  }
}
    `);
const CreateAppTypesDocument = new TypedDocumentString(`
    mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
  types: createAppTypes(input: $input) {
    types: appTypes {
      id
    }
  }
}
    `);
const CreateRichTextTypesDocument = new TypedDocumentString(`
    mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {
  types: createRichTextTypes(input: $input) {
    types: richTextTypes {
      id
    }
  }
}
    `);
const CreateActionTypesDocument = new TypedDocumentString(`
    mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
  types: createActionTypes(input: $input) {
    types: actionTypes {
      id
    }
  }
}
    `);
const CreateCodeMirrorTypesDocument = new TypedDocumentString(`
    mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
  types: createCodeMirrorTypes(input: $input) {
    types: codeMirrorTypes {
      id
    }
  }
}
    `);
const DeletePrimitiveTypesDocument = new TypedDocumentString(`
    mutation DeletePrimitiveTypes($delete: PrimitiveTypeDeleteInput, $where: PrimitiveTypeWhere) {
  deletePrimitiveTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteArrayTypesDocument = new TypedDocumentString(`
    mutation DeleteArrayTypes($delete: ArrayTypeDeleteInput, $where: ArrayTypeWhere) {
  deleteArrayTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteReactNodeTypesDocument = new TypedDocumentString(`
    mutation DeleteReactNodeTypes($delete: ReactNodeTypeDeleteInput, $where: ReactNodeTypeWhere) {
  deleteReactNodeTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteUnionTypesDocument = new TypedDocumentString(`
    mutation DeleteUnionTypes($delete: UnionTypeDeleteInput, $where: UnionTypeWhere) {
  deleteUnionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteInterfaceTypesDocument = new TypedDocumentString(`
    mutation DeleteInterfaceTypes($delete: InterfaceTypeDeleteInput, $where: InterfaceTypeWhere) {
  deleteInterfaceTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteElementTypesDocument = new TypedDocumentString(`
    mutation DeleteElementTypes($delete: ElementTypeDeleteInput, $where: ElementTypeWhere) {
  deleteElementTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteRenderPropTypesDocument = new TypedDocumentString(`
    mutation DeleteRenderPropTypes($delete: RenderPropTypeDeleteInput, $where: RenderPropTypeWhere) {
  deleteRenderPropTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteRichTextTypesDocument = new TypedDocumentString(`
    mutation DeleteRichTextTypes($delete: RichTextTypeDeleteInput, $where: RichTextTypeWhere) {
  deleteRichTextTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteEnumTypesDocument = new TypedDocumentString(`
    mutation DeleteEnumTypes($delete: EnumTypeDeleteInput, $where: EnumTypeWhere) {
  deleteEnumTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
  deleteEnumTypeValues(where: {enumTypeConnection: {node: $where}}) {
    nodesDeleted
  }
}
    `);
const DeleteLambdaTypesDocument = new TypedDocumentString(`
    mutation DeleteLambdaTypes($delete: LambdaTypeDeleteInput, $where: LambdaTypeWhere) {
  deleteLambdaTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeletePageTypesDocument = new TypedDocumentString(`
    mutation DeletePageTypes($delete: PageTypeDeleteInput, $where: PageTypeWhere) {
  deletePageTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteAppTypesDocument = new TypedDocumentString(`
    mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
  deleteAppTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteActionTypesDocument = new TypedDocumentString(`
    mutation DeleteActionTypes($delete: ActionTypeDeleteInput, $where: ActionTypeWhere) {
  deleteActionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const DeleteCodeMirrorTypesDocument = new TypedDocumentString(`
    mutation DeleteCodeMirrorTypes($delete: CodeMirrorTypeDeleteInput, $where: CodeMirrorTypeWhere) {
  deleteCodeMirrorTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const GetBaseTypesDocument = new TypedDocumentString(`
    query GetBaseTypes($where: IBaseTypeWhere, $options: IBaseTypeOptions) {
  iBaseTypes(where: $where, options: $options) {
    ...BaseType
    ownerConnection {
      totalCount
    }
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`);
const GetTypesDocument = new TypedDocumentString(`
    query GetTypes($ids: [ID!]) {
  actionTypes(where: {id_IN: $ids}) {
    ...Type
  }
  appTypes(where: {id_IN: $ids}) {
    ...Type
  }
  arrayTypes(where: {id_IN: $ids}) {
    ...Type
  }
  codeMirrorTypes(where: {id_IN: $ids}) {
    ...Type
  }
  elementTypes(where: {id_IN: $ids}) {
    ...Type
  }
  enumTypes(where: {id_IN: $ids}) {
    ...Type
  }
  interfaceTypes(where: {id_IN: $ids}) {
    ...Type
  }
  lambdaTypes(where: {id_IN: $ids}) {
    ...Type
  }
  pageTypes(where: {id_IN: $ids}) {
    ...Type
  }
  primitiveTypes(where: {id_IN: $ids}) {
    ...Type
  }
  reactNodeTypes(where: {id_IN: $ids}) {
    ...Type
  }
  renderPropTypes(where: {id_IN: $ids}) {
    ...Type
  }
  richTextTypes(where: {id_IN: $ids}) {
    ...Type
  }
  unionTypes(where: {id_IN: $ids}) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetDescendantsDocument = new TypedDocumentString(`
    query GetDescendants($ids: [ID!]) {
  arrayTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
  interfaceTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
  unionTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
}
    `);
const GetPrimitiveTypesDocument = new TypedDocumentString(`
    query GetPrimitiveTypes($options: PrimitiveTypeOptions, $where: PrimitiveTypeWhere) {
  types: primitiveTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetArrayTypesDocument = new TypedDocumentString(`
    query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
  types: arrayTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetUnionTypesDocument = new TypedDocumentString(`
    query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
  types: unionTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetInterfaceTypesDocument = new TypedDocumentString(`
    query GetInterfaceTypes($options: InterfaceTypeOptions, $where: InterfaceTypeWhere) {
  types: interfaceTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetElementTypesDocument = new TypedDocumentString(`
    query GetElementTypes($options: ElementTypeOptions, $where: ElementTypeWhere) {
  types: elementTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetRenderPropTypesDocument = new TypedDocumentString(`
    query GetRenderPropTypes($options: RenderPropTypeOptions, $where: RenderPropTypeWhere) {
  types: renderPropTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetReactNodeTypesDocument = new TypedDocumentString(`
    query GetReactNodeTypes($options: ReactNodeTypeOptions, $where: ReactNodeTypeWhere) {
  types: reactNodeTypes(options: $options, where: $where) {
    ...ReactNodeType
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}`);
const GetRichTextTypesDocument = new TypedDocumentString(`
    query GetRichTextTypes($options: RichTextTypeOptions, $where: RichTextTypeWhere) {
  types: richTextTypes(options: $options, where: $where) {
    ...RichTextType
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment RichTextType on RichTextType {
  ...BaseType
}`);
const GetEnumTypesDocument = new TypedDocumentString(`
    query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
  types: enumTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetLambdaTypesDocument = new TypedDocumentString(`
    query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
  types: lambdaTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetPageTypesDocument = new TypedDocumentString(`
    query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
  types: pageTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetAppTypesDocument = new TypedDocumentString(`
    query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
  types: appTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetActionTypesDocument = new TypedDocumentString(`
    query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {
  types: actionTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const GetCodeMirrorTypesDocument = new TypedDocumentString(`
    query GetCodeMirrorTypes($options: CodeMirrorTypeOptions, $where: CodeMirrorTypeWhere) {
  types: codeMirrorTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
const InterfaceForm_GetAppsDocument = new TypedDocumentString(`
    query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {
  apps(options: $options, where: $where) {
    id
    name
  }
}
    `);
const InterfaceForm_GetAtomsDocument = new TypedDocumentString(`
    query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {
  atoms(options: $options, where: $where) {
    id
    name
    type
  }
}
    `);
const InterfaceForm_GetActionsDocument = new TypedDocumentString(`
    query InterfaceForm_GetActions($appId: ID) {
  apiActions {
    id
    name
  }
  codeActions {
    id
    name
  }
}
    `);
const InterfaceForm_GetStoresDocument = new TypedDocumentString(`
    query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {
  stores(options: $options, where: $where) {
    id
    name
  }
}
    `);
const InterfaceForm_GetResourceDocument = new TypedDocumentString(`
    query InterfaceForm_GetResource($options: ResourceOptions, $where: ResourceWhere) {
  resources(options: $options, where: $where) {
    id
    name
  }
}
    `);
const InterfaceForm_GetPagesDocument = new TypedDocumentString(`
    query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {
  pages(options: $options, where: $where) {
    id
    name
  }
}
    `);
const IsTypeDescendantOfDocument = new TypedDocumentString(`
    query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
  isTypeDescendantOf(
    descendantTypeId: $descendantTypeId
    parentTypeId: $parentTypeId
  )
}
    `);
const GetTypeReferencesDocument = new TypedDocumentString(`
    query GetTypeReferences($typeId: ID!) {
  getTypeReferences(typeId: $typeId) {
    label
    name
  }
}
    `);
const UpdatePrimitiveTypesDocument = new TypedDocumentString(`
    mutation UpdatePrimitiveTypes($update: PrimitiveTypeUpdateInput, $where: PrimitiveTypeWhere) {
  types: updatePrimitiveTypes(update: $update, where: $where) {
    types: primitiveTypes {
      id
    }
  }
}
    `);
const UpdateArrayTypesDocument = new TypedDocumentString(`
    mutation UpdateArrayTypes($update: ArrayTypeUpdateInput, $where: ArrayTypeWhere) {
  types: updateArrayTypes(update: $update, where: $where) {
    types: arrayTypes {
      id
    }
  }
}
    `);
const UpdateUnionTypesDocument = new TypedDocumentString(`
    mutation UpdateUnionTypes($update: UnionTypeUpdateInput, $where: UnionTypeWhere) {
  types: updateUnionTypes(update: $update, where: $where) {
    types: unionTypes {
      id
    }
  }
}
    `);
const UpdateInterfaceTypesDocument = new TypedDocumentString(`
    mutation UpdateInterfaceTypes($update: InterfaceTypeUpdateInput, $where: InterfaceTypeWhere) {
  types: updateInterfaceTypes(update: $update, where: $where) {
    types: interfaceTypes {
      id
    }
  }
}
    `);
const UpdateReactNodeTypesDocument = new TypedDocumentString(`
    mutation UpdateReactNodeTypes($update: ReactNodeTypeUpdateInput, $where: ReactNodeTypeWhere) {
  types: updateReactNodeTypes(update: $update, where: $where) {
    types: reactNodeTypes {
      id
    }
  }
}
    `);
const UpdateElementTypesDocument = new TypedDocumentString(`
    mutation UpdateElementTypes($update: ElementTypeUpdateInput, $where: ElementTypeWhere) {
  types: updateElementTypes(update: $update, where: $where) {
    types: elementTypes {
      id
    }
  }
}
    `);
const UpdateRenderPropTypesDocument = new TypedDocumentString(`
    mutation UpdateRenderPropTypes($update: RenderPropTypeUpdateInput, $where: RenderPropTypeWhere) {
  types: updateRenderPropTypes(update: $update, where: $where) {
    types: renderPropTypes {
      id
    }
  }
}
    `);
const UpdateEnumTypesDocument = new TypedDocumentString(`
    mutation UpdateEnumTypes($update: EnumTypeUpdateInput, $where: EnumTypeWhere) {
  types: updateEnumTypes(update: $update, where: $where) {
    types: enumTypes {
      id
    }
  }
}
    `);
const UpdateLambdaTypesDocument = new TypedDocumentString(`
    mutation UpdateLambdaTypes($update: LambdaTypeUpdateInput, $where: LambdaTypeWhere) {
  types: updateLambdaTypes(update: $update, where: $where) {
    types: lambdaTypes {
      id
    }
  }
}
    `);
const UpdatePageTypesDocument = new TypedDocumentString(`
    mutation UpdatePageTypes($update: PageTypeUpdateInput, $where: PageTypeWhere) {
  types: updatePageTypes(update: $update, where: $where) {
    types: pageTypes {
      id
    }
  }
}
    `);
const UpdateAppTypesDocument = new TypedDocumentString(`
    mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {
  types: updateAppTypes(update: $update, where: $where) {
    types: appTypes {
      id
    }
  }
}
    `);
const UpdateRichTextTypesDocument = new TypedDocumentString(`
    mutation UpdateRichTextTypes($update: RichTextTypeUpdateInput, $where: RichTextTypeWhere) {
  types: updateRichTextTypes(update: $update, where: $where) {
    types: richTextTypes {
      id
    }
  }
}
    `);
const UpdateActionTypesDocument = new TypedDocumentString(`
    mutation UpdateActionTypes($update: ActionTypeUpdateInput, $where: ActionTypeWhere) {
  types: updateActionTypes(update: $update, where: $where) {
    types: actionTypes {
      id
    }
  }
}
    `);
const UpdateCodeMirrorTypesDocument = new TypedDocumentString(`
    mutation UpdateCodeMirrorTypes($update: CodeMirrorTypeUpdateInput, $where: CodeMirrorTypeWhere) {
  types: updateCodeMirrorTypes(update: $update, where: $where) {
    types: codeMirrorTypes {
      id
    }
  }
}
    `);
const GetUsersDocument = new TypedDocumentString(`
    query GetUsers($where: UserWhere) {
  aggregate: usersAggregate(where: $where) {
    count
  }
  items: users(where: $where) {
    ...User
  }
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  owner {
    id
  }
}
fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences {
    ...Preference
  }
  roles
  username
}`);
const CreateUserDocument = new TypedDocumentString(`
    mutation CreateUser($input: [UserCreateInput!]!) {
  createUsers(input: $input) {
    users {
      email
      id
    }
  }
}
    `);
const DeleteUsersDocument = new TypedDocumentString(`
    mutation DeleteUsers($where: UserWhere!) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}
    `);
const CreateAppsDocument = new TypedDocumentString(`
    mutation CreateApps($input: [AppCreateInput!]!) {
  createApps(input: $input) {
    apps {
      id
    }
  }
}
    `);
const UpdateAppsDocument = new TypedDocumentString(`
    mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
  updateApps(update: $update, where: $where) {
    apps {
      id
    }
  }
}
    `);
const DeleteAppsDocument = new TypedDocumentString(`
    mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
  deleteApps(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
const AppListPreviewDocument = new TypedDocumentString(`
    query AppListPreview($options: AppOptions, $where: AppWhere) {
  aggregate: appsAggregate(where: $where) {
    count
  }
  items: apps(options: $options, where: $where) {
    ...AppPreview
  }
}
    fragment AppPreview on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...PagePreview
  }
  slug
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Owner on User {
  id
}`);
const AppListDocument = new TypedDocumentString(`
    query AppList($options: AppOptions, $where: AppWhere) {
  items: apps(options: $options, where: $where) {
    ...App
  }
  aggregate: appsAggregate(where: $where) {
    count
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomBuilder
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment App on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...Page
  }
  slug
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment Element on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomBuilder
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
  expanded
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
const GetAppProductionDocument = new TypedDocumentString(`
    query GetAppProduction($domain: String!, $pageUrlPattern: String!) {
  apps(where: {domains_SOME: {name_IN: [$domain]}}) {
    ...AppProduction
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomProduction
  }
  resources {
    ...Resource
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AppProduction on App {
  id
  name
  owner {
    ...Owner
  }
  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {
    ...PageProduction
  }
  slug
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  dependantTypes {
    ...Type
  }
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderAction {
    id
    type
  }
  preRenderAction {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ... on Atom {
      __typename
      ...AtomProduction
    }
    ... on Component {
      __typename
      id
    }
  }
  style
  tailwindClassNames
}
fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      id
      kind
      name
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  allowedValues {
    ...EnumTypeValue
  }
  ...BaseType
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
const CreateAtomsDocument = new TypedDocumentString(`
    mutation CreateAtoms($input: [AtomCreateInput!]!) {
  createAtoms(input: $input) {
    atoms {
      id
    }
    info {
      nodesCreated
      relationshipsCreated
    }
  }
}
    `);
const DeleteAtomsDocument = new TypedDocumentString(`
    mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {
  deleteAtoms(where: $where, delete: $delete) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
const AtomListDocument = new TypedDocumentString(`
    query AtomList($where: AtomWhere, $options: AtomOptions) {
  aggregate: atomsAggregate(where: $where) {
    count
  }
  items: atoms(options: $options, where: $where) {
    ...Atom
  }
}
    fragment Atom on Atom {
  __typename
  api {
    ...InterfaceType
  }
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`);
const UpdateAtomsDocument = new TypedDocumentString(`
    mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
  updateAtoms(update: $update, where: $where) {
    atoms {
      id
    }
  }
}
    `);
const CreateFieldsDocument = new TypedDocumentString(`
    mutation CreateFields($input: [FieldCreateInput!]!) {
  createFields(input: $input) {
    fields {
      id
    }
  }
}
    `);
const UpdateFieldsDocument = new TypedDocumentString(`
    mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
  updateFields(update: $update, where: $where) {
    fields {
      id
    }
  }
}
    `);
const DeleteFieldsDocument = new TypedDocumentString(`
    mutation DeleteFields($where: FieldWhere!) {
  deleteFields(where: $where) {
    nodesDeleted
  }
}
    `);
const GetFieldsDocument = new TypedDocumentString(`
    query GetFields($where: FieldWhere, $options: FieldOptions) {
  aggregate: fieldsAggregate(where: $where) {
    count
  }
  items: fields(options: $options, where: $where) {
    ...Field
  }
}
    fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}`);

;// ../../libs/shared/abstract/core/src/atom/atom-type.enum.ts

/**
 * We create the enum here then import into Neo4j graphql schema so we can get linting
 *
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
var __AtomType;
(function (__AtomType) {
    // Ant Design
    __AtomType["AntDesignAffix"] = "AntDesignAffix";
    __AtomType["AntDesignAlert"] = "AntDesignAlert";
    __AtomType["AntDesignAnchor"] = "AntDesignAnchor";
    __AtomType["AntDesignAnchorLink"] = "AntDesignAnchorLink";
    __AtomType["AntDesignAutoComplete"] = "AntDesignAutoComplete";
    __AtomType["AntDesignAvatar"] = "AntDesignAvatar";
    __AtomType["AntDesignBackTop"] = "AntDesignBackTop";
    __AtomType["AntDesignBadge"] = "AntDesignBadge";
    __AtomType["AntDesignBreadcrumb"] = "AntDesignBreadcrumb";
    __AtomType["AntDesignBreadcrumbItem"] = "AntDesignBreadcrumbItem";
    __AtomType["AntDesignBreadcrumbSeparator"] = "AntDesignBreadcrumbSeparator";
    __AtomType["AntDesignButton"] = "AntDesignButton";
    __AtomType["AntDesignCalendar"] = "AntDesignCalendar";
    __AtomType["AntDesignCard"] = "AntDesignCard";
    __AtomType["AntDesignCardGrid"] = "AntDesignCardGrid";
    __AtomType["AntDesignCardMeta"] = "AntDesignCardMeta";
    __AtomType["AntDesignCarousel"] = "AntDesignCarousel";
    __AtomType["AntDesignCascader"] = "AntDesignCascader";
    __AtomType["AntDesignCheckbox"] = "AntDesignCheckbox";
    __AtomType["AntDesignCheckboxGroup"] = "AntDesignCheckboxGroup";
    __AtomType["AntDesignCollapse"] = "AntDesignCollapse";
    __AtomType["AntDesignCollapsePanel"] = "AntDesignCollapsePanel";
    __AtomType["AntDesignComment"] = "AntDesignComment";
    __AtomType["AntDesignConfigProvider"] = "AntDesignConfigProvider";
    __AtomType["AntDesignDatePicker"] = "AntDesignDatePicker";
    __AtomType["AntDesignDescriptions"] = "AntDesignDescriptions";
    __AtomType["AntDesignDescriptionsItem"] = "AntDesignDescriptionsItem";
    __AtomType["AntDesignDivider"] = "AntDesignDivider";
    __AtomType["AntDesignDrawer"] = "AntDesignDrawer";
    __AtomType["AntDesignDropdown"] = "AntDesignDropdown";
    __AtomType["AntDesignDropdownButton"] = "AntDesignDropdownButton";
    __AtomType["AntDesignEmpty"] = "AntDesignEmpty";
    __AtomType["AntDesignForm"] = "AntDesignForm";
    __AtomType["AntDesignFormErrorList"] = "AntDesignFormErrorList";
    __AtomType["AntDesignFormItem"] = "AntDesignFormItem";
    __AtomType["AntDesignFormList"] = "AntDesignFormList";
    __AtomType["AntDesignFormProvider"] = "AntDesignFormProvider";
    __AtomType["AntDesignGridCol"] = "AntDesignGridCol";
    __AtomType["AntDesignGridRow"] = "AntDesignGridRow";
    __AtomType["AntDesignIcon"] = "AntDesignIcon";
    __AtomType["AntDesignImage"] = "AntDesignImage";
    __AtomType["AntDesignInput"] = "AntDesignInput";
    __AtomType["AntDesignInputNumber"] = "AntDesignInputNumber";
    __AtomType["AntDesignInputSearch"] = "AntDesignInputSearch";
    __AtomType["AntDesignInputTextArea"] = "AntDesignInputTextArea";
    __AtomType["AntDesignLayout"] = "AntDesignLayout";
    __AtomType["AntDesignLayoutContent"] = "AntDesignLayoutContent";
    __AtomType["AntDesignLayoutFooter"] = "AntDesignLayoutFooter";
    __AtomType["AntDesignLayoutHeader"] = "AntDesignLayoutHeader";
    __AtomType["AntDesignLayoutSider"] = "AntDesignLayoutSider";
    __AtomType["AntDesignList"] = "AntDesignList";
    __AtomType["AntDesignListItem"] = "AntDesignListItem";
    __AtomType["AntDesignListItemMeta"] = "AntDesignListItemMeta";
    __AtomType["AntDesignMentions"] = "AntDesignMentions";
    __AtomType["AntDesignMentionsOption"] = "AntDesignMentionsOption";
    __AtomType["AntDesignMenu"] = "AntDesignMenu";
    __AtomType["AntDesignMessage"] = "AntDesignMessage";
    __AtomType["AntDesignModal"] = "AntDesignModal";
    __AtomType["AntDesignNotification"] = "AntDesignNotification";
    __AtomType["AntDesignPagination"] = "AntDesignPagination";
    __AtomType["AntDesignPopconfirm"] = "AntDesignPopconfirm";
    __AtomType["AntDesignPopover"] = "AntDesignPopover";
    __AtomType["AntDesignProgress"] = "AntDesignProgress";
    __AtomType["AntDesignRadio"] = "AntDesignRadio";
    __AtomType["AntDesignRadioGroup"] = "AntDesignRadioGroup";
    __AtomType["AntDesignRate"] = "AntDesignRate";
    __AtomType["AntDesignResult"] = "AntDesignResult";
    __AtomType["AntDesignSegmented"] = "AntDesignSegmented";
    __AtomType["AntDesignSelect"] = "AntDesignSelect";
    __AtomType["AntDesignSelectOption"] = "AntDesignSelectOption";
    __AtomType["AntDesignSkeleton"] = "AntDesignSkeleton";
    __AtomType["AntDesignSlider"] = "AntDesignSlider";
    __AtomType["AntDesignSpace"] = "AntDesignSpace";
    __AtomType["AntDesignSpin"] = "AntDesignSpin";
    __AtomType["AntDesignStatistic"] = "AntDesignStatistic";
    __AtomType["AntDesignSteps"] = "AntDesignSteps";
    __AtomType["AntDesignStepsStep"] = "AntDesignStepsStep";
    __AtomType["AntDesignSwitch"] = "AntDesignSwitch";
    __AtomType["AntDesignTable"] = "AntDesignTable";
    __AtomType["AntDesignTabs"] = "AntDesignTabs";
    __AtomType["AntDesignTabsTabPane"] = "AntDesignTabsTabPane";
    __AtomType["AntDesignTag"] = "AntDesignTag";
    __AtomType["AntDesignTimeline"] = "AntDesignTimeline";
    __AtomType["AntDesignTimelineItem"] = "AntDesignTimelineItem";
    __AtomType["AntDesignTimePicker"] = "AntDesignTimePicker";
    __AtomType["AntDesignTooltip"] = "AntDesignTooltip";
    __AtomType["AntDesignTransfer"] = "AntDesignTransfer";
    __AtomType["AntDesignTree"] = "AntDesignTree";
    __AtomType["AntDesignTreeSelect"] = "AntDesignTreeSelect";
    __AtomType["AntDesignTypographyParagraph"] = "AntDesignTypographyParagraph";
    __AtomType["AntDesignTypographyText"] = "AntDesignTypographyText";
    __AtomType["AntDesignTypographyTitle"] = "AntDesignTypographyTitle";
    __AtomType["AntDesignUpload"] = "AntDesignUpload";
    // External dynamic component
    __AtomType["ExternalComponent"] = "ExternalComponent";
    __AtomType["GridLayout"] = "GridLayout";
    __AtomType["HookGraphqlMutation"] = "HookGraphqlMutation";
    // Hook
    __AtomType["HookGraphqlQuery"] = "HookGraphqlQuery";
    __AtomType["HookQueryConfig"] = "HookQueryConfig";
    __AtomType["HookQueryLambda"] = "HookQueryLambda";
    __AtomType["HookQueryPage"] = "HookQueryPage";
    __AtomType["HookQueryPages"] = "HookQueryPages";
    __AtomType["HookRecoilState"] = "HookRecoilState";
    __AtomType["HookRouter"] = "HookRouter";
    __AtomType["HtmlA"] = "HtmlA";
    __AtomType["HtmlAbbr"] = "HtmlAbbr";
    __AtomType["HtmlArea"] = "HtmlArea";
    __AtomType["HtmlArticle"] = "HtmlArticle";
    __AtomType["HtmlAside"] = "HtmlAside";
    __AtomType["HtmlAudio"] = "HtmlAudio";
    __AtomType["HtmlB"] = "HtmlB";
    __AtomType["HtmlBase"] = "HtmlBase";
    __AtomType["HtmlBdo"] = "HtmlBdo";
    __AtomType["HtmlBlockquote"] = "HtmlBlockquote";
    __AtomType["HtmlBr"] = "HtmlBr";
    __AtomType["HtmlButton"] = "HtmlButton";
    __AtomType["HtmlCanvas"] = "HtmlCanvas";
    __AtomType["HtmlCaption"] = "HtmlCaption";
    __AtomType["HtmlCite"] = "HtmlCite";
    __AtomType["HtmlCode"] = "HtmlCode";
    __AtomType["HtmlCol"] = "HtmlCol";
    __AtomType["HtmlData"] = "HtmlData";
    __AtomType["HtmlDatalist"] = "HtmlDatalist";
    __AtomType["HtmlDetails"] = "HtmlDetails";
    __AtomType["HtmlDfn"] = "HtmlDfn";
    __AtomType["HtmlDialog"] = "HtmlDialog";
    __AtomType["HtmlDiv"] = "HtmlDiv";
    __AtomType["HtmlDl"] = "HtmlDl";
    __AtomType["HtmlEm"] = "HtmlEm";
    __AtomType["HtmlEmbed"] = "HtmlEmbed";
    __AtomType["HtmlFieldset"] = "HtmlFieldset";
    __AtomType["HtmlFooter"] = "HtmlFooter";
    __AtomType["HtmlForm"] = "HtmlForm";
    __AtomType["HtmlH1"] = "HtmlH1";
    __AtomType["HtmlH2"] = "HtmlH2";
    __AtomType["HtmlH3"] = "HtmlH3";
    __AtomType["HtmlH4"] = "HtmlH4";
    __AtomType["HtmlH5"] = "HtmlH5";
    __AtomType["HtmlH6"] = "HtmlH6";
    __AtomType["HtmlHead"] = "HtmlHead";
    __AtomType["HtmlHeader"] = "HtmlHeader";
    __AtomType["HtmlHr"] = "HtmlHr";
    __AtomType["HtmlI"] = "HtmlI";
    __AtomType["HtmlIframe"] = "HtmlIframe";
    __AtomType["HtmlImg"] = "HtmlImg";
    __AtomType["HtmlInput"] = "HtmlInput";
    __AtomType["HtmlKbd"] = "HtmlKbd";
    __AtomType["HtmlLabel"] = "HtmlLabel";
    __AtomType["HtmlLegend"] = "HtmlLegend";
    __AtomType["HtmlLi"] = "HtmlLi";
    __AtomType["HtmlLink"] = "HtmlLink";
    __AtomType["HtmlMain"] = "HtmlMain";
    __AtomType["HtmlMap"] = "HtmlMap";
    __AtomType["HtmlMark"] = "HtmlMark";
    __AtomType["HtmlMath"] = "HtmlMath";
    __AtomType["HtmlMeta"] = "HtmlMeta";
    __AtomType["HtmlMeter"] = "HtmlMeter";
    __AtomType["HtmlNav"] = "HtmlNav";
    __AtomType["HtmlNoscript"] = "HtmlNoscript";
    __AtomType["HtmlObject"] = "HtmlObject";
    __AtomType["HtmlOl"] = "HtmlOl";
    __AtomType["HtmlOptgroup"] = "HtmlOptgroup";
    __AtomType["HtmlOption"] = "HtmlOption";
    __AtomType["HtmlOutput"] = "HtmlOutput";
    __AtomType["HtmlP"] = "HtmlP";
    __AtomType["HtmlParam"] = "HtmlParam";
    __AtomType["HtmlPicture"] = "HtmlPicture";
    __AtomType["HtmlPre"] = "HtmlPre";
    __AtomType["HtmlProgress"] = "HtmlProgress";
    __AtomType["HtmlQ"] = "HtmlQ";
    __AtomType["HtmlRuby"] = "HtmlRuby";
    __AtomType["HtmlS"] = "HtmlS";
    __AtomType["HtmlSamp"] = "HtmlSamp";
    __AtomType["HtmlScript"] = "HtmlScript";
    __AtomType["HtmlSection"] = "HtmlSection";
    __AtomType["HtmlSelect"] = "HtmlSelect";
    __AtomType["HtmlSmall"] = "HtmlSmall";
    __AtomType["HtmlSource"] = "HtmlSource";
    __AtomType["HtmlSpan"] = "HtmlSpan";
    __AtomType["HtmlStrong"] = "HtmlStrong";
    __AtomType["HtmlStyle"] = "HtmlStyle";
    __AtomType["HtmlSub"] = "HtmlSub";
    __AtomType["HtmlSup"] = "HtmlSup";
    __AtomType["HtmlSvg"] = "HtmlSvg";
    __AtomType["HtmlTable"] = "HtmlTable";
    __AtomType["HtmlTd"] = "HtmlTd";
    __AtomType["HtmlTemplate"] = "HtmlTemplate";
    __AtomType["HtmlTextarea"] = "HtmlTextarea";
    __AtomType["HtmlTh"] = "HtmlTh";
    __AtomType["HtmlTime"] = "HtmlTime";
    __AtomType["HtmlTitle"] = "HtmlTitle";
    __AtomType["HtmlTr"] = "HtmlTr";
    __AtomType["HtmlTrack"] = "HtmlTrack";
    __AtomType["HtmlU"] = "HtmlU";
    __AtomType["HtmlUl"] = "HtmlUl";
    __AtomType["HtmlVar"] = "HtmlVar";
    __AtomType["HtmlVideo"] = "HtmlVideo";
    __AtomType["HtmlWbr"] = "HtmlWbr";
    __AtomType["LexicalEditor"] = "LexicalEditor";
    //
    // MUI
    //
    __AtomType["MuiAccordion"] = "MuiAccordion";
    __AtomType["MuiAccordionActions"] = "MuiAccordionActions";
    __AtomType["MuiAccordionDetails"] = "MuiAccordionDetails";
    __AtomType["MuiAccordionSummary"] = "MuiAccordionSummary";
    __AtomType["MuiAlert"] = "MuiAlert";
    __AtomType["MuiAlertTitle"] = "MuiAlertTitle";
    __AtomType["MuiAppBar"] = "MuiAppBar";
    __AtomType["MuiAutocomplete"] = "MuiAutocomplete";
    __AtomType["MuiAvatar"] = "MuiAvatar";
    __AtomType["MuiAvatarGroup"] = "MuiAvatarGroup";
    __AtomType["MuiBackdrop"] = "MuiBackdrop";
    __AtomType["MuiBadge"] = "MuiBadge";
    __AtomType["MuiBadgeUnstyled"] = "MuiBadgeUnstyled";
    __AtomType["MuiBottomNavigation"] = "MuiBottomNavigation";
    __AtomType["MuiBottomNavigationAction"] = "MuiBottomNavigationAction";
    __AtomType["MuiBox"] = "MuiBox";
    __AtomType["MuiBreadcrumbs"] = "MuiBreadcrumbs";
    __AtomType["MuiButton"] = "MuiButton";
    __AtomType["MuiButtonBase"] = "MuiButtonBase";
    __AtomType["MuiButtonGroup"] = "MuiButtonGroup";
    __AtomType["MuiButtonUnstyled"] = "MuiButtonUnstyled";
    __AtomType["MuiCalendarPicker"] = "MuiCalendarPicker";
    __AtomType["MuiCalendarPickerSkeleton"] = "MuiCalendarPickerSkeleton";
    __AtomType["MuiCard"] = "MuiCard";
    __AtomType["MuiCardActionArea"] = "MuiCardActionArea";
    __AtomType["MuiCardActions"] = "MuiCardActions";
    __AtomType["MuiCardContent"] = "MuiCardContent";
    __AtomType["MuiCardHeader"] = "MuiCardHeader";
    __AtomType["MuiCardMedia"] = "MuiCardMedia";
    __AtomType["MuiCheckbox"] = "MuiCheckbox";
    __AtomType["MuiChip"] = "MuiChip";
    __AtomType["MuiCircularProgress"] = "MuiCircularProgress";
    __AtomType["MuiClickAwayListener"] = "MuiClickAwayListener";
    __AtomType["MuiClockPicker"] = "MuiClockPicker";
    __AtomType["MuiCollapse"] = "MuiCollapse";
    __AtomType["MuiContainer"] = "MuiContainer";
    __AtomType["MuiCssBaseline"] = "MuiCssBaseline";
    __AtomType["MuiDataGrid"] = "MuiDataGrid";
    __AtomType["MuiDatePicker"] = "MuiDatePicker";
    __AtomType["MuiDateRangePicker"] = "MuiDateRangePicker";
    __AtomType["MuiDateRangePickerDay"] = "MuiDateRangePickerDay";
    __AtomType["MuiDateTimePicker"] = "MuiDateTimePicker";
    __AtomType["MuiDesktopDatePicker"] = "MuiDesktopDatePicker";
    __AtomType["MuiDesktopDateRangePicker"] = "MuiDesktopDateRangePicker";
    __AtomType["MuiDesktopDateTimePicker"] = "MuiDesktopDateTimePicker";
    __AtomType["MuiDesktopTimePicker"] = "MuiDesktopTimePicker";
    __AtomType["MuiDialog"] = "MuiDialog";
    __AtomType["MuiDialogActions"] = "MuiDialogActions";
    __AtomType["MuiDialogContent"] = "MuiDialogContent";
    __AtomType["MuiDialogContentText"] = "MuiDialogContentText";
    __AtomType["MuiDialogTitle"] = "MuiDialogTitle";
    __AtomType["MuiDivider"] = "MuiDivider";
    __AtomType["MuiDrawer"] = "MuiDrawer";
    __AtomType["MuiFab"] = "MuiFab";
    __AtomType["MuiFade"] = "MuiFade";
    __AtomType["MuiFilledInput"] = "MuiFilledInput";
    __AtomType["MuiFormControl"] = "MuiFormControl";
    __AtomType["MuiFormControlLabel"] = "MuiFormControlLabel";
    __AtomType["MuiFormControlUnstyled"] = "MuiFormControlUnstyled";
    __AtomType["MuiFormGroup"] = "MuiFormGroup";
    __AtomType["MuiFormHelperText"] = "MuiFormHelperText";
    __AtomType["MuiFormLabel"] = "MuiFormLabel";
    __AtomType["MuiGlobalStyles"] = "MuiGlobalStyles";
    __AtomType["MuiGrid"] = "MuiGrid";
    __AtomType["MuiGridColDef"] = "MuiGridColDef";
    __AtomType["MuiGrow"] = "MuiGrow";
    __AtomType["MuiHidden"] = "MuiHidden";
    __AtomType["MuiIcon"] = "MuiIcon";
    __AtomType["MuiIconButton"] = "MuiIconButton";
    __AtomType["MuiImageList"] = "MuiImageList";
    __AtomType["MuiImageListItem"] = "MuiImageListItem";
    __AtomType["MuiImageListItemBar"] = "MuiImageListItemBar";
    __AtomType["MuiInput"] = "MuiInput";
    __AtomType["MuiInputAdornment"] = "MuiInputAdornment";
    __AtomType["MuiInputBase"] = "MuiInputBase";
    __AtomType["MuiInputLabel"] = "MuiInputLabel";
    __AtomType["MuiLinearProgress"] = "MuiLinearProgress";
    __AtomType["MuiLink"] = "MuiLink";
    __AtomType["MuiList"] = "MuiList";
    __AtomType["MuiListItem"] = "MuiListItem";
    __AtomType["MuiListItemAvatar"] = "MuiListItemAvatar";
    __AtomType["MuiListItemButton"] = "MuiListItemButton";
    __AtomType["MuiListItemIcon"] = "MuiListItemIcon";
    __AtomType["MuiListItemSecondaryAction"] = "MuiListItemSecondaryAction";
    __AtomType["MuiListItemText"] = "MuiListItemText";
    __AtomType["MuiListSubheader"] = "MuiListSubheader";
    __AtomType["MuiLoadingButton"] = "MuiLoadingButton";
    __AtomType["MuiMasonry"] = "MuiMasonry";
    __AtomType["MuiMasonryItem"] = "MuiMasonryItem";
    __AtomType["MuiMenu"] = "MuiMenu";
    __AtomType["MuiMenuItem"] = "MuiMenuItem";
    __AtomType["MuiMenuList"] = "MuiMenuList";
    __AtomType["MuiMobileDatePicker"] = "MuiMobileDatePicker";
    __AtomType["MuiMobileDateRangePicker"] = "MuiMobileDateRangePicker";
    __AtomType["MuiMobileDateTimePicker"] = "MuiMobileDateTimePicker";
    __AtomType["MuiMobileStepper"] = "MuiMobileStepper";
    __AtomType["MuiMobileTimePicker"] = "MuiMobileTimePicker";
    __AtomType["MuiModal"] = "MuiModal";
    __AtomType["MuiModalUnstyled"] = "MuiModalUnstyled";
    __AtomType["MuiMonthPicker"] = "MuiMonthPicker";
    __AtomType["MuiNativeSelect"] = "MuiNativeSelect";
    __AtomType["MuiNoSsr"] = "MuiNoSsr";
    __AtomType["MuiOutlinedInput"] = "MuiOutlinedInput";
    __AtomType["MuiPagination"] = "MuiPagination";
    __AtomType["MuiPaginationItem"] = "MuiPaginationItem";
    __AtomType["MuiPaper"] = "MuiPaper";
    __AtomType["MuiPickersDay"] = "MuiPickersDay";
    __AtomType["MuiPopover"] = "MuiPopover";
    __AtomType["MuiPopper"] = "MuiPopper";
    __AtomType["MuiPortal"] = "MuiPortal";
    __AtomType["MuiRadio"] = "MuiRadio";
    __AtomType["MuiRadioGroup"] = "MuiRadioGroup";
    __AtomType["MuiRating"] = "MuiRating";
    __AtomType["MuiScopedCssBaseline"] = "MuiScopedCssBaseline";
    __AtomType["MuiSelect"] = "MuiSelect";
    __AtomType["MuiSkeleton"] = "MuiSkeleton";
    __AtomType["MuiSlide"] = "MuiSlide";
    __AtomType["MuiSlider"] = "MuiSlider";
    __AtomType["MuiSliderUnstyled"] = "MuiSliderUnstyled";
    __AtomType["MuiSnackbar"] = "MuiSnackbar";
    __AtomType["MuiSnackbarContent"] = "MuiSnackbarContent";
    __AtomType["MuiSpeedDial"] = "MuiSpeedDial";
    __AtomType["MuiSpeedDialAction"] = "MuiSpeedDialAction";
    __AtomType["MuiSpeedDialIcon"] = "MuiSpeedDialIcon";
    __AtomType["MuiStack"] = "MuiStack";
    __AtomType["MuiStaticDatePicker"] = "MuiStaticDatePicker";
    __AtomType["MuiStaticDateRangePicker"] = "MuiStaticDateRangePicker";
    __AtomType["MuiStaticDateTimePicker"] = "MuiStaticDateTimePicker";
    __AtomType["MuiStaticTimePicker"] = "MuiStaticTimePicker";
    __AtomType["MuiStep"] = "MuiStep";
    __AtomType["MuiStepButton"] = "MuiStepButton";
    __AtomType["MuiStepConnector"] = "MuiStepConnector";
    __AtomType["MuiStepContent"] = "MuiStepContent";
    __AtomType["MuiStepIcon"] = "MuiStepIcon";
    __AtomType["MuiStepLabel"] = "MuiStepLabel";
    __AtomType["MuiStepper"] = "MuiStepper";
    __AtomType["MuiSvgIcon"] = "MuiSvgIcon";
    __AtomType["MuiSwipeableDrawer"] = "MuiSwipeableDrawer";
    __AtomType["MuiSwitch"] = "MuiSwitch";
    __AtomType["MuiSwitchUnstyled"] = "MuiSwitchUnstyled";
    __AtomType["MuiTab"] = "MuiTab";
    __AtomType["MuiTabContext"] = "MuiTabContext";
    __AtomType["MuiTable"] = "MuiTable";
    __AtomType["MuiTableBody"] = "MuiTableBody";
    __AtomType["MuiTableCell"] = "MuiTableCell";
    __AtomType["MuiTableContainer"] = "MuiTableContainer";
    __AtomType["MuiTableFooter"] = "MuiTableFooter";
    __AtomType["MuiTableHead"] = "MuiTableHead";
    __AtomType["MuiTablePagination"] = "MuiTablePagination";
    __AtomType["MuiTableRow"] = "MuiTableRow";
    __AtomType["MuiTableSortLabel"] = "MuiTableSortLabel";
    __AtomType["MuiTabList"] = "MuiTabList";
    __AtomType["MuiTabPanel"] = "MuiTabPanel";
    __AtomType["MuiTabs"] = "MuiTabs";
    __AtomType["MuiTabScrollButton"] = "MuiTabScrollButton";
    __AtomType["MuiTextareaAutosize"] = "MuiTextareaAutosize";
    __AtomType["MuiTextField"] = "MuiTextField";
    __AtomType["MuiTimeline"] = "MuiTimeline";
    __AtomType["MuiTimelineConnector"] = "MuiTimelineConnector";
    __AtomType["MuiTimelineContent"] = "MuiTimelineContent";
    __AtomType["MuiTimelineDot"] = "MuiTimelineDot";
    __AtomType["MuiTimelineItem"] = "MuiTimelineItem";
    __AtomType["MuiTimelineOppositeContent"] = "MuiTimelineOppositeContent";
    __AtomType["MuiTimelineSeparator"] = "MuiTimelineSeparator";
    __AtomType["MuiTimePicker"] = "MuiTimePicker";
    __AtomType["MuiToggleButton"] = "MuiToggleButton";
    __AtomType["MuiToggleButtonGroup"] = "MuiToggleButtonGroup";
    __AtomType["MuiToolbar"] = "MuiToolbar";
    __AtomType["MuiTooltip"] = "MuiTooltip";
    __AtomType["MuiTreeItem"] = "MuiTreeItem";
    __AtomType["MuiTreeView"] = "MuiTreeView";
    __AtomType["MuiTypography"] = "MuiTypography";
    __AtomType["MuiUnstableTrapFocus"] = "MuiUnstableTrapFocus";
    __AtomType["MuiYearPicker"] = "MuiYearPicker";
    __AtomType["MuiZoom"] = "MuiZoom";
    // Nextjs components
    __AtomType["NextLink"] = "NextLink";
    //
    // Custom:
    //
    // TODO: need to remove
    __AtomType["Query"] = "Query";
    // React
    __AtomType["ReactFragment"] = "ReactFragment";
    __AtomType["Script"] = "Script";
    __AtomType["State"] = "State";
    __AtomType["Text"] = "Text";
    __AtomType["TextList"] = "TextList";
})(__AtomType || (__AtomType = {}));


;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/atom.schema.ts



const atomTypeEnum = `enum AtomType {
  ${Object.values(__AtomType).join('\n')}
}`;
const atomSchema = (0,client_.gql) `
  ${atomTypeEnum}

  type Atom implements WithOwner ${authOwnerOrAdmin} {
    id: ID! @unique @settable(onUpdate: false)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    type: AtomType! @unique
    name: String! @unique
    tags: [Tag!]! @relationship(type: "TAGS_WITH", direction: OUT)
    api: InterfaceType! @relationship(type: "ATOM_API", direction: OUT)
    icon: String
    externalJsSource: String
    externalCssSource: String
    externalSourceType: String @unique
    requiredParents: [Atom!]!
      @relationship(type: "REQUIRED_PARENTS", direction: OUT)
    suggestedChildren: [Atom!]!
      @relationship(type: "ALLOWED_CHILDREN", direction: OUT)
    elements: [Element!]!
      @relationship(type: "ELEMENT_RENDER_TYPE", direction: IN)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/auth-guard.schema.ts

const authGuardSchema = (0,client_.gql) `
  type AuthGuard implements WithOwner {
    id: ID! @unique @settable(onUpdate: false)
    name: String!
    resource: Resource!
      @relationship(type: "RESOURCE_OF_AUTH_GUARD", direction: OUT)
    config: Prop! @relationship(type: "AUTH_GUARD_CONFIG", direction: OUT)
    responseTransformer: String!
    # redirect to another page inside the app or to a given url
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/component.schema.ts


const componentSchema = (0,client_.gql) `
  type Component implements WithOwner ${authOwnerOrAdmin} {
    id: ID! @unique @settable(onUpdate: false)
    # userId-name
    compositeKey: String! @unique
    name: String! @customResolver(requires: "owner { id } compositeKey")
    slug: String! @customResolver(requires: "owner { id } compositeKey")
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    # contains the rootElement, and its descendants
    elements: [Element!]! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    store: Store! @relationship(type: "STORE_CONTAINER_NODE", direction: OUT)
    props: Prop! @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)
    # This is the slot where prop children is rendered in the component instance
    # We may want multiple slots in the future
    # childrenContainerElement: Element!
    #  @relationship(type: "CHILDREN_CONTAINER_ELEMENT", direction: OUT)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/domain.schema.ts

const domainSchema = (0,client_.gql) `
  type ProductionDomainConfig
    @query(read: false, aggregate: false)
    @mutation(operations: []) {
    misconfigured: Boolean!
  }

  type Domain {
    id: ID! @unique @settable(onUpdate: false)
    # appId-name format to make it unique across apps
    # compositeKey: String! @unique
    name: String!
    app: App! @relationship(type: "APP_DOMAIN", direction: OUT)
    domainConfig: ProductionDomainConfig!
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/element.schema.ts

const elementSchema = (0,client_.gql) `
  union ElementRenderType = Atom | Component
  union ContainerNode = Page | Component

  type Element {
    id: ID! @unique @settable(onUpdate: false)
    compositeKey: String! @unique
    name: String! @customResolver(requires: "id compositeKey")
    slug: String! @customResolver(requires: "id compositeKey")
    nextSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)
    prevSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)
    firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)
    parentElement: Element
      @relationship(type: "TREE_FIRST_CHILD", direction: OUT)
    # Used for reverse lookup to see whether element is detached
    page: Page @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    props: Prop! @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)
    # element is the rootElement for this component
    parentComponent: Component
      @relationship(type: "COMPONENT_ROOT", direction: IN)
    # Used for the css set by the styling UI and manually. This is a stringified json object
    # that contains styles for different screen size breakpoints.
    # See interface for more details: IElementStyle
    style: String
    tailwindClassNames: [String!]
    # one element E1 will have childMapperPropKey that points to a prop which has an array of values. for each on these values we render a component  childMapperComponent  as a child of E1 passing this value as prop for this component. because E1 will contain other children we need chose what is the rendering position of this array of components
    # so a pointer to the array of props for the components
    childMapperPropKey: String
    # The component that we will map over
    childMapperComponent: Component
      @relationship(type: "CHILD_MAPPER_COMPONENT", direction: OUT)
    # Where to put the mapped children
    # the position of mapped children relative to the other children of the same element
    # So the host element will contain manually created elements. we need to merge them with the mapped ones so we set their position
    childMapperPreviousSibling: Element
      @relationship(type: "CHILD_MAPPER_PREVIOUS_SIBLING", direction: IN)
    renderForEachPropKey: String
    renderIfExpression: String
    preRenderAction: BaseAction
      @relationship(type: "PRE_RENDER_ELEMENT_ACTION", direction: OUT)
    postRenderAction: BaseAction
      @relationship(type: "POST_RENDER_ELEMENT_ACTION", direction: OUT)
    renderType: ElementRenderType!
      # There is bug for union type, need to use custom query
      # https://github.com/neo4j/graphql/issues/487
      @relationship(type: "ELEMENT_RENDER_TYPE", direction: OUT)
    # Pre-compute to savetime during rendering
    closestContainerNode: ContainerNode!
    dependantTypes: [AnyType!]! @customResolver(requires: "id")
    expanded: Boolean
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/hook.schema.ts

const hookSchema = (0,client_.gql) `
  type Hook {
    id: ID! @unique @settable(onUpdate: false)
    type: AtomType!
    config: Prop! @relationship(type: "CONFIG_OF_HOOK", direction: OUT)
    element: Element! @relationship(type: "HOOKS_OF_ELEMENT", direction: IN)
  }
`;

;// ../../libs/shared/abstract/core/src/page/page-kind.enum.ts

/**
 * We create the enum here then import into Neo4j graphql schema so we can get linting
 *
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
var __PageKind;
(function (__PageKind) {
    __PageKind["InternalServerError"] = "InternalServerError";
    __PageKind["NotFound"] = "NotFound";
    __PageKind["Provider"] = "Provider";
    __PageKind["Regular"] = "Regular";
})(__PageKind || (__PageKind = {}));

var IPageKindName;
(function (IPageKindName) {
    IPageKindName["InternalServerError"] = "500";
    IPageKindName["NotFound"] = "404";
    IPageKindName["Provider"] = "provider";
})(IPageKindName || (IPageKindName = {}));

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/page.schema.ts


const pageKindSchema = `enum PageKind {
  ${Object.values(__PageKind).join('\n')}
}`;
const allowFullAccessForPageOwner = `
{
  operations: [UPDATE, CREATE, DELETE]
  where: { node: { app: { owner: { auth0Id: "$jwt.sub" } } } }
}`;
const pageSchema = (0,client_.gql) `
  ${pageKindSchema}

  type Page {
    id: ID! @unique @settable(onUpdate: false)
    # appId-name format to make it unique across apps
    compositeKey: String! @unique
    name: String! @customResolver(requires: "app { id } compositeKey")
    slug: String! @customResolver(requires: "app { id } compositeKey")
    # The root of the elementTree
    rootElement: Element!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: OUT)
    # contains the rootElement, and its descendants
    elements: [Element!]!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: OUT)
    app: App! @relationship(type: "PAGES", direction: IN)
    store: Store! @relationship(type: "STORE_CONTAINER_NODE", direction: OUT)
    #getServerSideProps: String
    # this is an element on _app page tree inside of which child pages content is rendered
    # default is root "Body" element, but can be changed using dropdown on Page Inspector tab
    pageContentContainer: Element
      @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)
    kind: PageKind!
    # To protect a page attach it to a redirect
    redirect: Redirect
      @relationship(type: "REDIRECT_FROM_PROTECTED_PAGE", direction: OUT)
    # when the app will be deployed - the page will be available on this URL
    urlPattern: String!
  }
`;
// extend type Page
//   @authorization(
//     validate: [
//       ${allowReadAccess}
//       ${allowFullAccessForAdmin}
//       ${allowFullAccessForPageOwner}
//     ]
//   )

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/preference.schema.ts


const preferenceSchema = (0,client_.gql) `
  enum BreakpointType {
    Desktop
    MobilePortrait
    MobileLandscape
    Tablet
  }

  type Preference implements WithOwner ${authOwnerOrAdmin} {
    id: ID! @unique @settable(onUpdate: false)
    builderBreakpointType: BreakpointType!
    builderWidth: Float!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/prop.schema.ts

const propSchema = (0,client_.gql) `
  type Prop {
    id: ID! @unique @settable(onUpdate: false)
    data: String!
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/redirect.schema.ts

const redirectSchema = (0,client_.gql) `
  enum RedirectTargetType {
    """
    Redirect to a page in the same app
    """
    Page
    """
    Redirect responsible for fetching data from a resource
    """
    Url
  }

  type Redirect {
    id: ID! @unique @settable(onUpdate: false)
    source: Page!
      @relationship(type: "REDIRECT_FROM_PROTECTED_PAGE", direction: IN)
    targetType: RedirectTargetType!
    # target page should belong to the same app of source page
    # to make sure using the same domain on redirect
    targetPage: Page @relationship(type: "REDIRECT_TO_PAGE", direction: OUT)
    # the second option for redirect is using external url
    targetUrl: String
    # the auth guard to run to tell if we should redirect or not
    authGuard: AuthGuard! @relationship(type: "PAGE_AUTH_GUARD", direction: OUT)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/resource.schema.ts

const resourceSchema = (0,client_.gql) `
  enum ResourceType {
    GraphQl
    Rest
  }

  type Resource implements WithOwner {
    id: ID! @unique @settable(onUpdate: false)
    type: ResourceType!
    name: String!
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/store.schema.ts

const storeSchema = (0,client_.gql) `
  type Store {
    id: ID! @unique @settable(onUpdate: false)
    name: String!
    api: InterfaceType! @relationship(type: "STORE_STATE_API", direction: OUT)
    actions: [AnyAction!]! @relationship(type: "STORE_ACTION", direction: OUT)
    # container: ContainerNode!
    # @relationship(type: "STORE_CONTAINER_NODE", direction: IN)
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/tag.schema.ts

const tagSchema = (0,client_.gql) `
  type Tag implements WithOwner {
    id: ID! @unique @settable(onUpdate: false)
    name: String! @unique
    parent: Tag @relationship(type: "CHILDREN", direction: IN)
    children: [Tag!]! @relationship(type: "CHILDREN", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    atoms: [Atom!]! @relationship(type: "TAGS_WITH", direction: IN)
    # This is a custom resolver
    descendants: [Tag!]! @customResolver(requires: "id")
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/type/field.schema.ts

const fieldSchema = (0,client_.gql) `
  type Field {
    id: ID! @unique @settable(onUpdate: false)
    key: String!
    name: String
    nextSibling: Field @relationship(type: "FIELD_NEXT_SIBLING", direction: IN)
    prevSibling: Field @relationship(type: "FIELD_PREV_SIBLING", direction: OUT)
    description: String
    validationRules: String
    defaultValues: String
    fieldType: IBaseType! @relationship(type: "FIELD_TYPE", direction: OUT)
    # API the field belongs to
    api: InterfaceType! @relationship(type: "INTERFACE_FIELD", direction: IN)
  }
`;

;// ../../libs/shared/abstract/core/src/element/element-type.enum.ts

/**
 * Used to import to schema, we create in ts context so we can get type checking
 *
 * @deprecated
 */
var __ElementTypeKind;
(function (__ElementTypeKind) {
    /**
     * Pick any element in the current tree
     */
    __ElementTypeKind["AllElements"] = "AllElements";
    /**
     * Pick any element from the children of the current element
     */
    __ElementTypeKind["ChildrenOnly"] = "ChildrenOnly";
    /**
     * Pick any element from the descendants of the current element
     */
    __ElementTypeKind["DescendantsOnly"] = "DescendantsOnly";
    /**
     * Pick parents and siblings of parents of elements (used to move element)
     */
    __ElementTypeKind["ExcludeDescendantsElements"] = "ExcludeDescendantsElements";
})(__ElementTypeKind || (__ElementTypeKind = {}));

const elementTypeMap = (elementType) => ElementTypeKind[elementType];

;// ../../libs/backend/infra/adapter/neo4j/src/schema/type/type.schema.ts




const elementTypeTypeKindSchema = `enum ElementTypeKind {
  ${Object.values(__ElementTypeKind).join('\n')}
}`;
const typeSchema = (0,client_.gql) `
  enum TypeKind {
    PrimitiveType
    EnumType
    ArrayType
    InterfaceType
    LambdaType
    ElementType
    RenderPropType
    ReactNodeType
    UnionType
    CodeMirrorType
    PageType
    AppType
    ActionType
    RichTextType
  }

  type TypeReference {
    """
    The name of the resource referencing the type
    """
    name: String!
    """
    The type of resource - Atom, InterfaceType, etc.
    """
    label: String!
  }

  type Query {
    """
    Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion
    """
    isTypeDescendantOf(parentTypeId: ID!, descendantTypeId: ID!): Boolean
      @cypher(statement: """${isTypeDescendantOf_cypher_namespaceObject} AS isDescendant""", columnName: "isDescendant")

    """
    Returns a list of all Type and Atom entities that reference the type with the given id
    This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
    """
    getTypeReferences(typeId: ID!): [TypeReference!]
      @cypher(statement: """${getTypeReferences_cypher_namespaceObject} AS typeReferences""", columnName: "typeReferences")
  }

  interface IBaseType {
    id: ID!
    # Disable @settable so we get a discriminated union
    kind: TypeKind!
    name: String!
    # we don't need an @auth here, because the User's @auth already declares rules for connect/disconnect
    owner: User! @declareRelationship
    # This means the type is used by a field
    fieldRefs: [Field!]! @declareRelationship
  }

  interface WithDescendants {
    descendantTypesIds: [ID!]!
  }

  """
  Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean
  """
  type PrimitiveType implements IBaseType @node(labels: ["Type", "PrimitiveType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: PrimitiveType)
    name: String! @unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # There seems to be an issue with the unique constrain right now https://github.com/neo4j/graphql/issues/915
    primitiveKind: PrimitiveTypeKind! @unique
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  enum PrimitiveTypeKind {
    String
    Integer
    Boolean
    Number
  }

  """
  ArrayType Allows defining a variable number of items of a given type.
  Contains a reference to another type which is the array item type.
  """
  type ArrayType implements IBaseType & WithDescendants @node(labels: ["Type", "ArrayType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ArrayType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # ArrayTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]! @customResolver(requires: "id")
    itemType: IBaseType!
      @relationship(
        type: "ARRAY_ITEM_TYPE",
        direction: OUT,
      )
  }

  """
  Allows picking one of a set of types
  """
  type UnionType implements IBaseType & WithDescendants @node(labels: ["Type", "UnionType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: UnionType)
    name: String! @unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]! @customResolver(requires: "id")
    typesOfUnionType: [AnyType!]!
      @relationship(
        type: "UNION_TYPE_CHILD",
        direction: OUT,
      )
  }

  """
  Represents an object type with multiple fields
  """
  type InterfaceType implements IBaseType & WithDescendants @node(labels: ["Type", "InterfaceType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: InterfaceType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # InterfaceTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]! @customResolver(requires: "id")
    # List of atoms that have this interface as their api type
    apiOfAtoms: [Atom!]!
      @relationship(
        type: "ATOM_API",
        direction: IN
      )
    # Fields are defined as a set of list to other types
    fields: [Field!]!
      @relationship(
        type: "INTERFACE_FIELD",
        direction: OUT
      )
  }

  """
  Allows picking an element from the current tree
  Is passed to the rendered element as a React node
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ElementType implements IBaseType @node(labels: ["Type", "ElementType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ElementType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    """
    Allows scoping the type of element to only descendants, children or all elements
    """
    elementKind: ElementTypeKind!
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a function that takes props as input
  and returns a React element: '(props) => ReactNode'
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type RenderPropType implements IBaseType @node(labels: ["Type", "RenderPropType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: RenderPropType)
    name: String! @unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a React node: \`ReactNode\`
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ReactNodeType implements IBaseType @node(labels: ["Type", "ReactNodeType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ReactNodeType)
    name: String! @unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  ${elementTypeTypeKindSchema}

  """
  Allows choosing one of a set of allowed values.
  The value gets passed to the render pipe as a Enum Type Value id.
  The actual value must be de-referenced by the id.
  """
  type EnumType implements IBaseType @node(labels: ["Type", "EnumType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: EnumType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # Allows reverse lookup and get all api's enums
    # EnumTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    allowedValues: [EnumTypeValue!]!
      @relationship(
        type: "ALLOWED_VALUE",
        direction: OUT,
      )
  }

  type EnumTypeValue {
    enumType: EnumType @relationship(type: "ALLOWED_VALUE", direction: IN)
    id: ID!
    key: String!
    value: String!
  }

  """
  Allows picking a lambda
  """
  type LambdaType implements IBaseType @node(labels: ["Type", "LambdaType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: LambdaType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a page from the list of pages
  """
  type PageType implements IBaseType @node(labels: ["Type", "PageType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: PageType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a app from the list of apps
  """
  type AppType implements IBaseType @node(labels: ["Type", "AppType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: AppType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a app from the list of apps
  """
  type RichTextType implements IBaseType @node(labels: ["Type", "RichTextType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: RichTextType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a action from the list of actions
  """
  type ActionType implements IBaseType @node(labels: ["Type", "ActionType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ActionType)
    name: String! @unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows editing the value using a code mirror editor
  """
  type CodeMirrorType implements IBaseType @node(labels: ["Type", "CodeMirrorType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: CodeMirrorType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    language: CodeMirrorLanguage!
  }

  enum CodeMirrorLanguage {
    Typescript
    Javascript
    Css
    Json
    Graphql
    CssInJs
  }

  union AnyType =
    PrimitiveType |
    ArrayType |
    UnionType |
    InterfaceType |
    RenderPropType |
    ReactNodeType |
    EnumType |
    ActionType |
    ElementType |
    LambdaType |
    PageType |
    AppType |
    RichTextType |
    CodeMirrorType
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/pure.type-defs.ts



















const pureTypeDefs = (0,merge_.mergeTypeDefs)([
    commonSchema,
    userSchema,
    appSchema,
    fieldSchema,
    atomSchema,
    pageSchema,
    typeSchema,
    tagSchema,
    elementSchema,
    propSchema,
    preferenceSchema,
    hookSchema,
    componentSchema,
    storeSchema,
    actionSchema,
    resourceSchema,
    domainSchema,
    authGuardSchema,
    redirectSchema,
]);

;// ../../libs/backend/infra/adapter/neo4j/src/infra/ogm.provider.ts





const OgmProvider = {
    inject: [NEO4J_DRIVER_PROVIDER, PURE_RESOLVER_PROVIDER],
    provide: OGM_PROVIDER,
    useFactory: async (driver, pureResolvers) => {
        /**
         * Uses GraphQL under the hood, has some issues with typing for connect/disconnect
         */
        const ogm = new graphql_ogm_.OGM({
            // debug: true,
            driver,
            features: {
                excludeDeprecatedFields: {
                    aggregationFilters: true,
                    arrayFilters: true,
                    bookmark: true,
                    negationFilters: true,
                    nestedUpdateOperationsFields: true,
                    stringAggregation: true,
                },
                filters: {
                    String: {
                        MATCHES: true,
                    },
                },
            },
            /**
             * These cannot depend on OGM, or else will have circular dep
             */
            resolvers: pureResolvers,
            typeDefs: pureTypeDefs,
        });
        await ogm.init();
        // await ogm.checkNeo4jCompat({ driver })
        await ogm.assertIndexesAndConstraints({
            driver,
            options: { create: true },
        });
        return ogm;
    },
};

// EXTERNAL MODULE: ../../libs/shared/utils/src/prettify/prettify.ts
var prettify = __webpack_require__(8);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(19);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(4);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: external "prettier"
var external_prettier_ = __webpack_require__(20);
;// ../../libs/backend/infra/adapter/neo4j/src/infra/ogm.service.ts
var ogm_service_a;








let OgmService = class OgmService {
    constructor(ogm) {
        Object.defineProperty(this, "ogm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ogm
        });
        Object.defineProperty(this, "actionType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "appType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "arrayType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "atom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "authGuard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "codeAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "codeMirrorType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "component", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "domain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elementType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumTypeValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "field", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "interfaceType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lambdaType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pageType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "preference", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "primitiveType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reactNodeType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "redirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderPropType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "resource", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "richTextType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tag", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "unionType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get ActionType() {
        return (this.actionType ??= this.ogm.model('ActionType'));
    }
    get ApiAction() {
        return (this.apiAction ??= this.ogm.model('ApiAction'));
    }
    get App() {
        return (this.app ??= this.ogm.model('App'));
    }
    get AppType() {
        return (this.appType ??= this.ogm.model('AppType'));
    }
    get ArrayType() {
        return (this.arrayType ??= this.ogm.model('ArrayType'));
    }
    get Atom() {
        return (this.atom ??= this.ogm.model('Atom'));
    }
    get AuthGuard() {
        return (this.authGuard ??= this.ogm.model('AuthGuard'));
    }
    get CodeAction() {
        return (this.codeAction ??= this.ogm.model('CodeAction'));
    }
    get CodeMirrorType() {
        return (this.codeMirrorType ??= this.ogm.model('CodeMirrorType'));
    }
    get Component() {
        return (this.component ??= this.ogm.model('Component'));
    }
    get Domain() {
        return (this.domain ??= this.ogm.model('Domain'));
    }
    get Element() {
        return (this.element ??= this.ogm.model('Element'));
    }
    get ElementType() {
        return (this.elementType ??= this.ogm.model('ElementType'));
    }
    get EnumType() {
        return (this.enumType ??= this.ogm.model('EnumType'));
    }
    get EnumTypeValue() {
        return (this.enumTypeValue ??= this.ogm.model('EnumTypeValue'));
    }
    get Field() {
        return (this.field ??= this.ogm.model('Field'));
    }
    get InterfaceType() {
        return (this.interfaceType ??= this.ogm.model('InterfaceType'));
    }
    get LambdaType() {
        return (this.lambdaType ??= this.ogm.model('LambdaType'));
    }
    get Page() {
        return (this.page ??= this.ogm.model('Page'));
    }
    get PageType() {
        return (this.pageType ??= this.ogm.model('PageType'));
    }
    get Preference() {
        return (this.preference ??= this.ogm.model('Preference'));
    }
    get PrimitiveType() {
        return (this.primitiveType ??= this.ogm.model('PrimitiveType'));
    }
    get Prop() {
        return (this.prop ??= this.ogm.model('Prop'));
    }
    get ReactNodeType() {
        return (this.reactNodeType ??= this.ogm.model('ReactNodeType'));
    }
    get Redirect() {
        return (this.redirect ??= this.ogm.model('Redirect'));
    }
    get RenderPropType() {
        return (this.renderPropType ??= this.ogm.model('RenderPropType'));
    }
    get Resource() {
        return (this.resource ??= this.ogm.model('Resource'));
    }
    get RichTextType() {
        return (this.richTextType ??= this.ogm.model('RichTextType'));
    }
    get Store() {
        return (this.store ??= this.ogm.model('Store'));
    }
    get Tag() {
        return (this.tag ??= this.ogm.model('Tag'));
    }
    get UnionType() {
        return (this.unionType ??= this.ogm.model('UnionType'));
    }
    get User() {
        return (this.user ??= this.ogm.model('User'));
    }
    async generate() {
        const outFile = external_path_default().resolve(process.cwd(), 'libs/backend/abstract/codegen', 'src/ogm-types.gen.ts');
        const output = await (0,graphql_ogm_.generate)({
            noWrite: true,
            ogm: this.ogm,
            outFile,
        })
            .then((data) => {
            console.info('OGM type generated!!');
            // Change optional to required
            return data?.replace(/__typename\?:/g, '__typename:');
        })
            .catch((error) => console.error(`[generateOgmTypes] ${(0,prettify.prettifyForConsole)(error)}`));
        // Get prettier config
        const options = await (0,external_prettier_.resolveConfig)(outFile);
        // Format
        const formatted = await (0,external_prettier_.format)(`${output}`, {
            ...options,
            filepath: outFile,
        });
        /**
         * Save to abstract folder as well for exporting just the interfaces
         */
        external_fs_.writeFileSync(outFile, formatted);
    }
};
OgmService = (0,external_tslib_.__decorate)([
    (0,common_.Injectable)(),
    (0,external_tslib_.__param)(0, (0,common_.Inject)(OGM_PROVIDER)),
    (0,external_tslib_.__metadata)("design:paramtypes", [typeof (ogm_service_a = typeof graphql_ogm_.OGM !== "undefined" && graphql_ogm_.OGM) === "function" ? ogm_service_a : Object])
], OgmService);


;// ../../libs/backend/infra/adapter/neo4j/src/infra/ogm.module.ts









/**
 * Used across modules, is stateless
 */
let OgmModule = class OgmModule {
};
OgmModule = (0,external_tslib_.__decorate)([
    (0,common_.Module)({
        exports: [OGM_PROVIDER, OgmService],
        imports: [Neo4jModule, DigitaloceanModule],
        providers: [
            OgmProvider,
            OgmService,
            // OGM uses pure resolvers only
            PureResolverProvider,
            TypeResolverProvider,
        ],
    })
], OgmModule);


;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/user-selection-set.ts
const userSelectionSet = `
  id
  auth0Id
  username
  email
  roles
`;
const ownerFieldSelectionSet = `
  owner {
    id
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/tag-selection-set.ts

/**
 * Need `name` for `parent` & `children` as lookup key, since id can change during import/export
 */
const tagSelectionSet = `
  id
  name
  parent {
    id
    name
  }
  children {
    id
    name
  }
  ${ownerFieldSelectionSet}
`;
const exportTagSelectionSet = `
  id
  name
  parent {
    id
    name
  }
  children {
    id
    name
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/field-selection-set.ts
const fieldSelectionSet = `
  id
  key
  name
  description
  validationRules
  defaultValues
  prevSibling {
    id
  }
  nextSibling {
    id
  }
  fieldType {
    __typename
    id
    kind
    name
  }
  api {
    id
  }
`;
const exportFieldSelectionSet = `
  id
  key
  name
  description
  validationRules
  defaultValues
  fieldType {
    __typename
    id
    kind
    name
  }
  api {
    id
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/type-selection-set.ts


const baseTypeSelection = `
  __typename
  id
  kind
  name
  ${ownerFieldSelectionSet}
`;
const primitiveTypeSelectionSet = `
  ${baseTypeSelection}
  primitiveKind
`;
const codeMirrorTypeSelectionSet = `
  ${baseTypeSelection}
  language
`;
const arrayTypeSelectionSet = `
  ${baseTypeSelection}
  itemType {
    ... on IBaseType {
      ${baseTypeSelection}
    }
  }
`;
const enumTypeSelectionSet = `
  ${baseTypeSelection}
  allowedValues {
    id
    key
    value
  }
`;
const unionTypeSelectionSet = `
  ${baseTypeSelection}
  typesOfUnionType {
    ... on IBaseType {
      ${baseTypeSelection}
    }
  }
`;
const interfaceTypeSelectionSet = `
  ${baseTypeSelection}
  fields {
    ${fieldSelectionSet}
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/atom-selection-set.ts



const atomSelectionSet = `
  __typename
  id
  name
  ${ownerFieldSelectionSet}
  type
  api {
    ${interfaceTypeSelectionSet}
  }
  icon
  tags {
    ${tagSelectionSet}
  }
  suggestedChildren {
    id
    name
    type
  }
  requiredParents {
    id
    name
    type
  }
  externalCssSource
  externalJsSource
  externalSourceType
`;
const exportAtomSelectionSet = `
  __typename
  id
  name
  type
  api {
    id
  }
  icon
  tags {
    ${exportTagSelectionSet}
  }
  suggestedChildren {
    id
    name
    type
  }
  requiredParents {
    id
    name
    type
  }
  externalCssSource
  externalJsSource
  externalSourceType
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/prop-selection-set.ts
const propSelectionSet = `
  id
  data
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/element-selection-set.ts


const renderElementType = `
  renderType {
    ... on Atom {
      ${atomSelectionSet}
    }
    ... on Component {
      id
      __typename
      api {
        id
      }
    }
}
`;
const baseElementSelectionSet = `
  id
  name
  slug
  compositeKey
  style
  tailwindClassNames
  parentComponent {
    id
    name
  }
  parentElement {
    id
  }
  prevSibling {
    id
  }
  nextSibling {
    id
  }
  firstChild {
    id
  }
  childMapperPreviousSibling {
    id
  }
  props {
    ${propSelectionSet}
  }
  renderForEachPropKey
  childMapperPropKey
  childMapperComponent {
    id
    name
    compositeKey
  }
  renderIfExpression
  preRenderAction {
    id
    type
  }
  postRenderAction {
    id
    type
  }
  expanded
`;
const elementSelectionSet = `
  ${baseElementSelectionSet}
  ${renderElementType}
`;
const exportElementSelectionSet = `
  ${baseElementSelectionSet}
  ${renderElementType}
`;

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/utils/get-descendant-elements.ts


const getElementWithDescendants = async (neo4jService, ogmService, parent) => {
    const descendantIds = await neo4jService.withReadTransaction(async (txn) => {
        const { records } = await txn.run(getDescendants_cypher_namespaceObject, {
            rootId: parent.id,
        });
        return (records[0]
            ?.get(0)
            .map((descendant) => descendant.properties['id']) ?? []);
    });
    const elements = await ogmService.Element.find({
        selectionSet: `{ ${elementSelectionSet} }`,
        where: { id_IN: [parent.id, ...descendantIds] },
    });
    return elements;
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/component/component.constant.ts
const COMPONENT_RESOLVER_PROVIDER = 'COMPONENT_RESOLVER_PROVIDER';

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/component/component.resolver.provider.ts




const ComponentResolverProvider = {
    inject: [OgmService, Neo4jService],
    provide: COMPONENT_RESOLVER_PROVIDER,
    useFactory: async (ogmService, neo4jService) => {
        const elements = async (parent) => {
            const elementWithDescendants = await getElementWithDescendants(neo4jService, ogmService, parent.rootElement);
            return elementWithDescendants;
        };
        return {
            Component: {
                elements,
            },
        };
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/element/element.constant.ts
const ELEMENT_RESOLVER_PROVIDER = 'ELEMENT_RESOLVER_PROVIDER';

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/element/util/get-dependant-types.ts



/**
 * This attempts to get all dependent types for an element
 */
const getDependantTypes = (neo4jService, ogmService, elementRef) => {
    return neo4jService.withReadTransaction(async (txn) => {
        const elements = await ogmService.Element.find({
            selectionSet: `{ ${elementSelectionSet} }`,
            where: { id: elementRef.id },
        });
        const element = elements[0];
        const apiId = element?.renderType.api.id;
        const { records } = await txn.run(getElementDependantTypes_cypher_namespaceObject, {
            id: apiId,
        });
        const allTypes = records.map((rec) => ({
            id: rec.get(0).id,
            typeName: rec.get(0).__typename,
        }));
        // UnionType, ArrayType, EnumType, InterfaceType
        const types = allTypes.filter((type) => type.typeName !== 'Field');
        const typesToFetch = [
            ...types,
            // Types used in fields
            ...(await getFieldTypesToFetch(ogmService, allTypes)),
        ];
        const dependantTypes = await fetchTypes(ogmService, typesToFetch);
        return dependantTypes.flat();
    });
};
const fetchTypes = async (ogmService, types) => {
    const promises = [];
    promises.push(ogmService.ArrayType.find({
        selectionSet: `{ ${arrayTypeSelectionSet} }`,
        where: { id_IN: filterByType(TypeKind.ArrayType, types) },
    }));
    promises.push(ogmService.EnumType.find({
        selectionSet: `{ ${enumTypeSelectionSet} }`,
        where: { id_IN: filterByType(TypeKind.EnumType, types) },
    }));
    promises.push(ogmService.InterfaceType.find({
        selectionSet: `{ ${interfaceTypeSelectionSet} }`,
        where: { id_IN: filterByType(TypeKind.InterfaceType, types) },
    }));
    promises.push(ogmService.UnionType.find({
        selectionSet: `{ ${unionTypeSelectionSet} }`,
        where: { id_IN: filterByType(TypeKind.UnionType, types) },
    }));
    promises.push(ogmService.PrimitiveType.find({
        selectionSet: `{ ${primitiveTypeSelectionSet} }`,
        where: { id_IN: filterByType(TypeKind.PrimitiveType, types) },
    }));
    promises.push(ogmService.ReactNodeType.find({
        selectionSet: `{ ${baseTypeSelection} }`,
        where: { id_IN: filterByType(TypeKind.ReactNodeType, types) },
    }));
    promises.push(ogmService.RichTextType.find({
        selectionSet: `{ ${baseTypeSelection} }`,
        where: { id_IN: filterByType(TypeKind.RichTextType, types) },
    }));
    promises.push(ogmService.CodeMirrorType.find({
        selectionSet: `{ ${codeMirrorTypeSelectionSet} }`,
        where: { id_IN: filterByType(TypeKind.CodeMirrorType, types) },
    }));
    promises.push(ogmService.RenderPropType.find({
        selectionSet: `{ ${baseTypeSelection} }`,
        where: { id_IN: filterByType(TypeKind.RenderPropType, types) },
    }));
    promises.push(ogmService.ActionType.find({
        selectionSet: `{ ${baseTypeSelection} }`,
        where: { id_IN: filterByType(TypeKind.ActionType, types) },
    }));
    return await Promise.all(promises);
};
const filterByType = (typeName, allTypes) => allTypes.filter((type) => type.typeName === typeName).map((type) => type.id);
const getFieldTypesToFetch = async (ogmService, allTypes) => {
    const fieldsList = allTypes.filter((type) => type.typeName === 'Field');
    const fields = await ogmService.Field.find({
        selectionSet: `{ ${fieldSelectionSet} }`,
        where: { id_IN: fieldsList.map((field) => field.id) },
    });
    // Filtered types are already fetched in App query
    // this is to avoid getting the same type multiple times
    // when used in multiple fields
    return fields
        .filter((field) => ![
        TypeKind.ActionType,
        TypeKind.PrimitiveType,
        TypeKind.ReactNodeType,
        TypeKind.RenderPropType,
        TypeKind.RichTextType,
    ].includes(field.fieldType.kind))
        .map((field) => ({
        id: field.fieldType.id,
        typeName: field.fieldType.kind,
    }));
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/element/element.resolver.provider.ts




const ElementResolverProvider = {
    inject: [OgmService, Neo4jService],
    provide: ELEMENT_RESOLVER_PROVIDER,
    useFactory: async (ogmService, neo4jService) => {
        const dependantTypes = (parent) => getDependantTypes(neo4jService, ogmService, parent);
        return {
            Element: {
                dependantTypes,
            },
        };
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/ogm-resolver.constant.ts
const OGM_RESOLVER_PROVIDER = 'OGM_RESOLVER_PROVIDER';

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/page/page.constant.ts
const PAGE_RESOLVER_PROVIDER = 'PAGE_RESOLVER_PROVIDER';

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/tag/tag.constant.ts
const TAG_RESOLVER_PROVIDER = 'TAG_RESOLVER_PROVIDER';

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/ogm-resolver.provider.ts






/**
 * These resolvers depend on OGM provider
 */
const OgmResolverProvider = {
    inject: [
        COMPONENT_RESOLVER_PROVIDER,
        ELEMENT_RESOLVER_PROVIDER,
        PAGE_RESOLVER_PROVIDER,
        TAG_RESOLVER_PROVIDER,
    ],
    provide: OGM_RESOLVER_PROVIDER,
    useFactory: async (componentResolver, elementResolver, pageResolver, tagResolver) => {
        return (0,merge_.mergeResolvers)([
            componentResolver,
            elementResolver,
            pageResolver,
            tagResolver,
        ]);
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/page/page.resolver.provider.ts




const PageResolverProvider = {
    inject: [OgmService, Neo4jService],
    provide: PAGE_RESOLVER_PROVIDER,
    useFactory: async (ogmService, neo4jService) => {
        const elements = async (parent) => {
            const elementWithDescendants = await getElementWithDescendants(neo4jService, ogmService, parent.rootElement);
            return elementWithDescendants;
        };
        return {
            Page: {
                elements,
            },
        };
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/resolver/ogm-resolver/tag/tag.resolver.provider.ts




const TagResolverProvider = {
    inject: [OgmService, Neo4jService],
    provide: TAG_RESOLVER_PROVIDER,
    useFactory: async (ogmService, neo4jService) => {
        const descendants = (parent) => neo4jService.withReadTransaction(async (txn) => {
            /**
             * We can still use the same query, but we get ID from context instead
             */
            const { records } = await txn.run(tagDescendants_cypher_namespaceObject, { rootId: parent.id });
            return (await Promise.all(records[0]?.get(0).map(async (descendant) => {
                const id = descendant.properties['id'];
                const tag = await ogmService.Tag.find({
                    selectionSet: `{ ${tagSelectionSet} }`,
                    where: { id },
                });
                return tag;
            }))).flat();
        });
        return {
            Tag: {
                descendants,
            },
        };
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/schema/schema.constant.ts
const GRAPHQL_SCHEMA_PROVIDER = 'GRAPHQL_SCHEMA_PROVIDER';

// EXTERNAL MODULE: ../../libs/shared/config/src/env/env.ts + 10 modules
var env = __webpack_require__(5);
// EXTERNAL MODULE: external "@neo4j/graphql"
var graphql_ = __webpack_require__(22);
;// ../../libs/backend/infra/adapter/neo4j/src/schema/model/element.ogm.schema.ts

const elementOgmSchema = (0,client_.gql) `
  type Element {
    dependantTypes: [AnyType!]! @customResolver(requires: "id")
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/schema/ogm.type-defs.ts




















/**
 * `mergeTypeDefs` allow schema merging for type re-declaration
 */
const ogmTypeDefs = (0,merge_.mergeTypeDefs)([
    commonSchema,
    userSchema,
    appSchema,
    fieldSchema,
    atomSchema,
    pageSchema,
    typeSchema,
    tagSchema,
    elementSchema,
    elementOgmSchema,
    propSchema,
    hookSchema,
    componentSchema,
    storeSchema,
    actionSchema,
    resourceSchema,
    domainSchema,
    authGuardSchema,
    redirectSchema,
    preferenceSchema,
]);

;// ../../libs/backend/infra/adapter/neo4j/src/schema/schema.provider.ts








/**
 * Your web app has a session (that’s the cookie) used to verify the user.
 *
 * Your M2M app is using a M2M cookie, since there is no session or user.
 *
 * This is kind of a fuzzy case: the “backend” serves as both a backend to your web app AND an API for your M2M app.
 *
 * You can configure your middleware to respect both the session and the token
 *
 * https://community.auth0.com/t/authenticating-users-and-m2m-with-same-middleware/77369/5
 */
const GraphQLSchemaProvider = {
    inject: [
        NEO4J_DRIVER_PROVIDER,
        PURE_RESOLVER_PROVIDER,
        OGM_RESOLVER_PROVIDER,
    ],
    provide: GRAPHQL_SCHEMA_PROVIDER,
    useFactory: async (driver, pureResolvers, ogmResolvers) => {
        try {
            const neo4jGraphQL = new graphql_.Neo4jGraphQL({
                driver,
                features: {
                    authorization: {
                        key: {
                            /**
                             * JWK (JSON Web Key) - allows applications to retrieve public keys programmatically
                             *
                             * PEM (Privacy Enhanced Mail ) - Certificate of Base 64 encoded public key certificate
                             *
                             * - The JWK contains the public certificate in addition to other claims about the key.
                             *
                             * https://community.auth0.com/t/jwk-vs-pem-what-is-the-difference/61927
                             */
                            url: new URL('.well-known/jwks.json', (0,env.getEnv)().auth0.issuerBaseUrl).href,
                        },
                    },
                    filters: {
                        String: {
                            MATCHES: true,
                        },
                    },
                    subscriptions: true,
                },
                resolvers: (0,merge_.mergeResolvers)([pureResolvers, ogmResolvers]),
                typeDefs: ogmTypeDefs,
            });
            const schema = await neo4jGraphQL.getSchema();
            // await neo4jGraphQL.checkNeo4jCompat({ driver })
            await neo4jGraphQL.assertIndexesAndConstraints({
                driver,
                options: { create: true },
            });
            return schema;
        }
        catch (error) {
            console.error('Error initializing GraphQL Schema:', error);
            throw error;
        }
    },
};

;// ../../libs/backend/infra/adapter/neo4j/src/graphql-schema.module.ts













let GraphQLSchemaModule = class GraphQLSchemaModule {
};
GraphQLSchemaModule = (0,external_tslib_.__decorate)([
    (0,common_.Module)({
        exports: [GRAPHQL_SCHEMA_PROVIDER],
        imports: [Neo4jModule, OgmModule, DigitaloceanModule],
        providers: [
            TypeResolverProvider,
            PureResolverProvider,
            OgmResolverProvider,
            // Required for OGM resolver above
            ComponentResolverProvider,
            ElementResolverProvider,
            PageResolverProvider,
            TagResolverProvider,
            // Exports this
            GraphQLSchemaProvider,
        ],
    })
], GraphQLSchemaModule);


;// ../../libs/backend/infra/adapter/neo4j/src/infra/index.ts








;// ../../libs/backend/infra/adapter/neo4j/src/resolver/pure-resolver/index.ts


;// ../../libs/backend/infra/adapter/neo4j/src/resolver/utils/index.ts


;// ../../libs/backend/infra/adapter/neo4j/src/resolver/index.ts



;// ../../libs/backend/infra/adapter/neo4j/src/schema/index.ts




;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/action-selection-set.ts
const baseActionSelectionSet = `
  __typename
  id
  name
  type
  store {
    id
  }
`;
const edgeSelectionProperties = `
  ... on CodeAction {
    id
    name
  }
  ... on ApiAction {
    id
    name
  }
`;
const apiActionSelectionSet = `
  ${baseActionSelectionSet}
  successAction {
    ${edgeSelectionProperties}
  }
  errorAction {
    ${edgeSelectionProperties}
  }
  resource {
    id
  }
  config {
    data
    id
  }
`;
const codeActionSelectionSet = `
  ${baseActionSelectionSet}
  code
`;
const actionSelectionSet = `{
  ... on CodeAction {
    ${codeActionSelectionSet}
  }
  ... on ApiAction {
    ${apiActionSelectionSet}
  }
}`;
const exportCodeActionSelectionSet = `{
  ${baseActionSelectionSet}
  code
}`;
const exportApiActionSelectionSet = `{
  ${baseActionSelectionSet}
  successAction {
    ${edgeSelectionProperties}
  }
  errorAction {
    ${edgeSelectionProperties}
  }
  resource {
    id
  }
  config {
    data
    id
  }
}`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/app-selection-set.ts

const baseAppSelectionSet = `
  __typename
  id
  name
  slug
  domains {
    id
    name
    app {
      id
    }
  }
  pages {
    id
  }
`;
const appSelectionSet = `
  ${baseAppSelectionSet}
  ${ownerFieldSelectionSet}
`;
const exportAppSelectionSet = `
  ${baseAppSelectionSet}
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/resource-selection-set.ts

const resourceSelectionSet = `
  id
  type
  name
  config {
    ${propSelectionSet}
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/auth-guard-selection-set.ts


const authGuardSelectionSet = `
  id
  name
  responseTransformer
  config {
    ${propSelectionSet}
  }
  resource {
    ${resourceSelectionSet}
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/store-selection-set.ts


const storeSelectionSet = `
  id
  name
  api {
    id
  }
  actions ${actionSelectionSet}
`;
const exportStoreSelectionSet = `
  id
  name
  api {
    ${interfaceTypeSelectionSet}
  }
  actions ${actionSelectionSet}
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/component-selection-set.ts





const componentSelectionSet = `
  __typename
  id
  name
  ${ownerFieldSelectionSet}
  rootElement {
    id
  }
  props {
    ${propSelectionSet}
  }
  store {
    id
  }
  api {
    id
  }
`;
const exportComponentSelectionSet = `
  __typename
  id
  name
  rootElement {
    ${exportElementSelectionSet}
  }
  props {
    ${propSelectionSet}
  }
  store {
    ${exportStoreSelectionSet}
  }
  api {
    ${interfaceTypeSelectionSet}
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/domain-selection-set.ts
const domainSelectionSet = `
  id
  name
  app {
    id
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/page-selection-set.ts

const basePageSelectionSet = `
  app {
    id
    name
    owner {
      auth0Id
    }
  }
  id
  name
  slug
  kind
  rootElement {
    id
    name
  }
  pageContentContainer {
    id
    name
  }
  urlPattern
`;
const pageSelectionSet = `
  ${basePageSelectionSet}
  store {
    id
  }
`;
const exportPageSelectionSet = `
  ${basePageSelectionSet}
  store {
     ${exportStoreSelectionSet}
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/preference-selection-set.ts
const preferenceSelectionSet = `
  __typename
  builderBreakpointType
  builderWidth
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/redirect-selection-set.ts

const redirectSelectionSet = `
  id
  source {
    id
  }
  targetType
  targetPage {
    id
    urlPattern
  }
  targetUrl
  authGuard {
    ${authGuardSelectionSet}
  }
`;

;// ../../libs/backend/infra/adapter/neo4j/src/selectionSet/index.ts


















// EXTERNAL MODULE: external "@nestjs/apollo"
var apollo_ = __webpack_require__(23);
// EXTERNAL MODULE: external "@nestjs/graphql"
var external_nestjs_graphql_ = __webpack_require__(24);
// EXTERNAL MODULE: external "@nestjs/passport"
var passport_ = __webpack_require__(25);
// EXTERNAL MODULE: external "@nestjs/testing"
var testing_ = __webpack_require__(26);
;// ../../libs/backend/infra/adapter/neo4j/src/test/setup.ts







const nestNeo4jGraphqlModule = external_nestjs_graphql_.GraphQLModule.forRootAsync({
    driver: apollo_.ApolloDriver,
    imports: [GraphQLSchemaModule],
    inject: [GRAPHQL_SCHEMA_PROVIDER],
    useFactory: async (graphqlSchema) => {
        return {
            context: (context) => {
                return {
                    ...context,
                    jwt: {
                        // Add roles that would satisfy your @authorization rules
                        roles: ['Admin'],
                    },
                };
            },
            schema: graphqlSchema,
        };
    },
});
const setupTestingContext = async (metadata = {}) => {
    const module = await testing_.Test.createTestingModule({
        imports: [
            nestNeo4jGraphqlModule,
            Neo4jModule,
            OgmModule,
            ...(metadata.imports ?? []),
        ],
    })
        .overrideGuard((0,passport_.AuthGuard)('jwt'))
        .useValue({ canActivate: () => true })
        .compile();
    const databaseService = module.get(DatabaseService);
    const ogmService = module.get(OgmService);
    const nestApp = module.createNestApplication();
    const beforeAll = async () => {
        await nestApp.init();
        await databaseService.resetDatabase();
    };
    const afterAll = async () => {
        await nestApp.close();
    };
    return {
        afterAll,
        beforeAll,
        module,
        nestApp,
    };
};

;// ../../libs/backend/infra/adapter/neo4j/src/index.ts










/***/ })

};
;