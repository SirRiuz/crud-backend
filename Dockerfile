FROM node:16

WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
RUN npm install

COPY . .

# RUN ls -a
RUN npm install -g typescript
RUN tsc

EXPOSE 8000


CMD [ "node", "build/src/server.js" ]


