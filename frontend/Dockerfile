FROM node:14-alpine AS alpine


WORKDIR usr/src/app/front

COPY package.json \
     tsconfig.json \ ./


RUN npm install

EXPOSE 8080

COPY . .

CMD ["npm", "start"]
