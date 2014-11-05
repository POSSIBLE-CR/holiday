#!/usr/bin/env sh

sudo apt-mark hold grub-pc
sudo apt-get -y update && sudo apt-get -y upgrade 
sudo apt-mark unhold grub-pc
sudo apt-get -y autoclean

apt-get -y install imagemagick graphicsmagick wget git build-essential libssl-dev python-software-properties nginx elinks

# Install NodeJS
curl -sL https://deb.nodesource.com/setup | bash -
apt-get -y install nodejs
npm install -g forever nodemon

# Install MongoDB
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get -y update
apt-get install -y mongodb-10gen
service mongod restart

# Startup script
cp /vagrant/holiday.sh /etc/init.d/holiday.sh
chmod a+rx /etc/init.d/holiday.sh
update-rc.d holiday.sh defaults

# NPM Modules
if [ -f "/vagrant/server.js" ]; then
    cd /vagrant && npm install && chown -R vagrant:vagrant /vagrant/node_modules
    service holiday.sh start
fi

# Proxy
echo "c2VydmVyIHsNCglzZXJ2ZXJfbmFtZSAxOTIuMTY4LjE2OC4xNjg7DQogICAgICAgIGxvY2F0aW9uIH4gew0KICAgICAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vMTI3LjAuMC4xOjMwMDA7DQogICAgICAgIH0NCn0NCg==" |  base64 -d |  tee /etc/nginx/sites-available/default
service nginx restart

# Config files
echo 'export PS1="\[\e[01;32m\]\[\e[1m\][\[\e[0m\]\t\[\e[01;32m\]\[\e[1m\]]\[\e[0m\]\[\e[1m\] \w:>\[\e[0m\] "' | tee -a ~vagrant/.bashrc
echo 'IlxlW0EiOiAgICAgaGlzdG9yeS1zZWFyY2gtYmFja3dhcmQNCiJcZVtCIjogICAgIGhpc3Rvcnktc2VhcmNoLWZvcndhcmQNCiJcZU9BIjogICAgIGhpc3Rvcnktc2VhcmNoLWJhY2t3YXJkDQoiXGVPQiI6ICAgICBoaXN0b3J5LXNlYXJjaC1mb3J3YXJkDQo=' | base64 -d | tee -a /etc/inputrc

# Owner
chown -R vagrant:vagrant ~vagrant
