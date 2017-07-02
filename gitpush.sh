#!/bin/bash

if [[ ! $1 ]]; then
    echo "Argument 1 - commit message - is required!"
    exit 0
fi

git add .
git commit -am "$1"
git push
