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
                sh "npm build"
            }
        }
    }
}
