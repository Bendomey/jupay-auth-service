## node application
FROM node:16
## We create an /app directory within our
## image that will hold our application source
## files
RUN mkdir /app
## We specify that we now wish to execute 
## any further commands inside our /app
## directory
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD yarn start
EXPOSE 5000