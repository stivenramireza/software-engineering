FROM node:11-alpine
ENV SERVER_PORT=3000 DB_USER="user1" DB_PASSWORD="eafit.2018" DB_HOST="ds147003.mlab.com:47003/mvmblockchain" JWT_SECRET="reallynigga" 
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD node app.js --prefix serverEndpoint