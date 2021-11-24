docker build -t eduardoarndt/file-sharing-platform-frontend .
docker push eduardoarndt/file-sharing-platform-frontend

kubectl apply -f k8s/
kubectl rollout restart deploy/frontend
