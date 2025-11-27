# Todo

Develop a communication protocol between devices on local network

## General

* Bugs
    * nod > devices > get by name returns incorrect response when devices is not found in browser
* unit tests
* Documentation
* Ability to download files

## Server
* Change from `endpoints` constant to a different approach such as a `getEndpoint()` function
that can return the endpoint function, description etc.

## Browser

* Bugs
    * Connection timeout
    * catch CORS error
* Stdout
    * Multi-line stdout
    * Styling based on response type (red for errors, orange for warnings, green for success, blue for loading)
    * Indents
* ~~`nod help` command~~