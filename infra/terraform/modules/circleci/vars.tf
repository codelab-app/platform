variable "circleci_api_token" {
  type = string
}

variable "ci_cache_version" {
  type        = string
  description = "Cache version for CircleCI builds"
}

variable "nx_daemon" {
  type        = bool
  description = "Enable NX daemon for faster builds"
}
