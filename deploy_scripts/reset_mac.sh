# kubectl config set-cluster docker-desktop --server=https://127.0.0.1:6443
# kubectl delete namespace cloudcheck
kubectl config use-context docker-desktop
# kubectl create namespace cloudcheck
kubectl config set-context --current --namespace=cloudcheck
kubectl config set-cluster docker-desktop --server=https://127.0.0.1:6443