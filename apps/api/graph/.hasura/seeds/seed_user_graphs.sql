DO $$
    DECLARE user_id integer;
    DECLARE graph_id integer;
    BEGIN
        INSERT INTO "user" (username, password) VALUES ('john', sha256('qwerty')) RETURNING id INTO user_id;
        INSERT INTO graph (user_id) VALUES (user_id) returning id INTO graph_id;
        INSERT INTO vertex (id, type, props, graph_id)  VALUES ('v-A', 'REACT_DIV', '{}', graph_id);
        INSERT INTO vertex (id, type, props, graph_id)  VALUES ('v-B', 'REACT_BUTTON', '{}', graph_id);
        INSERT INTO vertex (id, type, props, graph_id)  VALUES ('v-C', 'REACT_TEXT', '{}', graph_id);
        INSERT INTO edge (id, source, target, props, graph_id) VALUES ('e-A', 'v-A', 'v-B', '{}', graph_id);
        INSERT INTO edge (id, source, target, props, graph_id) VALUES ('e-B', 'v-A', 'v-C', '{}', graph_id);
END $$;
