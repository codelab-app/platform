MATCH (element:Element {id: $elementId})-[:ELEMENT_RENDER_TYPE]->(renderType)
-[:ATOM_API|COMPONENT_API]->(api:InterfaceType)
RETURN api.id as apiId
