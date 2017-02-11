FROM node:7.2.0

ENV DEBIAN_FRONTEND=noninteractive

RUN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

ENV NODE_ENV=production

RUN webpack --config webpack.config.prod.js

ENV PORT=4000

CMD [ "/usr/local/bin/node", "./index.js" ]

EXPOSE 4000