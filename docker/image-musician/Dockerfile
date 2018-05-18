FROM node:4.3.1
MAINTAINER Remy Nasserzare <remy.nasserzare@heig-vd.ch>

COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/musician.js"]