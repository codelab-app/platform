# Neo4j Schema Non-List @relationship Fields

This document lists all instances where @relationship directive is used on non-array fields, which is deprecated according to the warning: "Using @relationship directive on a non-list element is deprecated".

## Summary

Total files with non-list relationships: 15
Total non-list relationship fields: 55

## Detailed List by File

### 1. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/action.schema.ts`

- **Line 29**: `store: Store! @relationship(type: "STORE_ACTION", direction: IN)`
- **Line 30-31**: `preRenderElement: Element @relationship(type: "PRE_RENDER_ELEMENT_ACTION", direction: IN)`
- **Line 32-33**: `postRenderElement: Element @relationship(type: "POST_RENDER_ELEMENT_ACTION", direction: IN)`
- **Line 44**: `store: Store! @relationship(type: "STORE_ACTION", direction: IN)`
- **Line 45-46**: `preRenderElement: Element @relationship(type: "PRE_RENDER_ELEMENT_ACTION", direction: IN)`
- **Line 47-48**: `postRenderElement: Element @relationship(type: "POST_RENDER_ELEMENT_ACTION", direction: IN)`
- **Line 52-53**: `successAction: AnyAction @relationship(type: "SUCCESS_ACTION", direction: OUT)`
- **Line 54**: `errorAction: AnyAction @relationship(type: "ERROR_ACTION", direction: OUT)`
- **Line 59**: `resource: Resource! @relationship(type: "RESOURCE_ACTION", direction: OUT)`
- **Line 60**: `config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)`

### 2. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/app.schema.ts`

- **Line 8**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`

### 3. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/auth-guard.schema.ts`

- **Line 7-8**: `resource: Resource! @relationship(type: "RESOURCE_OF_AUTH_GUARD", direction: OUT)`
- **Line 9**: `config: Prop! @relationship(type: "AUTH_GUARD_CONFIG", direction: OUT)`
- **Line 12**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`

### 4. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/component.schema.ts`

- **Line 12**: `rootElement: Element! @relationship(type: "COMPONENT_ROOT_ELEMENT", direction: OUT)`
- **Line 15**: `api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)`
- **Line 16**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 17**: `store: Store! @relationship(type: "STORE_CONTAINER_NODE", direction: OUT)`
- **Line 18**: `props: Prop! @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)`

### 5. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/domain.schema.ts`

- **Line 15**: `app: App! @relationship(type: "APP_DOMAIN", direction: OUT)`

### 6. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/hook.schema.ts`

- **Line 7**: `config: Prop! @relationship(type: "CONFIG_OF_HOOK", direction: OUT)`
- **Line 8**: `element: Element! @relationship(type: "HOOKS_OF_ELEMENT", direction: IN)`

### 7. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/preference.schema.ts`

- **Line 30**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`

### 8. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/redirect.schema.ts`

- **Line 17-18**: `source: Page! @relationship(type: "REDIRECT_FROM_PROTECTED_PAGE", direction: IN)`
- **Line 22**: `targetPage: Page @relationship(type: "REDIRECT_TO_PAGE", direction: OUT)`
- **Line 26**: `authGuard: AuthGuard! @relationship(type: "PAGE_AUTH_GUARD", direction: OUT)`

### 9. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/resource.schema.ts`

- **Line 13**: `config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)`
- **Line 14**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`

### 10. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/store.schema.ts`

- **Line 7**: `api: InterfaceType! @relationship(type: "STORE_STATE_API", direction: OUT)`

### 11. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/tag.schema.ts`

- **Line 7**: `parent: Tag @relationship(type: "CHILDREN", direction: IN)`
- **Line 9**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`

### 12. `/libs/backend/infra/adapter/neo4j-schema/src/schema/type/field.schema.ts`

- **Line 8**: `nextSibling: Field @relationship(type: "FIELD_SIBLING", direction: IN)`
- **Line 9**: `prevSibling: Field @relationship(type: "FIELD_SIBLING", direction: OUT)`
- **Line 13**: `fieldType: IBaseType! @relationship(type: "FIELD_TYPE", direction: OUT)`
- **Line 15**: `api: InterfaceType! @relationship(type: "INTERFACE_FIELD", direction: IN)`

### 13. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/atom.schema.ts`

- **Line 15**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 19**: `api: InterfaceType! @relationship(type: "ATOM_API", direction: OUT)`

### 14. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/user.schema.ts`

- **Line 79**: `preferences: Preference! @relationship(type: "OWNED_BY", direction: IN)`

### 15. `/libs/backend/infra/adapter/neo4j-schema/src/schema/type/type.schema.ts`

- **Line 80**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 101**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 105-109**: `itemType: IBaseType! @relationship(type: "ARRAY_ITEM_TYPE", direction: OUT)`
- **Line 119**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 136**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 168**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 191**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 209**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 224**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 236**: `enumType: EnumType @relationship(type: "ALLOWED_VALUE", direction: IN)`
- **Line 249**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 260**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 271**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 282**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 293**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`
- **Line 304**: `owner: User! @relationship(type: "OWNED_BY", direction: OUT)`

### 16. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/element.schema.ts`

- **Line 12**: `nextSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)`
- **Line 13**: `prevSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)`
- **Line 14**: `firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)`
- **Line 15-16**: `parentElement: Element @relationship(type: "TREE_FIRST_CHILD", direction: OUT)`
- **Line 18**: `page: Page @relationship(type: "PAGE_ROOT_ELEMENT", direction: IN)`
- **Line 19**: `props: Prop! @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)`
- **Line 21-22**: `parentComponent: Component @relationship(type: "COMPONENT_ROOT_ELEMENT", direction: IN)`
- **Line 32-33**: `childMapperComponent: Component @relationship(type: "CHILD_MAPPER_COMPONENT", direction: OUT)`
- **Line 37-38**: `childMapperPreviousSibling: Element @relationship(type: "CHILD_MAPPER_PREVIOUS_SIBLING", direction: IN)`
- **Line 45-46**: `renderType: ElementRenderType! @relationship(type: "ELEMENT_RENDER_TYPE", direction: OUT)`
- **Line 48**: `closestContainerNode: ContainerNode!`

### 17. `/libs/backend/infra/adapter/neo4j-schema/src/schema/model/page.schema.ts`

- **Line 24-25**: `rootElement: Element! @relationship(type: "PAGE_ROOT_ELEMENT", direction: OUT)`
- **Line 28**: `app: App! @relationship(type: "PAGES", direction: IN)`
- **Line 29**: `store: Store! @relationship(type: "STORE_CONTAINER_NODE", direction: OUT)`
- **Line 33-34**: `pageContentContainer: Element @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)`
- **Line 37-38**: `redirect: Redirect @relationship(type: "REDIRECT_FROM_PROTECTED_PAGE", direction: OUT)`

## Common Patterns

1. **Owner relationships**: Many entities have `owner: User!` relationships
2. **Configuration relationships**: Several entities reference `config: Prop!`
3. **API/Type relationships**: Components and stores reference `api: InterfaceType!`
4. **Tree structure relationships**: Elements have parent/child/sibling relationships
5. **Store relationships**: Pages and components reference their associated store

## Recommended Action

To address the deprecation warning, these non-list relationships should be updated to use array syntax with appropriate cardinality constraints, or the Neo4j GraphQL library should be updated to a version that properly supports non-list relationships without deprecation warnings.