---

layout: default

title: Demonstration

---

## Table of Contents
- [Basic Information](./)
- [Routing](./routing)
- [Uploading](./uploading)
- [Privacy](./privacy)
- [Gallery](./gallery)
- [Cleaning](./cleaning)
- [Demonstration](./demo)
- [Other Projects](https://schwarzer-vulpecula.github.io)

# Demonstration

Initially, I wanted to deploy **image-gallery-express** on a cloud hosting service, but after finding out that most file systems there are ephemeral (Meaning uploads are not guaranteed to persist), which effectively requires me to use something like Amazon S3, I decided to drop the idea. Using Amazon S3 defeats the point of having an image gallery in the first place. Unfortunately, this means only GIF images can show you how the application works, outside of setting up the repository. I recommend setting up the repository on your local machine if you are interested in trying it out for yourself.

Uploading a public image...

![Uploading Public Image](./uploading-public.gif)

Uploading a private image...

![Uploading Private Image](./uploading-private.gif)
