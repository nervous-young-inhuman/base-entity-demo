# base-entity-demo
Demo of {BaseEntity} from @shipwaves/api-libs.


# Pre-requisites
## Docker setup
If you don't want to bother setting up mongodb or RabbitMQ
follow the [Docker usage instructions](#the-docker-dev-env)

## Native Setup
* Node 17.2.0(not sure how it interacts with other versions)
* RabbitMQ
* Mongodb

# Installation
```shell
git clone https://github.com/nervous-young-inhuman/base-entity-demo.git base-entity-demo
cd base-entity-demo
npm install
```


# Dev Environment Start
* Start the Mongodb
* Start rabbitmq server
```shell
npm run start
```

# Usage
Once the server starts running at http://localhost:8000/ [^1]
visit the browser and view the get URLS such as [/books](http://localhost:8000/books)
to get a list of books or `/books/:book_id` to get a particular book details.

You can try the posting a data to [/books](http://localhost:8000/books) to create a
new book entry.


# Footnotes
[^1]: If you have set LOCAL_PORT to something else in the .env file then visit that port number.
