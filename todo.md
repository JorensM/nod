# Todo

Develop a communication protocol between devices on local network

# Priority
* client.js > onMessage - move handling of particular messages to a separate function `getMessageHandler(type)`
    * Registering handlers
* client.js > files > move handling of particular commands to a separate function `getCommandHandler(command)`
* NodRequest/NodResponse classes
* SharedFileSystem class

## General
* Group into socket based commands and http based commands
* Bugs
    * nod > devices > get by name returns incorrect response when devices is not found in browser
* unit tests
* Documentation
* Ability to download files
    * Client
        * ~~Send request file message~~
        * ~~getSharedFolderByNetworkPath(path)~~
        * ~~resolveSharedFolderFullPathByNetworkPath(folderPath, path)~~
        * NodeClient - getFile(fullPath)
        * Respond to request file message
    * FileTransferRequest
        * device
        * path
    * FileTransferResponse
        * to
        * file?
        * accepted (whether requested device accepted transfer)

## Server
* Change from `endpoints` constant to a different approach such as a `getEndpoint()` function
that can return the endpoint function, description etc.

## Client

## Browser

* Bugs
    * Connection timeout
    * catch CORS error
* Stdout
    * Multi-line stdout
    * Styling based on response type (red for errors, orange for warnings, green for success, blue for loading)
    * Indents
* ~~`nod help` command~~