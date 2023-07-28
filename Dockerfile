# Use a imagem do Ubuntu como base
FROM ubuntu:latest

SHELL ["/bin/bash"]

ENV LANG C.UTF-8

RUN apt-get update && \
    apt-get install -y mysql-server && \
    apt-get install -y nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3306

RUN mkdir appGym \
    && chmod -R 777 appGym

# CMD ["npm", "start"]