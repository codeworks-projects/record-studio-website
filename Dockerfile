FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:22-alpine as prod

WORKDIR /usr/src/app

COPY --from=build --chown=node:node /usr/src/app/.output /usr/src/app/.output

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]