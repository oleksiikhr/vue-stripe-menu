FROM node:16.15.0-alpine

WORKDIR /home/node/app

RUN npm i -g pnpm

EXPOSE 3000
