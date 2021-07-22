terraform {
  backend "s3" {
    bucket = "codelab-terraform-backend-store"
    key    = "codelab/tf.state"
    region = "us-west-1"
  }
}
