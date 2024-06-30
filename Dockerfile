FROM node:18.16.1

WORKDIR /app

COPY package.json .
RUN npm install nodemon
RUN npm install

COPY . /app


CMD ["sh", "-c", "npm start"]