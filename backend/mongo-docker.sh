docker run --name mongodb -p 27017:27017 -d --rm \
    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    mongo:5.0.3
