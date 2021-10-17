# Stage 1: build prod
FROM node:16.11.1-alpine3.14 AS build
WORKDIR /app
COPY / ./

RUN npm install -g @angular/cli@10.0.4 && \
    npm install && \
    ng build --configuration production

# Stage 2: serve
FROM caddy:2.4.5-alpine
RUN rm  /etc/caddy/Caddyfile && echo -e ":80 { \n \
    root * /var/www/html\n \
    file_server\n \
    try_files {path} {file} /index.html\n \
}" >> /etc/caddy/Caddyfile

COPY --from=build /app/dist/chest-ui /var/www/html
