---

layout: default

title: Basic Information

---

An image gallery where people can upload images anonymously. Written in JavaScript using Express.js and Node.js. 

Several key features include:

* Gallery pages for ease of viewing
* Private uploading
* Image format checking
* Descriptions for images being uploaded

Several things that should be noted:

* No spam protection for the gallery
* Intitially, I wanted to use reCAPTCHA, however, upon finding out that it will make setting up this repository harder for other people because of the secret key and the need to sign up for it, I was against this idea.
* The database is called `image-gallery-express`

Version Information:

* Node: `12.22.1`
* npm: `7.19.0`
* MongoDB: `2.6.10`
* The remaining dependencies are handled by npm, so you do not need to worry about that.

How to run:
* Go into the directory
* Run `npm install` in the terminal
* Run `npm start`

Helpful scripts:
* `npm run clean` will remove all images uploaded and all information in the database. This will reset the application to a brand new state.
* `npm run devstart` and `npm run debugstart` will start the server using nodemon, allowing you to see changes to the code while the server is still running. This is useful for development. However, nodemon is not installed by default, and you must install it either globally using `npm install -g nodemon` or locally using `npm install nodemon`.
