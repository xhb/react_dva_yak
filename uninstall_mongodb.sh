#!/bin/sh
# @Author: xhb
# @Date:   2016-12-06 11:18:06
# @Last Modified by:   xhb
# @Last Modified time: 2016-12-06 11:18:55
#
# Ubuntu 16.04 lts: 卸载mongodb
#
sudo service mongod stop
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
