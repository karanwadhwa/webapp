#!/bin/bash

# packer recommended - wait for ec2 instance to fully setup
sleep 30

# install updates
sudo yum update -y

# install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16 -y

# # install mysql
# sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y
# sudo yum repolist
# sudo amazon-linux-extras install epel -y
# sudo yum -y install mysql
# sudo systemctl enable --now mysqld
# systemctl status mysqld
# # sudo grep 'temporary password' /var/log/mysqld.log | awk '{print $NF;}'
# ROOT_PASSWORD=$(sudo grep 'temporary password' /var/log/mysqld.log | awk '{print $NF;}')
# echo "${ROOT_PASSWORD}"
# sudo mysql -u "root" --password="${ROOT_PASSWORD}" --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"

# copy and unzip repo
sudo yum install unzip -y
cd ~/ && unzip webapp.zip
cd ~/webapp && npm install
npm run build
# echo "$DB_PASSWORD"
# echo -e "API_PORT=3000\nDB_HOST=localhost\nDB_USER=root\nDB_PASSWORD=$DB_PASSWORD\nDB_DATABASE=webapp6225" > .env
# cat .env

# move systemd service file
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
# sudo systemctl enable webapp.service
# sudo systemctl start webapp.service