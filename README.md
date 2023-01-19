Project structure:
- api = typescript Express app (modular architecture instead of standard MVC, MySQL + MikroORM)
- www = Angular app (material)
- docker-compose-dev.yml = dev docker environment using tsc-watch to restart Express app when we change code and ng serve to restart Angular app
- docker-compose.yml = prod docker environment using caddy to serve apps

Makefile commands:
- dev = builds dev docker
- prod = builds prod docker

App will be running on: http://127.0.0.1:8080