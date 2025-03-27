@echo off
call npm install
call npm install --save-dev gh-pages
call npm run deploy 