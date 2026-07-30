pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node20'
    }

    environment {
        SCANNER_HOME = tool('SonarScanner')

        IMAGE_NAME = "sunbeamak/nexguard:latest"

        SONAR_URL = "http://13.126.147.6:9000"

        KUBECONFIG = "/var/jenkins_home/.kube/config"

        AWS_PAGER = ""
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/12gauri/NexGuard-SecureFlow.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('frontend') {
                    sh 'CI=true npm test -- --coverage --watchAll=false'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('frontend') {

                    withSonarQubeEnv('SonarQube-Server') {

                        sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=NexGuard-SecureFlow \
                        -Dsonar.projectName=NexGuard-SecureFlow \
                        -Dsonar.sources=src \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.exclusions=node_modules/**,build/**,coverage/** \
                        -Dsonar.host.url=${SONAR_URL}
                        """

                    }

                }
            }
        }

        stage('Quality Gate') {

            steps {

                timeout(time: 10, unit: 'MINUTES') {

                    waitForQualityGate abortPipeline: true

                }

            }

        }

        stage('Trivy File Scan') {

            steps {

                dir('frontend') {
                    sh '''
                    pwd
                    ls -la
                    trivy fs \
                        --scanners vuln,secret \
                        --severity LOW,MEDIUM,HIGH,CRITICAL \
                        --format table \
                        -o trivyfs.txt .
                    '''
}

            }

        }

        stage('Docker Build') {

            steps {

                withCredentials([
                    string(credentialsId: 'rapid-api-key',
                    variable: 'RAPID_API_KEY')
                ]) {

                    sh """
                    docker build \
                    --build-arg REACT_APP_RAPID_API_KEY=\$RAPID_API_KEY \
                    -t nexguard:latest \
                    -f Dockerfile .
                    """

                    sh "docker tag nexguard:latest ${IMAGE_NAME}"

                }

            }

        }

        stage('Trivy Image Scan') {

            steps {

                sh """
                trivy image \
                --severity HIGH,CRITICAL \
                --format table \
                -o trivyimage.txt \
                ${IMAGE_NAME}
                """

            }

        }

        stage('Docker Push') {

            steps {

                withDockerRegistry(
                    credentialsId: 'docker-hub',
                    url: 'https://index.docker.io/v1/'
                ) {

                    sh "docker push ${IMAGE_NAME}"

                }

            }

        }

        stage('Deploy to EKS') {

            steps {

                dir('Kubernetes') {

                    sh '''

                    export KUBECONFIG=/var/jenkins_home/.kube/config
                    export AWS_PAGER=""

                    aws sts get-caller-identity

                    kubectl get nodes

                    kubectl apply -f deployment.yml

                    kubectl apply -f service.yml

                    kubectl rollout status deployment/youtube-app --timeout=300s

                    kubectl get pods

                    kubectl get svc

                    '''

                }

            }

        }

    }

    post {

        always {

            archiveArtifacts(
                artifacts: 'frontend/trivyfs.txt,frontend/coverage/**,trivyimage.txt',
                allowEmptyArchive: true
            )

            emailext(

                to: 'patilgau2003@gmail.com',

                subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                attachLog: true,

                attachmentsPattern: 'frontend/trivyfs.txt,trivyimage.txt',

                mimeType: 'text/html',

                body: """
                <h2>NexGuard SecureFlow Pipeline</h2>

                <table border="1" cellpadding="8">

                <tr>
                <th>Build</th>
                <td>${env.BUILD_NUMBER}</td>
                </tr>

                <tr>
                <th>Status</th>
                <td>${currentBuild.currentResult}</td>
                </tr>

                <tr>
                <th>Docker Image</th>
                <td>${IMAGE_NAME}</td>
                </tr>

                </table>

                <br>

                Jenkins:
                <br>

                <a href="${env.BUILD_URL}">
                ${env.BUILD_URL}
                </a>

                <br><br>

                SonarQube:
                <br>

                <a href="${SONAR_URL}/dashboard?id=NexGuard-SecureFlow">
                ${SONAR_URL}/dashboard?id=NexGuard-SecureFlow
                </a>

                """
            )

            sh 'docker image prune -f || true'
        }

        success {
            echo 'Pipeline Completed Successfully'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}
