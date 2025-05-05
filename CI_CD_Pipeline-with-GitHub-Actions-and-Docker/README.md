# CI/CD Pipeline with GitHub Actions & Docker
# Tools
- GitHub Action (CI/CD)
- Docker and DockerHub (Image build and push)
- Local VM or Minikube
# Overview:

![image](https://github.com/user-attachments/assets/c343e332-84ca-4095-96dc-583300e8e41b)


# Step-by-Step Process:
- Create Your Application:
   - app.js (python-flask-app)
```sh
from flask import Flask
import os
app = Flask(__name__)
@app.route("/")
def hello():
    return "Flask sample application!!"
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True,host='0.0.0.0',port=port)
```
  - requirements.txt:
    flask
  - Dockerfile:
```sh
FROM python:3.6
MAINTAINER veera "Ramakrishna"
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
#ENTRYPOINT ["python"]
EXPOSE 5000
CMD ["python", "app.py"]
```
- Create GitHub Actions Workflow --- .github/workflows/docker-ci-cd.yml
```sh
name: CI/CD Pipeline
on:
  push:
    branches: [main]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v3
    - name: Log in to Docker Hub
      run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
    - name: Build Docker Image
      run: docker build -t ${{ secrets.DOCKER_USERNAME }}/myapp:latest .
    - name: Push Docker Image
      run: docker push ${{ secrets.DOCKER_USERNAME }}/myapp:latest
```
# Set GitHub Secrets:
- DOCKER_USERNAME
- DOCKER_PASSWORD
# Push Code to GitHub Repo

![image](https://github.com/user-attachments/assets/85cbaccc-eca2-43d0-885d-31c90c3d3dab)


![image](https://github.com/user-attachments/assets/c30b2ebc-442f-4886-8197-caad085665a4)


# Pull & Run Docker Image:
- docker pull your-docker-username/myapp:latest -------> https://docker pull ramakrishnaragi/python-flask-app:latest (docker hub link)
- docker run -p 5000:5000 your-docker-username/myapp:latest

![image](https://github.com/user-attachments/assets/1d126492-df36-4f14-912a-41814dbde134)

![image](https://github.com/user-attachments/assets/d54a552e-af16-471d-8c52-0f6d6d0cd3d7)
