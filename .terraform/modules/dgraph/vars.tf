variable "dgraph_name" {
  description = "Dgraph name"
}

variable "dgraph_count" {
  description = "Count of dgraph instances"
  default     = 1
}

variable "dgraph_port" {
  description = "Port exposed by the docker image to redirect to dgraph"
  default     = 8080
}

variable "vpc_id" {
  description = "Vpc Id where dgraph should be deployed"
}

variable "ecs_cluster_id" {
  description = "ECS cluster Id to run dgraph service"
}

variable "subnets" {
  type        = list(string)
  description = "Subnets to be used while running dgraph ecs"
}

variable "aws_region" {
  description = "Aws Region to store logs"
}

variable "ecs_task_execution_role" {
  description = "ARN of ecs task execution role"
}