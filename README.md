## File Transfer Peer To Peer

Welcome to the File Transfer Peer to Peer project!  It is currently a prototype, or in pre-alpha (as we like to say).

##Requirements/Installation 

This project is written purely in javascript, so you'll need to install [npm](https://www.npmjs.com/), [node.js](https://nodejs.org/en/), and a few other specific packages to get started.  

You can install both with:

`curl -L http://git.io/n-install | bash -s -- -y latest`

Then all you'll need to do is run:

`npm install` from the root directory of this repository!

This will install all the packages in package.json (also found at the root directory).

You'll also need the peerjs server, unless you want to get keys from [peerjs.com](http://peerjs.com/).  To do that simply do:

`npm install -g peer`

If you want feel free to use [our laptop script](https://github.com/18F/laptop) which comes with [npm](https://www.npmjs.com/) and [node.js](https://nodejs.org/en/).

##Description

This project is built on top of [peerjs](http://peerjs.com/) and was inspired by [this example repo](http://cdn.peerjs.com/demo/chat.html).  The goal of the project is to provide government agencies the ability to transfer files in a secure way, without having to leave ".gov" space.  A few examples use-cases for the project:

1. As an alternative to sending files with personally identifiable information over email (because email is prone to getting hacked)
2. As an alternative to using non ".gov" spaces for storing files, such as dropbox, googledocs, et al.


##References

There are a lot of almost fit examples for this tool in the open source space, but most of them are toy examples and don't do everything share.gov needs to do.  Here are a bunch more similar or related projects, if you're interested in building your own webrtc tool or extending ours:

1. [webrtc.org](https://webrtc.org/) - this is the canonical technology.  It's syntax is somewhat verbose and requires a lot of protocol negotiating but it's also the most flexible of the technologies.  The documentation is also minimal but strong giving a good introduction into what webrtc is good for.

2. [peerjs](http://peerjs.com) - this is a very often used wrapper ontop of webrtc.  It handles a lot of the negotiation at the protocol level meaning you can focus on functionality.

3. [simplewebrtc](https://simplewebrtc.com/) - another wrapper with a very strong set of examples, so you can think through your own applications.  

4. [mozilla developer guide on webrtc](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) - as is typical mozilla's developer guide on webrtc is second to none.  This covers everything you need to start working with the api, giving simple straight forward examples.

5. [yet another strong guide, this time by Ilya Grigorik](https://hpbn.co/webrtc/)

6. [PeerJS data channel example](https://www.laike9m.com/blog/a-tutorial-on-using-peerjs-in-node-webkit-app,57/)

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.