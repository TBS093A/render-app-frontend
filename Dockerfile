FROM node:14.4.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g gatsby-cli

CMD ['gatsby', 'develop', '-H', '0.0.0.0:8000']