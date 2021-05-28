# vars.tf

variable "app_name" {
  description = "The identifier of the infrastructure"
  default     = "clab"
}

variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "us-west-1"
}

variable "aws_access_key_id" {
  description = "Your AWS access key"
  type        = string
}

variable "aws_secret_access_key" {
  description = "Your AWS secret"
  type        = string
}

variable "aws_bucket_name" {
  description = "S3 Bucket name"
  type        = string
  default     = "clab-test-bucket"
}

variable "runtime" {
  default     = "nodejs12.x"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "2"
}

variable "app_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "bradfordhamilton/crystal_blockchain:latest"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 3333
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "256"
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "512"
}

variable "health_check_path" {
  default     = "/"
}

variable "app_domain" {
  description = "Root Domain of the project"
  default     = "codelab.ai"
}

# container env values
variable "dgraph_graphql_endpoint" {
  default     = "http://127.0.0.1:8081/graphql"
}

variable "dgraph_endpoint" {
  default     = "http://127.0.0.1:8081"   
}

variable "aws_access_key" {
  default     = "cant-be-empty"
}

variable "aws_secret_key" {
  default     = "cant-be-empty"
}

variable "aws_bucket" {
  default     = "cant-be-empty" 
}

variable "auth0_secret" {
  default     = "cant-be-empty"
}

variable "auth0_baseurl" {
  default     = "http://127.0.0.1:3000"
}

variable "auth0_issuer_baseurl" {
  default     = "https://codelab-ai.us.auth0.com"
}

variable "auth0_client_id" {
  default     = "cant-be-empty"
}

variable "auth0_client_secret" {
  default     = "cant-be-empty"
}

variable "auth0_audience" {
  default     = "https://api.codelab.ai"
}

variable "auth0_api_client_id" {
  default     = "cant-be-empty"
}

variable "auth0_api_client_secret" {
  default     = "cant-be-empty"
}