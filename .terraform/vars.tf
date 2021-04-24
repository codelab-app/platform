variable "AWS_REGION" {
  default = "us-west-1"
}

variable "RDS_PASSWORD" {
  type = string
  description = "Password for relational database"
}

variable "PATH_TO_PRIVATE_KEY" {
  type = string
  description = "Your SSH Private key *.pem"
}

variable "PATH_TO_PUBLIC_KEY" {
  type = string
  description = "Your SSH public key *.pub"
}

variable runtime {
  default = "nodejs12.x"
}

variable "AWS_ACCESS_KEY_ID" {
  type = string
  description = "Your AWS access key"
}


variable "AWS_SECRET_ACCESS_KEY" {
  type = string
  description = "Your AWS secret"
}

variable "AWS_BUCKET_NAME" {
  type = string
  description = "S3 Bucket name"
  default = "codelab-test-bucket"
}
