#!/bin/bash

# Set path before install, otherwise paths will be different in the executors
echo 'export NODE_OPTIONS=$NODE_OPTIONS' >> $BASH_ENV
source $BASH_ENV

echo 'export NVM_DIR=$HOME/.nvm' >> $BASH_ENV
echo 'source $NVM_DIR/nvm.sh' >> $BASH_ENV

#wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

if [ ! -d "$NVM_DIR" ]; then
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
fi
