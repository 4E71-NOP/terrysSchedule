

# Heroku

## Fichiers et dépendances

Créer **server.js** à la racine
```sh
const express = require('express');
const app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

Créer **static.json**
```sh
{
    "root": "dist",
    "clean_urls": true,
    "routes": {
      "/**": "index.html"
    }
  }
```

**Heroku** a besoin d'une information pour installer sur son archi les bons élements.
Dans **package.json**:
```javaScript
"dependencies": {
  [...]
      "express": "^4.17.1",
  [...]
 },
```

```javaScript
"scripts": {
    [...]
    "postinstall": "npm run build",
    "start": "node server.js"
  },
```
___

## Divers

heroku logs -a terrysschedule

```sh
heroku buildpacks:add heroku/nodejs -a terrysschedule
Buildpack added. Next release on terrysschedule will use:
  1. https://github.com/hone/heroku-buildpack-static
  2. https://github.com/heroku/heroku-buildpack-static
  3. heroku/nodejs
Run git push heroku main to create a new release using these buildpacks.
```

```sh
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static -a terrysschedule
```



```sh
$ heroku static:init
? Enter the directory of your app: (public_html) public
? Drop `.html` extensions from urls? No
? Path to custom error page from root directory: 
{
  "root": "public",
  "clean_urls": false
}
```

```sh
npm install
```

___

https://stackoverflow.com/questions/59657252/trying-to-host-a-vuejs-app-on-heroku-getting-npm-err-missing-script-start-i

