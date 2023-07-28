FROM node:14

WORKDIR /appGym

COPY . /appGym

RUN npm install

COPY . .

CMD [ "node", "app.js" ]