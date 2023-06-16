#!/bin/bash

echo $PWD
# Must use 15.5.0 https://github.com/nrwl/nx-labs/issues/178#issuecomment-1476516764
cd ../../ && npx nx-ignore@15.5.0 --root landing --verbose
