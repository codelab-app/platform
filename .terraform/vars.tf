variable "AWS_REGION" {
  default = "us-west-1"
}

variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}

variable "RDS_PASSWORD" {
} 

variable runtime {
  default = "nodejs12.x"
}

variable "AWS_ACCESS_KEY_ID" {
}

variable "AWS_SECRET_ACCESS_KEY" {
}

variable "AWS_BUCKET_NAME" {
  default = "codelab-test-bucket"
}
