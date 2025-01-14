# Start from an official Debian-based Node.js image
FROM arm64v8/node:16 AS arm_base
FROM node:16 AS amd_base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Copy the application code
COPY . .

RUN apt-get update
RUN apt-get -y install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ca-certificates curl gnupg
RUN npm i -g --build-from-source node-pre-gyp

RUN npm install canvas && \
    npm install @tensorflow/tfjs-node && \
    npm rebuild @tensorflow/tfjs-node --build-from-source

# Expose the application port
EXPOSE 6001

# Start the server
CMD ["node", "server.js"]
