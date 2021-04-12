-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION public.get_current_user(hasura_session json)
  RETURNS SETOF "user"
  LANGUAGE sql 
  STABLE
AS $function$
    SELECT *
    FROM "user"
    WHERE
      id = (hasura_session ->> 'x-hasura-user-id')::text
$function$


-- CREATE OR REPLACE FUNCTION public.nearest_listings(lat text, lng text, occupancy integer)
--  RETURNS SETOF listing
--  LANGUAGE sql
--  STABLE
-- AS $function$
--   SELECT *
--   FROM listing
--   WHERE max_occupancy >= occupancy
--   ORDER BY ST_Distance(
--     GEOGRAPHY(ST_MakePoint(lat::double precision, lng::double precision)),
--     location
--   )
-- $function$;
