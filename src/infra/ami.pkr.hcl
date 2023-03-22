packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.1"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "aws_access_key_id" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "ami_users" {
  type    = list(string)
  default = []
}

// variable "source_ami" {
//   type    = string
//   default = "ami-08c40ec9ead489470" # Ubuntu 22.04 LTS
// }

variable "ssh_username" {
  type    = string
  default = "ec2-user"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0ebc8c671cd12fd32"
}

variable "db_password" {
  type = string
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "assignment4" {
  region          = var.aws_region
  profile         = "dev"
  access_key      = var.aws_access_key_id
  secret_key      = var.aws_secret_access_key
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 6225"
  ami_users       = var.ami_users
  ami_regions = [
    var.aws_region
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }


  instance_type = "t2.micro"
  // source_ami    = "${var.source_ami}"
  source_ami_filter {
    filters = {
      name                = "amzn2-ami-kernel-5.10-hvm-2.*.0-x86_64-gp2"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }

  ssh_username = "${var.ssh_username}"
  subnet_id    = "${var.subnet_id}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.assignment4"]

  provisioner "file" {
    source      = "./webapp.service"
    destination = "/tmp/webapp.service"
  }

  provisioner "file" {
    source      = "../../webapp.zip"
    destination = "/home/ec2-user/webapp.zip"
  }

  provisioner "file" {
    source      = "./cloudwatch-config.json"
    destination = "/tmp/cloudwatch-config.json"
  }

  provisioner "file" {
    source      = "./csye6225.conf"
    destination = "/tmp/csye6225.conf"
  }


  provisioner "shell" {
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1",
      "DB_PASSWORD=${var.db_password}"
    ]
    script = "./app.sh"
  }
}
