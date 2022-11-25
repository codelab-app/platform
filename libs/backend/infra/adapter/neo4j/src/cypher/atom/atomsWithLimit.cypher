// Retrieves all available atoms with offset(skip) and limit
MATCH(atom:Atom)
RETURN atom

ORDER by atom.name
SKIP $skip
LIMIT $limit