# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install gatsby-cli@3.10.0 --silent

ENV GATSBY_TELEMETRY_DISABLED=1

# add app
COPY . ./
