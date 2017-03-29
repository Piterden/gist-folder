#!/bin/bash
# Database credentials

user="balibikerental"
password="balibikerental"
host="localhost"
db_name="BaliBikeRentalDb"

# Other options

backup_path="/home/den/dumps"
date=$(date +"%d-%b-%Y")

# Set default file permissions

umask 177

# Dump database into SQL file

mysqldump --user=$user --password=$password --host=$host $db_name > $backup_path/$db_name-$date.sql
