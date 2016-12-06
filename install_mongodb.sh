#!/bin/sh
# @Author: xhb
# @Date:   2016-12-06 11:03:46
# @Last Modified by:   xhb
# @Last Modified time: 2016-12-06 11:16:15
#
# Ubuntu 16.04 lts版本: mongodb安装方法如下。
#
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y  mongodb-org
sudo service mongod start

