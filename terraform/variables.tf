variable "aws_region" {
  description = "AWS region used by AsmaCare"
  type        = string
  default     = "ca-central-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "asmacare"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR range for the AsmaCare VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "node_instance_types" {
  description = "EC2 instance types used by EKS worker nodes"
  type        = list(string)
  default     = ["t3.small"]
}
variable "db_username" {
  description = "RDS MySQL master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "RDS MySQL master password"
  type        = string
  sensitive   = true
}
