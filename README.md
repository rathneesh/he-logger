# he-logger
Hubot Enterprise Audit and Logging System

This is a complete, containerized ecosystem for logging and auditing for
`Hubot Enterprise`.

> Currently, only logging aggregation is supported.

This is a list of **core** services:

- `logger`: a `fluentd` customized container that aggregates logs from different sources.
- `elastic`: an `elasticsearch` container to store aggregated logs.
- `kibana`: a `kibana` container to query and visualize `elasticsearch` logs.

This is a list of **optional** services:

- `demo_service`: a `nodejs` service that sends `mock` data to `fluentd` container (used as a demo).

# General Usage

## 1. Download scripts and configurations

Download `master` branch:

```bash
# Using git
git clone https://github.com/eedevops/he-logger.git && cd he-logger
```

## 2. Configure environment for services

- (_Optional_) Modify the included `fluentd` configuration file under `./conf/fluentd.conf`.
- Create a directory for `elasticsearch` to keep its data: `mkdir esdata`

## 3. Build and run core services

- Build docker images:

  ```bash
  # Will build docker images that have Dockerfiles
  docker-compose build
  ```

- Start services:

  ```bash
  docker-compose up
  ```

- Connect `fluentd` clients to send logs to `localhost:24224`.
- Access `kibana` dashboard at `localhost:5601`.

# Logging for Hubot Enterprise services

- Follow the steps in the [General Usage](#general-usage) section.
- Set environment variables for your `he-<service>`:

  ```bash
  # your fluentd host address and port (required)
  export FLUENTD_HOST=localhost
  export FLUENTD_PORT=24224

  # and optionally the following values in milliseconds
  export FLUENTD_TIMEOUT=600000
  export FLUENTD_RECONNECT=10

  # Configure env vars for your service
  ...

  # Example: run your service, let's say identity portal
  cd he-identity-portal && npm run server
  ```

Your service logs should be sent to `fluentd` and you should be able to see
them eventually in the `kibana` dashboard.

> WIP: standardizing all service configurations for `fluentd`.
> Visit the documentation of each service repo / wiki for latest details.

# Running demo environment

- Follow the steps in the [General Usage](#general-usage) section **except**
  building and running the _core_ services.
- Build and run core services **plus** optional services:
  - Build docker images:
    ```bash
    # Will build docker images that have Dockerfiles
    docker-compose \
      -f docker-compose.yml \
      -f demo_service/dc.yml \
      build
    ```

  - Start services:
    ```bash
    docker-compose \
      -f docker-compose.yml \
      -f demo_service/dc.yml \
      up
    ```

# Running in a proxy environment

If you are building and running these services in an environment bound to an
`http_proxy`, we are providing some convenience `docker-compose` yaml files
that _pass through_ the most common environment variables to your `docker`
build processes and to your container _runtime_ environments:

- Build and start services in a proxy env:

  ```bash
  # Will build docker images that have Dockerfiles
  docker-compose \
    -f docker-compose.yml \
    -f dc.proxy.yml \
    -f demo_service/dc.yml \
    -f demo_service/dc.proxy.yml \
    up --build
  ```

> Note that you may remove the yml files for `demo_service` if you are just running
> the **core** services.

# Running in production

- Follow the steps in the [General Usage](#general-usage) section with the
  slight modification of downloading (cloning) this repo into a production machine.
- Make sure that ports `24224` and `5601` are open in your VM and `myvmhost` is accessible through your network.
- Set environment variables for your `he-<service>`:

  ```bash
  # your fluentd host address and port (required)
  export FLUENTD_HOST=`myvmhost`
  export FLUENTD_PORT=24224

  # and optionally the following values in milliseconds
  export FLUENTD_TIMEOUT=600000
  export FLUENTD_RECONNECT=10

  # Configure env vars for your service
  ...

  # Example: run your service, let's say identity portal
  cd he-identity-portal && npm run server
  ```

Your service logs should be sent to `fluentd` using the `myvmhost:24224` endpoint
and you should be able to visualize them eventually in the `kibana` dashboard at
`myvmhost:5601`.

# License

[The MIT License](/LICENSE)
