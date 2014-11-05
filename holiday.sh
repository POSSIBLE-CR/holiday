#!/bin/sh

# Must run as root
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

export PATH=$PATH:/usr/bin
export NODE_PATH=$NODE_PATH:/usr/lib/node_modules
export NODE_ENV='development'
export HLDY_APP_PATH=/vagrant
export HLDY_APP_LOG="$HLDY_APP_PATH/logs/holiday.log"
export APP_SRC='server.js'
export APP_ARGS=''
export USER='vagrant'

if [ ! -f "$HLDY_APP_PATH/$APP_SRC" ]; then
   echo "Sorry, the server script does not exist" 1>&2
   exit 1
fi

case "$1" in
  start)
  cd $HLDY_APP_PATH &&
  mkdir -p $HLDY_APP_PATH/logs &&
  su $USER -c "NODE_ENV=$NODE_ENV forever -c nodemon --sourceDir=$HLDY_APP_PATH -a -l $HLDY_APP_LOG start $APP_SRC $APP_ARGS"
  ;;
stop)
  su $USER -c "forever stop --sourceDir=$HLDY_APP_PATH $APP_SRC"
  ;;
status)
  su $USER -c "forever list --sourceDir=$HLDY_APP_PATH"
  ;;
*)
  echo "Usage: /etc/init.d/holiday.sh {start|stop|status}"
  exit 1
  ;;
esac

exit 0
