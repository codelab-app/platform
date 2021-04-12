DROP FUNCTION get_current_user(hasura_session json);

CREATE OR REPLACE FUNCTION public.get_current_user(hasura_session json)
  RETURNS SETOF "user"
  LANGUAGE sql 
  STABLE
AS $function$
    SELECT *
    FROM "user"
    WHERE
      id = (hasura_session ->> 'x-hasura-user-id')::text
$function$;
