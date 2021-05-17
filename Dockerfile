FROM nginx:1.19.0-alpine

COPY ./public /app/public

RUN mkdir -p /var/www/work_front/html && \
    cp -r /app/public/* /var/www/work_front/html/

COPY ./default.conf /etc/nginx/conf.d/default.conf