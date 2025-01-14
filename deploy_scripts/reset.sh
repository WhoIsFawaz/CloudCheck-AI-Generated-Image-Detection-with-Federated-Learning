kubectl delete namespace cloudcheck
kubectl config use-context docker-desktop
kubectl create namespace cloudcheck
kubectl config set-context --current --namespace=cloudcheck