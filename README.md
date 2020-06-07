# Nodejs Logging Docker Container

Nodejs app that has an API to handle metric logs. To see the live DEMO, please go to the section 4.2.1 under this document.

## 1. API Methods

The API has two methods

### 1.1 POST

**URL:** /metric/{key}

**Body:**

```json
{
  "value": 400
}
```

**Response:**

```json
{}
```

This endpoint stores a value for the corresponding metric.

### 1.2 GET

**URL**: /metric/{key}/sum

**Response:**

```json
{
  "value": 400
}
```

This endpoint retrieves the last hour aggregated sum for the corresponding key.

**Important:**

Whenever you try to get the sum from a metric that hasn't been logged yet, the API will return 0.

## 2. API Response Status

If everything works successfully, the API returns a HTTP Status 200

If any of the parameters is incorrect, the API returns a HTTP Status 400

If something wrong happen at the server, the API returns a HTTP Status 500

If you make a request using an unsupported HTTP method, the API returns a HTTP Status 405.

## 3. Tech Stack Used

This example uses Nodejs, Typescript, Express and Docker.

## 4. Execute it

There are two ways of executing the project.

- Microservice way
- Lambda way

For the sake of demonstration, I added an additional layer that allows you to deploy the code as a lambda function using Netlify, but you can run it as a Docker container as well.

### 4.1 Microservice

In order to run this project locally, you need the following technologies/tools installed.

- [Docker](https://docs.docker.com/engine/install/)

- [Docker Compose](https://docs.docker.com/compose/install/)

- [Make](https://tldp.org/HOWTO/Software-Building-HOWTO-3.html) (Optional): This is installed by default in Linux and MacOS.

Execute the following commands at the project's root folder.

1. Run it using Make.

```bash
$ make start
```

**OR**

2. Run it using docker-compose command.

```bash
$ docker-compose up -d
```

### 4.2 Lambda

In order to deploy this lambda to Netlify, you must execute the following command

```
$ netlify deploy
```

Follow the instructions to connect it to your Netlify's account.

#### 4.2.1 Test Live Demo

Try executing this on your terminal:

```bash
curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"value":"20"}' \
  https://node-logging.netlify.app/.netlify/functions/lambda/test
```

[Verify it at the live DEMO](https://node-logging.netlify.app/.netlify/functions/lambda/test/sum)
