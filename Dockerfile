FROM node:8.11
WORKDIR /src
ADD package.json .
RUN npm install --quiet
RUN npm install -g --quiet @angular/cli
ADD . .
EXPOSE 4200
CMD ng serve --host 0.0.0.0 --public-host https://aksorn.org/ --disable-host-check
