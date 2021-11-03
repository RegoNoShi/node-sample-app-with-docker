# node-sample-app-with-docker

## How to run
### Run in dev mode with local image build and node with autoreload
```
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml -d up
```
### Run in prod mode with image from Docker Hub
```
docker-compose -f docker-compose.yaml -d up
```
### Build the app image
```
docker-compose -f docker-compose.yaml build app
```
### Upload the image to Docker Hub
```
docker-compose -f docker-compose.yaml push app
```
