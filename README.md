# Nodejs Logging Docker Container

Nodejs app that has an API to handle metric logs.

## 1. API Methods

The API has two methods

### 1.1 POST

**URL:** /metric/{key}

*Response:*

```json
{}
```

This endpoint stores a value for the corresponding metric.

### 1.2 GET

**URL**: /metric/{key}/sum

*Response:*

```json
{
  "value": 400
}
```

This endpoint retrieves the last hour aggregated sum for the corresponding key.

## 2. API Response Status

If everything works successfully, the API returns a HTTP Status 200

If any of the parameters is incorrect, the API returns a HTTP Status 400

If something wrong happen at the server, the API returns a HTTP Status 500

## 3. Tech Stack Used

This example uses Nodejs, Typescript, Express and Docker.

## 4. Execute it

There are two ways of executing the project.

- Microservice way
- Lambda way

For the sake of demonstration, I added an additional layer that allows you to deploy the code as a lambda using Netlify.

### 4.1 Microservice setup

In order to run this project locally, you need the following technologies/tools installed.

- [Docker](https://docs.docker.com/engine/install/)

- [Docker Compose](https://docs.docker.com/compose/install/)

- [Make](https://tldp.org/HOWTO/Software-Building-HOWTO-3.html) (Optional): This is installed by default in Linux and MacOS.

Execute the following commands at the project's root folder.

1. Run it using Make.

```bash
$ make start
```

2. Run it using docker-compose command, directly.

```bash
$ docker-compose up -d
```

### 4.2 Lambda Setup

Try executing this on your terminal:

```bash
curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"value":"20"}' \
  https://node-logging.netlify.app/.netlify/functions/lambda/test
```

[Verify it at the live DEMO](https://node-logging.netlify.app/.netlify/functions/lambda/test/sum)
