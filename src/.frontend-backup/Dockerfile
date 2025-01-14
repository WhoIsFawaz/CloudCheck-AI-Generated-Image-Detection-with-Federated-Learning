# Step 1: Choose base image
FROM arm64v8/node:alpine AS arm_base
FROM node:alpine AS amd_base

# Step 2: Set the working directory in the Docker container
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./

# Step 7: Install the Babel plugin
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

RUN npx update-browserslist-db@latest

# Step 4: Copy the rest of the code
COPY . .

# Step 5: Expose the port
EXPOSE 3000

# Step 6: Set the command to run your app
CMD ["npm", "start"]
