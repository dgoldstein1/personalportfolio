#!/bin/sh

npm run build

export $(cat VERSION | grep VERSION)
docker build . -f Dockerfile-prod -t dgoldstein1/personal-website:$VERSION