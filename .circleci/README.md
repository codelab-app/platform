- Takes about 9s to restore .yarn
- Takes 50s to restore node_modules

- Takes about 1:08 to install npm with .yarn cache only
- Takes about 0:34 to install npm with .yarn + node_modules
- Takes 0:40 to persist dist with .cache

##

The extra 50s to restore node_modules does not justify the 16s savings

- Takes about x extra to restore
