FROM node:lts-alpine

RUN mkdir -p /home/node/server/node_modules && chown -R node:node /home

WORKDIR /home/node/server

COPY package.json yarn.* ./

USER node

RUN yarn

COPY . .

EXPOSE 3333

ENTRYPOINT [ "./init.sh" ]
