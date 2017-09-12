FROM alpine:latest
MAINTAINER Chance Hudson

EXPOSE 3000

RUN apk add --no-cache nginx && \
  mkdir -p /run/nginx

COPY ./client /www
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./bootstrap.sh /bootstrap.sh

ENTRYPOINT ["/bootstrap.sh"]
