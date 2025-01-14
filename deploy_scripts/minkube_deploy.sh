#!/bin/sh

# Get the parent directory of the script
src_dir="$(dirname "$current_dir")/src"

# Find all folders ending with "-service" in the parent directory
service_folders=$(find "$src_dir" -maxdepth 1 -type d -name '*-service')

# Start Minikube
minikube start

# Check if Minikube start was successful
if [ $? -ne 0 ]; then
    echo "Error starting Minikube. Please check the error message above."
    exit 1
fi

echo "Minikube started successfully."

# Loop through the service folders and build Docker images
for service_dir in $service_folders; do
  full_service_name=$(basename "$service_dir")
  service_name="${full_service_name%-service}" 
  echo "Building Docker image for bloomingteratoma/$service_name..."
  sudo docker build -t bloomingteratoma/$service_name:latest "$service_dir"

  # Load into minikube for local testing
  minikube image load bloomingteratoma/$service_name:latest "$service_dir"
  echo "---"
done

echo "Docker image build completed."
echo

# Loop through all YAML files in the current directory and apply them
for file in *.yaml; do
  if [ -f "$file" ]; then
    echo "Applying $file ..."
    kubectl apply -f "$file" 
    echo "---"
  fi
done

echo "YAML files in the current directory applied successfully"
echo "Kubernetes is up inshallah..."

# Port forwarding for Minikube
kubectl port-forward service/frontend-service 3000:3000 &
kubectl port-forward service/envoy-service 8080:8080 &
kubectl port-forward service/envoy-service 9901:9901 &