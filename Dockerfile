FROM debian:jessie

RUN apt-get update
RUN apt-get install -y nginx fcgiwrap
RUN apt-get install -y wget telnet vim

# install nodejs

RUN wget http://security-cdn.debian.org/debian-security/pool/updates/main/libs/libssh2/libssh2-1_1.4.3-4.1+deb8u6_amd64.deb
RUN dpkg -i libssh2-1_1.4.3-4.1+deb8u6_amd64.deb
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get update
RUN apt-get install -y nodejs

# nginx config
COPY nginx.conf /etc/nginx/sites-enabled/

# rights for the fcgi socket
RUN chmod 777 /run

RUN /etc/init.d/nginx reload

COPY . /var/www/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 6969

STOPSIGNAL SIGTERM

#CMD ["nginx", "-g", "daemon off;"]

CMD service fcgiwrap start; nginx -g "daemon off;"