# RESTful API Tutorial

This repository contains the necessary files for building your own RESTful API. You can find a blog on this [here](https://kpriyanshu.hashnode.dev/elevating-api-efficiency-how-grafbase-facilitates-rest-to-graphql-migration)

## Endpoints

| HTTP Request | Endpoint name   | Description                                                  |
| ------------ | --------------- | ------------------------------------------------------------ |
| `GET`        | `/users`        | Get names of all users present in the database               |
| `GET`        | `/users/:email` | Get specific user for that email                             |
| `POST`       | `/users`        | Add a new user to the database                               |
| `PUT`        | `/users/:email` | Update details of an already existing user using their email |
| `DELETE`     | `/users/:email` | Delete details of a user using their email                   |

NOTE: Kindly use this for educational purposes, because adding many new users will exhaust my MongoDB storage.
