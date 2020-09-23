FROM node:14-alpine AS alpine


WORKDIR usr/src/app/back

COPY package*.json \
    nest-cli.json \
    tsconfig*.json \
    yarn.lock \
 ./


RUN npm install

EXPOSE 3333

COPY .  .

CMD ["npm", "run", "start"]
