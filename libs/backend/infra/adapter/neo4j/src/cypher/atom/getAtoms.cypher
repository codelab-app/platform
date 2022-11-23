// Retrieves all available atoms with offset(skip) and limit
MATCH(atom:Atom)
WITH count(atom) as totalCount

MATCH(atom:Atom)
RETURN atom, totalCount

ORDER by atom.name
SKIP $skip
LIMIT $limit