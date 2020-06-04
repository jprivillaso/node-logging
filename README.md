# Nodejs Logging Docker Container

Nodejs app that has an API to handle metric logs.

## Features

The API has two methods

- **POST** /metric/{key}

*Response:*

```json
{
  "value": 400
}
```

This endpoint stores a value for the corresponding metric.

Try executing this on your terminal:

```bash
curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"value":"20"}' \
  https://node-logging.netlify.app/.netlify/functions/lambda?key=test
```

- **/GET** /metric/{key}/sum

*Response:*

```json
{
  "value": 400
}
```

[Verify it at the live DEMO](https://node-logging.netlify.app/.netlify/functions/lambda?key=test)

This endpoint retrieves the last hour aggregated sum for the corresponding key.

## HTTP Response

If everything works successfully, the API returns a HTTP Status 200

If any of the parameters is incorrect, the API returns a HTTP Status 400

If something wrong happen at the server, the API returns a HTTP Status 500

## Tech Stack Used

This example uses Nodejs, Typescript, Express and Docker.

## Dependencies

In order to run this project locally, you need the following technologies/tools installed.

- [Docker](https://docs.docker.com/engine/install/)

- [Docker Compose](https://docs.docker.com/compose/install/)

- [Make](https://tldp.org/HOWTO/Software-Building-HOWTO-3.html) (Optional): This is installed by default in Linux and MacOS.

## Execute it

Execute the following commands at the project's root folder.

1. Run it using Make.

```bash
$ make start
```

2. Run it using docker-compose command, directly.

```bash
$ docker-compose up -d
```
