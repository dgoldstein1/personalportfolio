# base image
FROM node:13.13

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm install
RUN npm install react-scripts@1.1.0 -g

# start app
CMD ["npm", "start"]