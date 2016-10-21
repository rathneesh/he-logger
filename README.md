# he-logger
Hubot Enterprise Audit and Logging System
This is the very first version with a full working ecosystem. It includes a mock service which generates two logs, one on startup and one when a user points a browser at `localhost:3000`. The log is sent to the `fluentd` container, which aggregates it, and sends it to the `elasticsearch` container. The logs can be seen by accessing the `kibana` service container (by default running on `localhost:5601`). 

# Usage
- first build the images with:
```docker-compose build```

- then startup with:
```docker-compose up```

