FROM node:16-alpine

RUN mkdir /messe-basse-production.com
WORKDIR /messe-basse-production.com

RUN apk add --update --virtual .tmp-deps python3 make g++ && \
    rm -rf /var/cache/apk/*

COPY package.json .
RUN npm install --quiet

RUN apk del .tmp-deps

COPY . .

RUN npm run build
