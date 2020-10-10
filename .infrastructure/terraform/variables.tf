variable "project" {}

variable "credentials_file" {}

variable "region" {
    type = string
    default = "us-east4"
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

variable "machine_types" {
    type = map
    default = {
        prod = "g1-small"
    }
}

variable "port_number" {
  type = string
  default = "80"
}