FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install -g @nestjs/cli 

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev"]