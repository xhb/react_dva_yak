#!/bin/sh
# @Author: xhb
# @Date:   2016-12-16 09:47:51
# @Last Modified by:   xhb
# @Last Modified time: 2016-12-16 09:52:49

mongo

-> use admin;
-> db.createUser({
->   "user": "admin",
->   "pwd": "admin123",
->   roles: [ { role: "root", db:"admin"} ]
-> });

vim /etc/mongod.conf

security:
  authorization: enabled


sudo service mongod restart
