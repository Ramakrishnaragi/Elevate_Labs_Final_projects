#  Kubernetes-Based Canary Deployment with K3s and Istio
# Objective: 
- Simulate modern canary deployments with traffic splitting between stable and new app versions.
# Tools: 
- K3s: Lightweight Kubernetes distribution
-	Istio: Service mesh for traffic control and observability
-	Docker: To containerize app
-	Helm: (Optional) for managing Kubernetes apps
- App: Node.js or Python (2 versions)

# Architecture

![image](https://github.com/user-attachments/assets/3f5535d1-93a9-4301-9ca5-c4d58718d69f)

- Step 1: Install K3s
```sh
curl -sfL https://get.k3s.io | sh -
sudo chmod 644 /etc/rancher/k3s/k3s.yaml
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl cluster-info
```

 ![image](https://github.com/user-attachments/assets/6cee2baf-213b-4f18-9bfc-ade6f08396e1)


![image](https://github.com/user-attachments/assets/69aaf871-7a4c-46a5-8e04-1b53936cfeaa)

- Step 2: Install Istio with Helm
```sh
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update
kubectl create namespace istio-system
helm install istio-base istio/base -n istio-system
helm install istiod istio/istiod -n istio-system --wait	
helm install istio-ingress istio/gateway -n istio-system –wait
kubectl get pods -n istio-system # Verify Istio installation
```
![image](https://github.com/user-attachments/assets/554a84df-02cb-4fee-85c7-147aadce8f44)

- Step 3: Label Namespace for Istio Injection

```sh
kubectl create namespace app
kubectl label namespace app istio-injection=enabled
```

- Step 4: Deploy Sample Application
- Create a simple Node.js application with two versions (v1 and v2).
```sh
kubectl apply -f app-v1.yaml
kubectl apply -f app-v2.yaml
```

- Step 5: Configure Istio Gateway and VirtualService
  - Vi gateway.yaml
  - Vi virtualservice.yaml
  - Vi destinationrule.yaml

- Apply the Istio configurations:
  -  kubectl apply -f gateway.yaml
  -  kubectl apply -f destinationrule.yaml
  -  kubectl apply -f virtualservice.yaml

- Monitoring & Metrics: Istio Telemetry (Prometheus + Grafana pre-installed with demo profile)
![image](https://github.com/user-attachments/assets/a9f1c6ec-7f4d-45f0-aca0-c7b8919ce7e1)

- Promotion/Rollback Strategy:
- Promote v1:
![image](https://github.com/user-attachments/assets/f75fa4d2-f20d-44c6-b70f-28a1192a3975)

- Rollback: Reverse weights or scale down v2 deployment

![image](https://github.com/user-attachments/assets/88f07202-90d7-442f-97d7-22b3de6897a3)
