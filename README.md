# Link Shortener

Simple link shortener app built using python and the bottle framework.

One of the very first apps I made to learn python.

Now dockerized and running [here](link.paudel.me).



## How it works

The app only has one route, the home route, with two allowable methods, GET and POST.

### GET

The get method does two things:

#### Input `/`

If a get request is sent to the root url, the home page, which contains a form is loaded.

#### Redirect `/<code>`

If a known short code is appended to the root path, the browser is redirected to the saved link

> The redirect is permanent (301), so one visit effectively caches the link to the users browser, preventing load on the serve 

### POST `/`

The post method takes in json input of the format:

```json
{
    "url":"someurlhere"
}
```

If the url was previously shortened, then it returns that code, otherwise a new code is created. The code is returned as a plaintext string.
