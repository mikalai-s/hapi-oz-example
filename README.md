The repo shows example [Oz workflow](https://github.com/hueniverse/oz#workflow) of getting access to a private resource.

# Run

Clone, `npm install` and `node app`.

# Usage

Navigate to http://localhost:3000/client and follow UI in there. Use `mikalai`/`2` username/password pair to login. The final page should say  `mikalai you got protected resource!` indicating that everything worked out.

# Legs

**The terminology below is taken from http://hueniverse.com/oauth/guide/terminology/**

The example shows 3-Legged flow as per [instruction](https://github.com/hueniverse/oz#workflow). Here are the legs:

1. Client is the app that wants to access a protected resource on behalf of its owner. `/client` endpoint represents the client.

2. Server is the app that hosts both a protected resource and owners info. The following endpoints represent the server:

 - `/login` - to log resource owner in
 - `/auth` - to grant access to client app
 - `/protected` - protected resource
 - `/oz/app`, `/oz/reissue` and `/oz/rsvp` - Oz specific endpoints registered automatically by https://github.com/hapijs/scarecrow

3. Resource owner is `mikalai`.

# Considerations

1. Due to simplicity the client is stateless in this example. In real world project user ticket is stored somewhere in the client to be used to request protected resources.
