# Subnets
resource "aws_subnet" "main-public-1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "us-west-1a"

  tags = {
    Name = "main-public-1"
  }
}



// resource "aws_subnet" "main-public-2" {
//   vpc_id                  = aws_vpc.main.id
//   cidr_block              = "10.0.2.0/24"
//   map_public_ip_on_launch = "true"
//   availability_zone       = "us-west-1c"

//   tags = {
//     Name = "main-public-2"
//   }
// }

resource "aws_subnet" "main-private-1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "us-west-1a"

  tags = {
    Name = "main-private-1"
  }
}

// resource "aws_subnet" "main-private-2" {
//   vpc_id                  = aws_vpc.main.id
//   cidr_block              = "10.0.5.0/24"
//   map_public_ip_on_launch = "false"
//   availability_zone       = "us-west-1c"

//   tags = {
//     Name = "main-private-2"
//   }
// }

output "aws_subnet"  {
  value = {
    main-public-1 = aws_subnet.main-public-1,
    main-private-1 = aws_subnet.main-private-1
  }
}