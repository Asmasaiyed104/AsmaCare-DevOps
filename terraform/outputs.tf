output "vpc_id" {
  description = "AsmaCare VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id
  ]
}

output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.main.name
}

output "eks_cluster_endpoint" {
  description = "EKS API endpoint"
  value       = aws_eks_cluster.main.endpoint
}

output "eks_node_group_name" {
  description = "EKS managed node group name"
  value       = aws_eks_node_group.main.node_group_name
}
output "rds_endpoint" {
  description = "AsmaCare RDS MySQL endpoint"
  value       = aws_db_instance.mysql.endpoint
}
