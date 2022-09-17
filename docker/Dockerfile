FROM node:17.2

WORKDIR /usr/src/api-service

COPY babel.config.json index.js ./
COPY package.json ./
RUN npm install

RUN apt update && apt install -y entr
CMD find src -type f | entr -r npm run start
