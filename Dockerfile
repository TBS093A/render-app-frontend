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