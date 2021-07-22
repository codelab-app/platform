resource "aws_security_group" "dgraph_lb" {
  name        = "${var.dgraph_name}-lb-security-group"
  description = "controls access to the Dgraph ALB"
  vpc_id      = var.vpc_id

  ingress {
    protocol    = "tcp"
    from_port   = var.dgraph_port
    to_port     = var.dgraph_port
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Traffic to the ECS cluster should only come from the ALB
resource "aws_security_group" "dgraph_tasks" {
  name        = "${var.dgraph_name}-tasks-security-group"
  description = "allow inbound access from the Dgraph ALB only"
  vpc_id      = var.vpc_id

  ingress {
    protocol        = "tcp"
    from_port       = var.dgraph_port
    to_port         = var.dgraph_port
    security_groups = [aws_security_group.dgraph_lb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_security_group" "efs_sg" {
  name        = "${var.dgraph_name}-efs-security-group"
  description = "Allow EFS Traffic from the Private Subnet"
  vpc_id      = var.vpc_id

  lifecycle {
    create_before_destroy = true
  }

  ingress {
    from_port   = "2049"
    to_port     = "2049"
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


