# app2-frontend-trends

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Docker environment

```
docker build -t app-adidas-frontend .
docker run -t -dp 8092:8081 --network net-adidas app-adidas-frontend
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
