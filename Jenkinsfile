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
        stage('get project version'){
            steps{
                script{
                    image_name = result = sh(script:""" kubectl get po -A -o json | jq --raw-output '.itmes[].spec.containers.image | select(. == "${docker_imagename}")' | sort | """)
                    current_version = image_name.split(":")[1].trim()
                }    
            }
        }
        stage('change deployment image name'){
            steps{
                dir ('kubernetes_resource'){
                    script {
                        def sed_docker_image_name = docker_image_name.replace("/", "\\/")
                        sh(script:"""sed -i "s/IMAGE_NAME/${sed_docker_image_name}/g" deployment.yaml""")
                    }
                }
            }
        }
        stage('deploy restart same image version'){
            when{
                expression{
                    current_version == version
                }
            }
            steps{
                dir ('kubernetes_resource'){
                    script {
                        sh(script: """kubectl apply -f .""")
                        sh(script: """kubectl rollout restart deployment ${DEPLOYMNET_NAME} -n ${DEPLOYMENT_NAMESPACE}""")
                    }
                }
            }
        }
        stage('deploy on kubernetes'){
            when{
                expression {
                    current_version != version
                }
            }
            steps{
                dir ('kubernetes_resource'){
                    sh 'kubectl apply -f .' 
                }
            }
        }
    }
}