config {
  force               = true
  module              = true
  disabled_by_default = false
}

plugin "terraform" {
  enabled = true
  preset  = "recommended"
}

rule "terraform_required_version" {
  enabled = false
}
