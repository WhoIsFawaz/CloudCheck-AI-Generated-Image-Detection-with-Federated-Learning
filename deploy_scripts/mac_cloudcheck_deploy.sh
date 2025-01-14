#!/bin/sh

# Define src_dir to point to ../src/docker-composer
src_dir="../src/docker-composer"

echo "Building main docker image from $src_dir. Please work."
sudo docker build -t bloomingteratoma/cloudcheck "$src_dir"
docker push bloomingteratoma/cloudcheck

# Set Kubernetes cluster configuration (macOS fix, might need to remove)
kubectl config set-cluster docker-desktop --server=https://127.0.0.1:6443

# Delete old deployment
deployment_name="cloudcheck-deployment"
if kubectl delete deployment $deployment_name &>/dev/null; then
  echo "Removed old deployment $deployment_name"
else
  echo "Failed to delete deployment $deployment_name. Something went wrong, or it might not exist."
fi

# Set Kubernetes cluster configuration (macOS fix, might need to remove)
kubectl config set-cluster docker-desktop --server=https://kubernetes.docker.internal:6443

# Run the Docker container with mounted volumes
docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/.kube/config:/root/.kube/config \
  bloomingteratoma/cloudcheck

echo "Deployed CloudCheck image inshallah..."
