## File Transfer Peer To Peer

Welcome to the File Transfer Peer to Peer project!  It is currently a prototype, or in pre-alpha (as we like to say).

##Requirements/Installation 

This project is written purely in javascript, so you'll need to install [npm](https://www.npmjs.com/), [node.js](https://nodejs.org/en/), and a few other specific packages to get started.  

You can install both with:

`curl -L http://git.io/n-install | bash -s -- -y latest`

Then all you'll need to do is run:

`npm install` from the root directory of this repository!

This will install all the packages in package.json (also found at the root directory).  

If you want feel free to use [our laptop script](https://github.com/18F/laptop) which comes with [npm](https://www.npmjs.com/) and [node.js](https://nodejs.org/en/).

##Description

This project is built on top of [WebRTC](https://webrtc.org/) and was inspired by [this example repo](https://github.com/webrtc/samples/tree/gh-pages/src/content/datachannel/filetransfer) and [the webrtc instructions](https://codelabs.developers.google.com/codelabs/webrtc-web/#0).  The goal of the project is to provide government agencies the ability to transfer files in a secure way, without having to leave ".gov" space.  A few examples use-cases for the project:

1. As an alternative to sending files with personally identifiable information over email (because email is prone to getting hacked)
2. As an alternative to using non ".gov" spaces for storing files, such as dropbox, googledocs, et al.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.