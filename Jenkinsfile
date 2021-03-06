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
        stage('compress build files'){
            steps{        
                sh "cd ${WORKSPACE}"        
                sh "tar -zcvf build.tar build"
            }
        }
        stage("build dockerfile"){
            steps{
                script {
                    dockerimage = docker.build("${DOCKER_IMAGE_NAME}")
                }                
            }
        }
        stage('push docker image'){
            steps{
                script{
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub'){
                        dockerimage.push()
                    }
                }
            }
        }
    }
}