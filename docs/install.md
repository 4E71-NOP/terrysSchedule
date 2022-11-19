

# Heroku

## Fichiers et dépendances

Créer **server.js** à la racine
```javascript
const express = require('express');
const app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Terry's Schedule app is running on port ${ PORT }`);
});
```

Créer **static.json**
```javascript
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
```javascript
"dependencies": {
  [...]
      "express": "^4.17.1",
  [...]
 },
```

```javascript
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

---

# Linux

## Lancement local

S'assurer de l'installation globale de vue cli
```sh
$> npm install @vue/cli -g
```

Lancement de vue UI
```sh
$> view ui
```



Lancement de l'application seule
```sh
$> npm run serve
```

Si on a une erreur ```ERR_OSSL_EVP_UNSUPPORTED``` on doit exporter une variable comme suit:
```sh
$> export NODE_OPTIONS=--openssl-legacy-provider
```





