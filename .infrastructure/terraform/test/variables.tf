variable "project" {}

variable "credentials_file" {}

variable "region" {
    type = string
    default = "us-east4"
}

variable "email_address" {
}

variable "zone" {
    type = string
    default = "us-east4-b"
}

variable "environment" {
    type = string
    default = "prod"
}

variable "boot_image_name" {
}

variable "docker_declaration" {
}

variable "domain_name" {
}

variable "machine_types" {
    type = map
    default = {
        test = "g1-small"
        prod = "g1-small"
    }
}

variable "port_number" {
  type = list(string)
  default = ["80", "443"]
}