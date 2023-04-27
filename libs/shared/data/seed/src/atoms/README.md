Moved data to shared since frontend and backend data requirements share the same keys.

Only the values differ in the record, this creates less key duplication. The downside is less granular data since backend & frontend data are mixed together.

We decided it was better for reducing code, rather than more separation.
