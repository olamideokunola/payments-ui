# syntax=docker/dockerfile:1

FROM node:15-alpine
WORKDIR /payments-ui
COPY . /payments-ui
CMD npm start