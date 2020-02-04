#!/bin/bash
ps cax | grep node > /dev/null
if [ $? -eq 0 ]; then
  echo "Process is running." >/dev/null 2>&1
else
  echo "Process is not running."

  PATH=$PATH:/home/geekout/.nvm/versions/node/v13.7.0/bin

  pm2 start server.js --env production
fi
