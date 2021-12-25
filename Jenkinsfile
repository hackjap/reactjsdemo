def DOCKER_REGISTRY = "choisunguk"
def DEPLOYMNET_NAME = "reactjs-demo"
def DEPLOYMENT_NAMESPACE = "default"

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 14.5.0') {
                    sh 'npm install && npm run build'
                }
            }
        }
    }
}