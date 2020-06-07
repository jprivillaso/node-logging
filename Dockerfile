FROM node:10

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install

RUN npm install pm2 -g

# Copy all other source code to work directory
ADD . /usr/src/app

# TypeScript
RUN npm run build

EXPOSE 4000

# Start
CMD [ "npm", "start" ]