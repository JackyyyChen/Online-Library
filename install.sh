#!/bin/bash

sudo apt-get update

# Database
sudo apt-get install mysql-server
sudo service mysql start
echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql'; FLUSH PRIVILEGES;" | sudo mysql -u root
mysql -u root -p mysql -e "create database 9900database"

# Front end
sudo apt-get update
sudo snap install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install npm
cd my-app
sudo chmod -R a+w ./node_modules/
npm install --force


# Back end
cd ..
sudo apt-get update
sudo apt-get install python3-pip
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get install python3.10
sudo pip3 install virtualenv
virtualenv venv --python=python3.10

source venv/bin/activate
pip install django 
pip install pymysql
pip install djangorestframework
pip install django-cors-headers
pip install channels
sudo apt-get install python3.10-dev
sudo apt-get install default-libmysqlclient-dev
pip install mysqlclient 
pip install pandas
pip install Pillow
pip install prompt_toolkit
pip install spacy
python -m spacy download en_core_web_md
pip install rwkv
pip install surprise
pip install torch
venv/bin/python3 manage.py makemigrations
venv/bin/python3 manage.py migrate
mysql -uroot -p'mysql' -e "SET GLOBAL local_infile=1;"
venv/bin/python3 loadcsv.py
venv/bin/python3 manage.py createsuperuser