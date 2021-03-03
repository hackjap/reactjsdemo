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
                sh "tar -zcvf ./build build.tar"
            }
        }
    }
}