#!/bin/bash
# Database credentials

user="pyrocms"
password="pyrocms"
host="localhost"
db_name="pyrocms"

# Other options

backup_path="$HOME/dumps"
backup_date=$(date +"%d-%b-%Y")

# Set default file permissions

umask 177

# Dump database into SQL file

mysqldump \
    --user=$user \
    --password=$password \
    --host=$host \
    $db_name > $backup_path/$db_name-$backup_date.sql
