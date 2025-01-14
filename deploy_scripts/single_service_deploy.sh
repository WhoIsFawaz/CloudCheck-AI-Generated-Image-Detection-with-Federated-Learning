#!/bin/sh

# Check if the service folder argument is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <service-folder>"
  exit 1
fi

service_dir="$1"

# Check if the specified directory exists
if [ ! -d "$service_dir" ]; then
  echo "Directory not found. Exiting."
  exit 1
fi

# Build Docker images from the specified directory
service_name=$(basename "$service_dir")
service_name="${service_name%-service}"
echo "Building Docker image for bloomingteratoma/$service_name..."
if [ "$service_name" == "federated-learning" ]; then
    sudo docker build --no-cache --platform linux/amd64 -t bloomingteratoma/$service_name:latest "$service_dir"
    # docker push --platform linux/amd64 bloomingteratoma/$service_name:latest
else
    sudo docker build --no-cache -t bloomingteratoma/$service_name:latest "$service_dir"
    # docker push bloomingteratoma/$service_name:latest 
fi

# Delete old deployment
deployment_name="${service_name}-deployment"
if kubectl delete deployment $deployment_name &>/dev/null; then
  echo "Removed old deployment $deployment_name"
else
  echo "Failed to delete deployment $deployment_name. Something went wrong, or it might not exist. If it does exist, do the following:"
  echo "- Double check service/folder name provided."
  echo "- Change Docker context to your default and add cloudcheck namespace to it."
  echo "===="
  echo "EXAMPLE:"
  echo "kubectl config use-context docker-desktop"
  echo "kubectl config set-context --current --namespace=cloudcheck"
  echo "===="
  echo If on macOS with Kubernetes installed through Docker Desktop, use the following command to switch cluster servers:
  echo "kubectl config set-cluster docker-desktop --server=https://127.0.0.1:6443"
fi

# Apply back the deployment 
deployment_file="${deployment_name}.yaml"
echo "Starting deployment $deployment_file"
kubectl apply -f ../src/docker-composer/$deployment_file
echo "Docker image build and deployment load completed."