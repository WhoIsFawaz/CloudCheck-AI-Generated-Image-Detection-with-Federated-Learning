# Use Node.js LTS (Long Term Support) version
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN npm install --save-dev 

# Step 4: Copy the rest of the code
COPY . .

RUN pnpm next build

# Step 5: Expose the port
EXPOSE 3000

# Step 6: Set the command to run your app
CMD ["pnpm", "start"]