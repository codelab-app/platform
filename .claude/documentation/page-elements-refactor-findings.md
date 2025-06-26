# Page-Elements Refactoring Findings

## Key Discoveries

### 1. Union Types Not Supported for Relationships
Neo4j GraphQL does not support union types for `@relationship` directives. The attempt to use `parent: ElementParent` (where `ElementParent = Element | Page`) failed during codegen.

### 2. Current Schema Structure
- `Page.rootElement` uses `PAGE_ROOT_ELEMENT` relationship
- `Page.elements` uses `PAGE_ELEMENTS` relationship  
- `Element.page` uses `PAGE_ELEMENTS` relationship (reverse direction)
- These are two separate relationships serving different purposes

### 3. The Real Issue
The `PAGE_ELEMENTS` relationship is not being established when elements are created. Currently:
- Elements are created with `page: { id }` which creates Element→Page direction
- But the Page→Element direction for `elements` array is never established
- This causes `page.elements` queries to return empty arrays

### 4. Constraint with TREE_FIRST_CHILD
The `TREE_FIRST_CHILD` relationship is bidirectional:
- `firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)`
- `parentElement: Element @relationship(type: "TREE_FIRST_CHILD", direction: OUT)`

This prevents us from easily changing the parent relationship type.

## Solutions Considered

### Option 1: Establish PAGE_ELEMENTS After Element Creation
After all elements are created, run an update mutation to connect them:
```graphql
mutation ConnectPageElements($pageId: ID!, $elementIds: [ID!]!) {
  updatePages(
    where: { id: $pageId }
    update: {
      elements: { connect: { where: { node: { id_IN: $elementIds } } } }
    }
  )
}
```

### Option 2: Custom Resolver
Create a custom resolver for `Page.elements` that queries all elements with matching page ID.

### Option 3: Fix Element Creation
Ensure bidirectional relationship is created when elements are added.

## Recommendation

The simplest fix is to establish the PAGE_ELEMENTS relationship after element creation. This requires:
1. Tracking all created elements for a page
2. After all elements are created, update the page to connect them
3. This can be done in the page creation flow or as a separate step