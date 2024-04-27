#!/bin/bash

set -x

# Copied from DO dashboard `Volumes` > `More` > `Config instructions`
mkdir -p /mnt/neo4j_volumes

mount -o discard,defaults /dev/disk/by-id/scsi-0DO_Volume_neo4j-volumes /mnt/neo4j_volumes

echo /dev/disk/by-id/scsi-0DO_Volume_neo4j-volumes /mnt/neo4j_volumes ext4 defaults,nofail,discard 0 0 | sudo tee -a /etc/fstab
