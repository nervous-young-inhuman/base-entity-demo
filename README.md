# base-entity-demo
Demo of {BaseEntity} from [@shipwaves/api-libs](https://www.npmjs.com/package/@shipwaves/api-libs)

# Description
A declarative REST model definer for JS. Which auto defines the 
controllers, consumers and the model based on the schema and
the name of the entity. 

The routes also have a declarative interface, but they have to explicitly defined and added to MainRouter.
Check out some [examples in the entities directory](https://github.com/nervous-young-inhuman/base-entity-demo/blob/main/src/entities/).

# Installation
You can either run it natively or run the whole thing through docker container.
I prefer to run it the docker way and have only documented the same.
So make sure you have [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed before running.   
If you have docker desktop installed then both of these should be available.

## Clone the project
```shell
git clone https://github.com/nervous-young-inhuman/base-entity-demo.git base-entity-demo
cd base-entity-demo
```

## Run the environment setup script
```shell
./dev-env.sh
```
This shall start the docker environment and api server will be up at http://localhost:8000/
It might take some time to start.  
The shell also exports a function called 'dc' which is a simple wrapper for `docker-compose`
so running something like `dc logs api` should get you the logs of the api or `dc down` will
bring down the system.   
The server start at port 8000 by default if you would like to start at some other port,
change `LOCAL_PORT` in [docker/.env](https://github.com/nervous-young-inhuman/base-entity-demo/blob/main/docker/.env)
to some other number and it should start there.

## Usage
Once the server starts running at http://localhost:8000/ [^1]
visit the browser and view the get URLs such as [/book](http://localhost:8000/book)
to get a list of books or `/book/:book_id` to get a particular book details.
You can also try the posting a data to [/book](http://localhost:8000/book) to create a new book entry.
or posting to `/book/:book_id` to update it.

Here's a sample code to define an User Entity.
```javascript
class AuthorEntity extends BaseEntity {
  constructor(container) {
    super(container);

    this.name = 'author';
    this.version = '0.0.1';
    this.schema = {
      name: String,
      books: [{
        type: "ObjectId",
        ref: "book",
      }],
      dateOfBirth: Date,
      dateOfDeath: Date,
      created: Date,
      updated: Date,
    };

    this.controllers = {
        // pass some more values to the default list controller
        // e.g: to populate references or reduce the number of fields
        list: {
          projection: 'name books dateOfBirth',
          population: [{path: 'books', select: 'name'}]
        },
    };
    this.routes = ['create', 'get', 'list',];
    this.eventConsumers = [
      {
        // listen for user updated event
        name: 'update.completed.user.updated',
        consumeMessage: this.onUserUpdated.bind(this),
      },
    ];
    
    // this defines the model defined by the schema and name.
    // It also autodefined the required controller, consumers for creating, updating
    // and listing the given model
    // the routes have to be defined explicitly as we need more control over what gets
    // auto exposed outside.
    this.init();
  }
  onUserUpdated(event) {
    // do something when a user gets updated this is a queue event consumer,
    this.log.info('got', event.name);
    this.log.info('payload = ', event.payload);
    return true;
  }
}
```

Once you finish defining the entity and adding it to the [index.js](https://github.com/nervous-young-inhuman/base-entity-demo/blob/main/src/entities/index.js) file,
make sure to include your entity in the [MainRouter.js](https://github.com/nervous-young-inhuman/base-entity-demo/blob/main/src/MainRouter.js) either passing it directly, or if you want it to have some prefix then passing it as an array pair.  

For e.g: if you wanted all bookEntity routes to be prefixed with `/library` 
```javascript

this.routes = [
    // other route definitions or entities
    // ...
    ['library/', bookEntity]
]
```
then all book routes would be prefixed with `/library` and the route to get list will be available at
http://localhost:8000/library/book

# Footnotes
[^1]: If you have set `LOCAL_PORT` to something else in the .env file then visit that port number.
