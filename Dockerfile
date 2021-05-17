# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

# add app
COPY . ./

CMD ["npm", "build"]

# start app
CMD ["npm", "start"]





# FROM node:14.4.0

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm install -g gatsby-cli

# CMD ['gatsby', 'develop', '-H', '0.0.0.0:8000']
