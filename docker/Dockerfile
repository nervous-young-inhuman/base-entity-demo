FROM node:17.2

WORKDIR /usr/src/api-service

COPY babel.config.json index.js ./
COPY package.json ./
RUN npm install

CMD ["npm", "run", "start"]
