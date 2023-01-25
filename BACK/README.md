# ADA-KANBAN-API

this is a `monorepo` project divided between `libs` and `app` modules inside the `package` folder.

1) the `libs` are small auxiliary or useful projects, 
2) the `app` is the main project of this monorepo.

## app

base url http://localhost:5000

### CARD

```json
  # card object
  {
    "id":"any_uuid",
    "titulo": "any_title",
    "conteudo": "any_content",
    "lista": "TODO" // TODO - DOING - DONE
  }
```

VERB   | ROUTE                 | BODY          | AUTH ROUTE | DESCRIBE                         |
---    | ---                   | ---           | ---        | ---                              |
POST   | /login                |               |    NO      | make login                       | 
GET    | /cards                |               |   YES      | list of all cards                |
POST   | /cards                | card object   |   YES      | create new card                  |
PUT    | /cards/:id            | card object   |   YES      | update card                      |
DELETE | /cards/:id            |               |   YES      | delete card                      |

## setup

follow this step by step the first time you run the project:

`make install` to install all dependencies

`duplicate .env.sample file with .env name`

`make migrate` to migrate all tables to database

`make build_all` to build all libs and app module

`make down` to take down all running containers

`make up` to turn up database and app container

## tests

run ``make test_ci` command to see test coverage

## Other Makefile commands

`make up` raise and run docker containers

`make down` drop the containers

`make install` install all dependencies in every packages/project

`make clear_install` remove all node_modules folder

`make lint` run lint command in app project

`make build` run build command in app project

`make build-libs` run build command in libs projects

`make clear_build` remove all dist folder

`make test` run a tests of app project

`make test_w` run a tests of app project with watch mode

`make test_ci` run a tests of app project with coverage mode

`make clear_coverage` remove coverage folder of app project

## Technologies

All project configuration was done by the auxiliary projects inside the `libs` module
so the default configuration of `lint`, `jest` and `typescript` can be found there.
Within this module you can also find auxiliary projects like `entity-builder` which helps 
to create random objects for testing and `commands-lib` which can be used to extend the `commands` files of the `app` project.

The project as a whole uses the `monorepo` architecture but the main project uses the `hexagonal` architecture
having its modules distributed in the main folder and each module contained a structure very similar to each other.

The project also has unit tests that can be found in the `tests` folder, repeating the same structure as in the `src` folder.
