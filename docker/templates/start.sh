#! /bin/bash

# run migration
ENV_SILENT=true node ./ace migration:run --force

# start application
ENV_SILENT=true node server.js
