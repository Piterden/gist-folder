#!/usr/bin/env bash
# # source: https://github.com/limetext/lime/wiki/Building-on-Ubuntu-16.04
set -euo pipefail

# Set the required environment variables.
export GOPATH=~/golang
export PKG_CONFIG_PATH=$GOPATH/src/github.com/limetext/rubex
export GODEBUG=cgocheck=0 # Required for the code to work with Go 1.6.

# Set up the backend.
sudo apt-get -y install git golang libonig-dev libonig2 mercurial python3.5 python3.5-dev
# next line is from https://github.com/limetext/lime/issues/565
go get github.com/limetext/sublime 
go get github.com/limetext/backend
cd $GOPATH/src/github.com/limetext/backend
git submodule update --init --recursive
go test github.com/limetext/backend/...

# Set up the QML frontend.
sudo apt-get -y install libqt5opengl5-dev libqt5qml-graphicaleffects qtbase5-private-dev qtdeclarative5-controls-plugin qtdeclarative5-dev qtdeclarative5-dialogs-plugin qtdeclarative5-qtquick2-plugin qtdeclarative5-quicklayouts-plugin qtdeclarative5-window-plugin
go get github.com/limetext/lime-qml/main/...
cd $GOPATH/src/github.com/limetext/lime-qml
git submodule update --init --recursive

# Build and run the QML frontend.
cd $GOPATH/src/github.com/limetext/lime-qml/main
go build
./main
