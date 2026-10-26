# =========================================================
# RDS Subnet Group
# =========================================================

resource "aws_db_subnet_group" "main" {
  name = "${var.project_name}-db-subnet-group"

  subnet_ids = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]

  tags = {
    Name        = "${var.project_name}-db-subnet-group"
    Project     = var.project_name
    Environment = var.environment
  }
}

# =========================================================
# RDS Security Group
# =========================================================

resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "Security group for AsmaCare RDS MySQL"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "MySQL from inside AsmaCare VPC"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-rds-sg"
    Project     = var.project_name
    Environment = var.environment
  }
}

# =========================================================
# RDS MySQL
# =========================================================

resource "aws_db_instance" "mysql" {
  identifier = "${var.project_name}-mysql"

  engine         = "mysql"
  instance_class = "db.t3.micro"

  allocated_storage = 20
  storage_type      = "gp3"

  db_name  = "asmacare"
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  publicly_accessible = false
  multi_az            = false

  skip_final_snapshot = true
  deletion_protection = false

  tags = {
    Name        = "${var.project_name}-mysql"
    Project     = var.project_name
    Environment = var.environment
  }
}
