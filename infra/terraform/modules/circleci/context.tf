resource "circleci_context" "build" {
  name = "build"
}

resource "circleci_context_environment_variable" "build" {
  for_each = {
    // https://nx.dev/ci/recipes/set-up/monorepo-ci-circle-ci#using-circleci-in-a-private-repository
    CIRCLE_API_TOKEN = var.circleci_api_token
  }

  variable   = each.key
  value      = each.value
  context_id = circleci_context.build.id
}
