#!/bin/bash
npm run build
rm -rf ../eeyore81.github.io/*
cp -rf build/* ../eeyore81.github.io
cd ../eeyore81.github.io
git add *
git commit -m "next version commited"
git push origin master
