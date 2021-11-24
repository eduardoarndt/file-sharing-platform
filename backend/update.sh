docker build -t eduardoarndt/file-sharing-platform-backend .
docker push eduardoarndt/file-sharing-platform-backend

kubectl apply -f k8s/
kubectl rollout restart deploy/backend
