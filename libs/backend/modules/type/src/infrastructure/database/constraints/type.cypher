// Must add unique constraint before adding UUID APOC
CREATE CONSTRAINT ON (type:Type)
ASSERT type.uuid IS UNIQUE

CALL apoc.uuid.install('Type')
YIELD label, installed, properties
RETURN label, installed, properties
