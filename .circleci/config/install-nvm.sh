#!/bin/bash

# Set path before install, otherwise paths will be different in the executors
echo 'export NVM_DIR=$HOME/.nvm' >> $BASH_ENV
echo 'source $NVM_DIR/nvm.sh' >> $BASH_ENV

if [ ! -d "$NVM_DIR" ]; then
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi
