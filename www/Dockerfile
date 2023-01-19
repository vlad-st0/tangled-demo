FROM node:16-alpine

WORKDIR /www
COPY package.json yarn.lock angular.json tsconfig.json tsconfig.app.json ./
COPY src/ ./src/
RUN yarn install

CMD yarn ng build --configuration=production