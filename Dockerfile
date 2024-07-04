FROM nginx:latest
RUN echo "server { listen 80; location /beeboat-parser { root   /var/www/html/; index  index.html index.htm;}} " > /etc/nginx/conf.d/default.conf && mkdir -p /var/www/html
ADD dist/ /var/www/html/
EXPOSE 80
