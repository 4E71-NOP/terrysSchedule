
heroku logs -a terrysschedule

```sh
heroku buildpacks:add heroku/nodejs -a terrysschedule
$ heroku buildpacks:add heroku/nodejs -a terrysschedule
Buildpack added. Next release on terrysschedule will use:
  1. https://github.com/hone/heroku-buildpack-static
  2. https://github.com/heroku/heroku-buildpack-static
  3. heroku/nodejs
Run git push heroku main to create a new release using these buildpacks.
```

```sh
heroku buildpacks:set https://github.com/hone/heroku-buildpack-static


$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static -a terrysschedule
 ›   Error: The buildpack https://github.com/heroku/heroku-buildpack-static is already set on your app.



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
