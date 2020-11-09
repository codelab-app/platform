# Git Crypt

Sensitive information stored in the repository is encrypted using [Git Crypt](https://github.com/AGWA/git-crypt). The `.git-crypt` config settings tell us which files to encrypt.

Currently user must install `git-crypt` based on OS specific install instructions. Then run `git-crypt unlock` & `git-crypt lock` to access the sensitive information.
