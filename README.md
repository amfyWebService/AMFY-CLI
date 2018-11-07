# ANFY-CLI a cli for the AMFY Framework

This CLI provide a lot of command for the Framework AMFY that allow you to init the project

## Getting Started 

```
npm install --global amfy
```

### Prerequisites

You need Nodejs installed in your computer

[Nodejs](https://nodejs.org/en/download/)


### Start a project :rocket:

To init a blanck project follow these steps

You need to launch the following command
```
amfy init 
```
The command will generate the following architecture 

```
my-app
├── README.md
├── node_modules
├── package.json
├── index.ts
├── tsconfig.ts
├── .gitignore
├── config
│   ├── default.js
│   ├── development.js
│   └── production.js
└── src
    ├── controllers
    │   └── defaultControllers.ts
    ├── core
    │   ├── App.ts
    │   └── Routes.ts
    └── routes.json
```

## AMFY Commands :clipboard:
| Command | Description |
|---|---|
| amfy init | Create a blanck nodejs project in TypeScript |
| amfy orm add entityName | Generate an entity |


## Authors :space_invader:

* **The Homies** - [AMFY-Team](https://github.com/orgs/amfyWebService/teams/amfy)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
