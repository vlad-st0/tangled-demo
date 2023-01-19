dev:
	- sudo docker-compose -f ./docker-compose.dev.yml up --build

prod: 
	- sudo docker-compose up --build