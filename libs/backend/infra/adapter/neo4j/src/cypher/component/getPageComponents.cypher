MATCH (page:Page)-[:ROOT_PAGE_ELEMENT|TREE_FIRST_CHILD|NODE_SIBLING|RENDER_COMPONENT_TYPE|COMPONENT_ROOT*]-(component:Component)
WHERE page.id = $pageId
RETURN DISTINCT component