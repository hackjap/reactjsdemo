def DOCKER_REGISTRY = "choisunguk"
def DEPLOYMNET_NAME = ""
def DEPLOYMENT_NAMESPACE = "default"

pipeline {
    agent any

    stages {
        stage('install npm package') {
            steps {
                sh "npm install"
            }
        }
        stage('build project'){
            steps{
                sh "npm run build"
            }
        }
        stage("build docker image and push"){
            steps{
                script {
                    def image_name = result = sh(script:""" node -pe "require('./package.json').version"  """)
                    version = image_name.split(":")[1].trim()

                    // compress artifacts
                    sh "tar -zcvf build.tar build"

                    // build dockerfile
                    docker_imagename = "${DOCKER_REGISTRY}/test-frontend:${version}"
                    def dockerimage = docker.build("${DOCKER_IMAGE_NAME}")

                    // push docker image
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub'){
                        dockerimage.push()
                    }

                    // rmi docker image
                    sh(script:"docker rmi ${docker_imagename}")
                }                
            }
        }
    }
}