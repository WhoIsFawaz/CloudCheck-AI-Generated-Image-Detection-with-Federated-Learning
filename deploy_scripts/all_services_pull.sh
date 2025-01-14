#!/bin/sh

docker pull --platform linux/amd64 bloomingteratoma/federated-learning
docker pull bloomingteratoma/global-model 
docker pull bloomingteratoma/frontend 
docker pull bloomingteratoma/auth 
docker pull bloomingteratoma/aws-s3 
docker pull bloomingteratoma/envoy
docker pull bloomingteratoma/cloudcheck 

docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME/.kube/config:/root/.kube/config" \
  bloomingteratoma/cloudcheck