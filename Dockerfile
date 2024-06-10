# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install the app dependencies
COPY package*.json ./
RUN npm install

# Copy the app files
COPY . .

# Build the TypeScript files
RUN npm run build

# The command to run our app using node
CMD ["node", "lib/index.js"]