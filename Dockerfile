FROM node:6.9.4-alpine

MAINTAINER Mario Luan <mariosouzaluan@gmail.com>

ENV APP_DIR /opt/app

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

ADD package.json $APP_DIR
RUN npm install

ADD . $APP_DIR

EXPOSE 3000