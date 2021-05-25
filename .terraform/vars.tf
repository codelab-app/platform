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
