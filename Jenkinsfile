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
    }
}