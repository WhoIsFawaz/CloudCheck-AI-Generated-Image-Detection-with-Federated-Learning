# CloudCheck

By TAY JEUNG HONG (2301036), LIM LIANG FAN (2300937), MOHAMED FAIZAL MOHAMED FAWAZ (2300938), GOH JIA RUI GARY (2300954), NG JIA WEI (2301008), SURESH KUMAR BALAVIGNESH (2301110)

AI-Generated Image Detection using Federated Learning and Cloud-Native Architecture

### Project Usage

**NOTE**: This project requires a significant amount of CPU and RAM to run. Ensure that your device has at least 8GB of free RAM with a multi-core CPU (at least 3 cores).

**NOTE**: Each microservice is not designed to be executed independently as they are dependent on the services provided by one another. However, some microservices may still be executed independently but may not work as intended. To do so, build the `Dockerfile` in the respective microservice's folder and run the created image.

The entire **CloudCheck** system has been containerized into a Docker image. To run the **CloudCheck** system locally on your environment, run the main Docker image that contains the required `.yaml` files to create the Kubernetes cluster.

Running the entire **CloudCheck** project is recommended to ensure that everything works as intended. To run **CloudCheck**, follow the instructions below:

#### Prerequisites

1. Ensure that you have the following software installed on the machine you are using:
   - [Docker](https://docs.docker.com/engine/install/)
   - [Docker Desktop](https://docs.docker.com/desktop/install/)
   - [Kubernetes](https://kubernetes.io/docs/tasks/tools/)
     - !!! Must download Kubernetes from Docker Desktop !!!
   - [Minikube](https://minikube.sigs.k8s.io/docs/start/)
2. **CloudCheck** requires the use of the following local ports to run. Ensure that they are kept free and exposed in your machine's firewall settings:
   ```
   Port 3000 (for Front-End Microservice)
   Port 8080 (for Envoy Microservice)
   ```
3. Ensure that your Kubernetes namespace **cloudcheck** is cleared:
   ```bash
   kubectl delete namespace cloudcheck
   ```
4. Remove any existing minikube configurations, if any:
   ```bash
   minikube delete
   ```

#### Database Setup

5. To handle its storage needs, a database has been pre-configured and is running on the cloud. However, if you intend to use your own database, follow the instructions below:

   - Create a SQL database.
   - Modify the `cloudcheck` Docker image's `secrets.yaml` file with your database connection details (URL, host, and password), ensuring that they are all base64 encoded.

     - Use the following bash command to get the bas64 string:

     ```bash
     echo "mysql://user:password@database_hostname:3306/cloudcheck_db?connection_limit=1&connect_timeout=300&schema=public&pool_timeout=300" | base64
     ```

     - NOTE: Database URL ought to be in this format:

     ```
     mysql://<username>:<password>@<host>:<port>/<database_name>?connection_limit=1&connect_timeout=300&schema=public&pool_timeout=300

     - Ensure the following before connecting:
         - Make sure the username and password are URL safe (no special characters).
         - If trying to connect to a database on the host machine use `host.docker.internal` instead of `localhost`.
     ```

#### Running the Docker Image

6. Build and deploy the Docker images of every `cloudcheck` service by running the following scripts inside the `deploy_scripts` folder if running locally:

   ```bash
   sh all_services_deploy.sh
   ```

If pulling images from Docker Hub, run these commands instead:
`bash
    docker pull --platform linux/amd64 bloomingteratoma/federated-learning
    docker pull bloomingteratoma/global-model 
    docker pull bloomingteratoma/frontend 
    docker pull bloomingteratoma/auth 
    docker pull bloomingteratoma/aws-s3 
    docker pull bloomingteratoma/envoy
    docker pull bloomingteratoma/cloudcheck 
    `

7. Run the `cloudcheck` Docker image locally:

   - For Windows-based devices:

   ```bash
   sh cloudcheck_deploy.sh
   ```

   - For Mac-based devices:
   ```bash
   sh mac_cloudcheck_deploy.sh
   ```

If pulling images from Docker Hub, run these commands instead: 

    - For Windows-based devices:
    ```bash
    docker run -it --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v "$HOME/.kube/config:/root/.kube/config" \
        bloomingteratoma/cloudcheck
    ```

    - For Mac-based devices:
    ```bash
    docker run -it --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v ~/.kube/config:/root/.kube/config \
        bloomingteratoma/cloudcheck
    ```

#### Verifying Kubernetes Setup

8. Once an interactive terminal within the Docker container has been obtained, ensure that all the containers in the `cloudcheck` namespace are running. This process may take a while as the project consists of different microservices that need to be executed together with other load-balancing and scaling operations:
   ```bash
   # Within Docker container
   kubectl get all -n cloudcheck
````

#### Deploy changes made to a service

After making changes to a service, deploy the changes made to that service by running the following command:
`bash
    sh single_service_deploy.sh <path to service folder>
    `

If you need to deploy changes made to multiple services at once, run the commands at steps 6 and 7.

If you are not able to view the changes made still, try the `Reset Kubernetes Cluster` option under Docker Desktop, and then run the above scripts.

#### General Troubleshooting

- If your pod is not running, check its status by running the following command inside the Kubernetes container:
  ```bash
  # Within Docker container
  kubectl describe pod [podname]
  ```

Example:

```bash 
# Within Docker container
kubectl describe pod auth-deployment
kubectl logs -f deployment/auth-deployment
```

- Test the configuration:

  ```bash
  # Within Docker container
  kubectl get all -n cloudcheck
  ```

- If your Envoy external IP is stuck at pending, restart Kubernetes and redeploy CloudCheck by running the `cloudcheck` Docker image:

  - For Windows-based devices:

    ```bash
    sh cloudcheck_deploy.sh
    ```

  - For Mac-based devices:
    ```bash
    sh mac_cloudcheck_deploy.sh
    ```

  ```bash
  # Within Docker container
  kubectl describe pod [podname]
  ```

#### Troubleshooting for Mac Users

When running on a Mac device, you may encounter issues with Kubernetes' API as follows:

```
**E1110 11:28:05.888283      47 memcache.go:265] couldn't get current server API group list: Get "http://localhost:8080/api?timeout=32s": dial tcp 127.0.0.1:8080**

**: connect: connection refused**

**E1110 11:28:05.892096      47 memcache.go:265] couldn't get current server API group list: Get "http://127.0.0.1:6443/api?timeout=32s": dial tcp 127.0.0.1:8080**

**: connect: connection refused**
```

To fix this issue, perform the following steps:

- Use the Docker Desktop context:
  ```bash
  kubectl config use-context docker-desktop
  ```
- Set the Docker Desktop cluster server to the internal one
  ```bash
  kubectl config set-cluster docker-desktop --server=https://kubernetes.docker.internal:6443
  ```
- Rerun the `cloudcheck` Docker image:
  ```bash
  docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock -v ~/.kube/config:/root/.kube/config bloomingteratoma/cloudcheck:arm
  ```
- Save and test the configuration:
  ```bash
  kubectl get all -n cloudcheck
  ```

If you come across any other problems while deploying changes, do the following command:

- Switch cluster server:
  ```bash
  kubectl config set-cluster docker-desktop --server=https://127.0.0.1:6443
  ```
  Rerun the commands now.

If the external IP is stuck at pending, do the following command:

- Check whether the port is open:

  ```bash
  lsof -i tcp:8080
  ```

- Obtain the PID of the port.

- Kill the port:
  ```bash
  kill -3 <PID>
  ```

#### Final Steps

8. Enter the CloudCheck web application by opening up [http://localhost:3000](http://localhost:3000) in your browser.

TODO:
- JWT integration
- auth fix (password hashing)
- global model transfer

