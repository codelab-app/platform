resource "aws_security_group" "app-prod" {
  vpc_id      = aws_vpc.main.id
  name        = "application - production"
  description = "security group for my app"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "myinstance"
  }
}

resource "aws_security_group" "allow-postgres" {
  vpc_id      = aws_vpc.main.id
  name        = "allow-postgres"
  description = "allow-postgres"
  ingress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description = ""
      from_port   = 5432
      ipv6_cidr_blocks = [
        "::/0",
      ]
      prefix_list_ids = []
      protocol        = "tcp"
      security_groups = []
      self            = false
      to_port         = 5432
    },
    {
      cidr_blocks      = []
      description      = ""
      from_port        = 5432
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups = [
        aws_security_group.app-prod.id
      ]
      self    = false
      to_port = 5432
    }
  ]

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    self        = true
  }

  tags = {
    Name = "allow-postgres"
  }
}


output "aws_security_group" {
  value = {
    app-prod = aws_security_group.app-prod,
    allow-postgres = aws_security_group.allow-postgres
  }
}