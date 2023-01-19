FROM node:18-alpine

WORKDIR /api
COPY package.json yarn.lock tsconfig.json docker-entrypoint.sh ./

ENTRYPOINT ["sh" , "./docker-entrypoint.sh"]