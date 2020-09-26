# Backend microservices

The idea is to provide all three stages (segmentation of the lung, distinction pneumonia vs. normal, distinction baterial vs. viral) in the form of microservices. The frontend can then easily integrate these services. A docker image for each service will later be provided.

*Todo:* Find a solution to update models on the fly. This problem might be solved by using versioned docker images.

## Stage 1 - lung segmentation

The first stage performs the lung segmentation via the trained unet model.
In order to use this microservice call it via REST Multipart form => ['img'].

```http://127.0.0.1:5000/stage1/predict```

## Stage 2 

coming soon

## Stage 3

coming soon