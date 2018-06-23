# mqtt-webhook
Simple MQTT client to launch webhook

# setup

```
export GITHUB=$(curl -s https://github.com/yroffin/mqtt-webhook/releases/latest -s | cut -f2 -d\" | sed s:/tag/:/download/:)
sudo wget ${GITHUB}/mqtt-webhook-service -O /etc/init.d/mqtt-webhook-service
sudo useradd -m mqtt-webhook
sudo chmod 755 /etc/init.d/mqtt-webhook-service
sudo update-rc.d mqtt-webhook-service defaults

su - mqtt-webhook
export GITHUB=$(curl -s https://github.com/yroffin/mqtt-webhook/releases/latest -s | cut -f2 -d\" | sed s:/tag/:/download/:)
wget ${GITHUB}/mqtt-webhook.js
wget ${GITHUB}/package.json
npm install
exit

sudo service mqtt-webhook-service restart
sudo service mqtt-webhook-service status
```


Simply create an etc file name /etc/mqtt-webhook/mqtt-webhook.conf with this content

```
mqtt-webhook.lport=<port>
mqtt-webhook.lhost=<host-or-ip>
mqtt-webhook.lusername=<username>
mqtt-webhook.lpassword=<password>
mqtt-webhook.topic=<topic>
mqtt-webhook.webhook=<webhook>
 ```
