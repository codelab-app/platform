MATCH (n:App) WITH n
    WITH collect(properties(n)) AS vertices
RETURN vertices