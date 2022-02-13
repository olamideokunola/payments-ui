# syntax=docker/dockerfile:1

FROM node:15-alpine
COPY . /payments-ui
CMD npm start