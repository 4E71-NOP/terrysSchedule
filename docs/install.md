
heroku logs -a terrysschedule

```sh
heroku buildpacks:add heroku/nodejs -a terrysschedule
```

```sh
heroku buildpacks:set https://github.com/hone/heroku-buildpack-static
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
