# project-1

frontend: react

backend: node

for speed of development, this solution only supports 2 tables (not 10).

## run

need to run in 2 terminals

server:

```
cd server
npm run setup
npm run dev
```

client (http://localhost:4000):

```
cd client
npm start
```

## test

server tests:

```
cd server
npm test
```

client tests:

```
cd client
npm test
```

## gh-pages

create a github personal access token in github user settings > personal access tokens

copy/paste the personal access token value in github repo settings > secrets as `ACCESS_TOKEN`, so github actions has access to it
