// Retrieves all available atoms
MATCH(atom:Atom)
RETURN atom

ORDER by atom.name