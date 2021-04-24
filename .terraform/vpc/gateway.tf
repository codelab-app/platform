# Internet Gateway
resource "aws_internet_gateway" "main-gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main"
  }
}

# nat gw
resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "nat-gw" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.main-public-1.id
  depends_on    = [aws_internet_gateway.main-gw]
}