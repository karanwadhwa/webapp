#!/bin/bash

# packer recommended - wait for ec2 instance to fully setup
sleep 30

# install updates
sudo yum upgrade -y

# install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16 -y

# copy and unzip repo
sudo yum install unzip -y
cd ~/ && unzip webapp.zip
cd ~/webapp && npm install
npm run build

# install cloudwatch agent
sudo yum install -y amazon-cloudwatch-agent

# move systemd service file
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
# move cloudwatch config file
sudo mv /tmp/cloudwatch-config.json /opt/cloudwatch-config.json
# move rsyslog config file
sudo mv /tmp/csye6225.conf /etc/rsyslog.d/csye6225.conf

# create csye6225.log file
sudo touch /var/log/csye6225.log

# reload systemctl daemon
sudo systemctl daemon-reload
sudo systemctl restart rsyslog.service

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -c file:/opt/cloudwatch-config.json \
    -s

# sudo systemctl enable webapp.service
# sudo systemctl start webapp.service