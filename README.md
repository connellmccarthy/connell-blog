# connell-blog
My Hugo based blog / personal website

### Development
```hugo server``` navigate to http://localhost:1313/

### Deploy
To compile everything into static HTML run:
```hugo build```

Commit changes
```git add public && commit -m "commit message"```

Then to deploy to Github Pages, run
``git subtree push --prefix public origin gh-pages```
