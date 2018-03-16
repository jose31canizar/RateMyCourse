# RateMyCourse
Make college easier by visualizing your future.

## Set Up for Mac
Brew install yarn\
yarn install in client\
yarn install outside of client\
yarn start in client for development server (localhost:3000)\
yarn build in client to create bundle\
cp -r build .. in client to copy bundle up a directory\
npm run start outside of client to run app on localhost:9001 (ip address must be approved by Jackson)\

## Set Up for Windows
Instead of brew, use choco.\

## Proposed Backend Architecture

The most ideal architecture for RateMyCourse is as follows. 

### API
#### index.js is the master API that routes requests and enqueues long standing requests. It will use the 'cluster' module in order to run on multiple CPU cores and 'systemd' to restart itself if it crashes.\
index.js - API, routes to appropriate router with the appropriate endpoint\
template_chain.js - template promise chain


### Routers
number_and_year.js - search by number and year\
subject_and_year.js - search by subject and year\
number_and_subject.js - search by number and subject\
course.js - search by all three fields

### Offloading
#### The API sends messages to RabbitMQ to enqueue tasks for workers.\
worker.js - worker script using RabbitMQ to handle long standing http requests, uses the AMQP Protocol (we could use the lighter weight MQTT protocol too, we need to read up on which one is better for our use case)

### Logging
As we scale up, we'll need a logging service so we know of any errors through text message immediately. We can hook up Twilio to our to our app to do so.\ 
https://raw.githubusercontent.com/chaddjohnson/wc-fulfillment-services/master/lib/logger.js?token=AApRJimfA3u8-thBm7fbDfhxMaXLz8Pwks5atDrowA%3D%3D\
https://raw.githubusercontent.com/chaddjohnson/wc-fulfillment-api/master/src/bootstrappers/logging.js?token=AApRJtBtRMMAQt_vCGXO0JSdZ0_JutFOks5atDsHwA%3D%3D\
