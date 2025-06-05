FROM node:18.19-slim
WORKDIR /opt/app
COPY package.json package.json
RUN npm install
RUN rm -f /opt/app/node_modules/.bin/node
COPY . .
RUN npm run build
RUN npm prune --production
CMD ["node", "dist/main.js"]
