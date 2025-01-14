#!/bin/sh

# Define src_dir to point to ../src/docker-composer
src_dir="../src/docker-composer"

echo "Building main docker image from $src_dir. Please work."
sudo docker build -t bloomingteratoma/cloudcheck "$src_dir"
docker push bloomingteratoma/cloudcheck

# Run the Docker container with mounted volumes
docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME/.kube/config:/root/.kube/config" \
  bloomingteratoma/cloudcheck

echo "Deployed CloudCheck image inshallah..."

# docker build -t bloomingteratoma/cloudcheck <path to docker-composer>
# docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock -v $HOME/.kube/config:/root/.kube/config username/cloudcheck