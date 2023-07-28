FROM node:14

WORKDIR /appGym

COPY . /appGym

RUN npm install
RUN npm run build

COPY . .

CMD ["node", "dist/main"]