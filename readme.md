# NoD

NoD, short for Network of Devices, is a protocol and technology designed to make data exchange and interaction between devices on a local network intuitive.

2 Parts: client and server.

A network requires a single server and one or multiple clients.

A server can also act as a client

Any device that has hosting capabilities can act as a server

Basic requests:
    * list devices
    * view device

The base interaction capabilities are packaged as a library, which can
be extended to support additional features and interfaces.

# Protocol/interface structure

## Language agnostic

### Client interface

A client device requires ability to send/receive TCP/HTTP requests and act as a socket for
receiving and emitting messages

### Server interface

Server device requires ability to host a TCP and/or a HTTP server, manage socket connections and send/receive requests on the local network.

## Language specific

### Client

#### Base client

#### Concrete client

### Server

#### Base server

#### Concrete server

# Todo

Consider introducing a token that you can get by using the network