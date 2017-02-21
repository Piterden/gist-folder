#!/bin/bash
## Set right permissions for PyroCMS 3+ (Laravel 5+) 

find . -type d -exec chmod 755 {} +
find . -type f -exec chmod 644 {} +
chmod 777 storage
chmod 777 public/app
chmod 777 bootstrap/cache

