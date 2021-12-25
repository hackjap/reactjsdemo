def DOCKER_REGISTRY = "choisunguk"
def DEPLOYMNET_NAME = "reactjs-demo"
def DEPLOYMENT_NAMESPACE = "default"

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'npmsetting') {
                    sh 'npm install && npm run build'
                }
            }
        }
    }
}