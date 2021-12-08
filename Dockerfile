FROM nginx:1.21.3
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html/

COPY dist/camunda-frontend .