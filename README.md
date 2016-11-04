# he-logger
Hubot Enterprise Audit and Logging System
This is the very first version with a full working ecosystem. It includes a mock service which generates two logs, one on startup and one when a user points a browser at `localhost:3000`. The log is sent to the `fluentd` container, which aggregates it, and sends it to the `elasticsearch` container. The logs can be seen by accessing the `kibana` service container (by default running on `localhost:5601`). 

Of course you can remove the mock service, and delete it from the docker-compose file.


# Usage
- Configure the included  fluentd configuration file. Ese the `myservice` configuration as an example.
- Create a directory for `elasticsearch` to keep its data:
- ```mkdir esdata```
- build the images:
```docker-compose build```

- startup:
```docker-compose up```

