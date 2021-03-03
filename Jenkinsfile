def DOCKER_IMAGE_TAG = "dev"
def DOCKER_IMAGE_NAME = "test-frontend:${DOCKER_IMAGE_TAG}"

pipeline {
    agent any

    stages {
        stage('install package') {
            steps {
                sh "npm install"
            }
        }
        stage('build'){
            steps{
                sh "npm run build"
            }
        }
        stage('compress build'){
            steps{        
                sh "cd ${WORKSPACE}"        
                sh "tar -zcvf build.tar build"
            }
        }
        stage("docker build"){
            steps{
                sh "docker build -t ${DOCKER_IMAGE_NAME} ."
            }
        }
    }
}