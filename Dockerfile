FROM node:18.19-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm instsall
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "dist/main.js"]
