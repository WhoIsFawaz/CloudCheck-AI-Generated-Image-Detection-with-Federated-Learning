# Use Alpine Linux as a base image
FROM arm64v8/alpine:latest AS arm_base
FROM alpine:latest AS amd_base

# Install required dependencies
RUN apk update && apk add --no-cache docker curl

# Get kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl \
    && mv ./kubectl /usr/bin/kubectl

# Specify a working directory
WORKDIR /app

# Copy your application files into the container (if needed)
COPY . .

# Verify that deploy.sh is present and set executable
RUN chmod +x /app/deploy.sh

# List files to debug if needed
RUN ls -la /app

# Command to run when the container starts
CMD ["sh", "-c", "/app/deploy.sh && sh"]
