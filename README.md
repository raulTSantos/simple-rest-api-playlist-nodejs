

# API REST CON NODEJS Y PRISMA

### COMANDOS USADOS
1. iniciar proyecto `npm init -y`
2. instalar typescript de forma local(desarrollo)  `npm i typescript -D`
3. permitir ejecutar typescript en nodejs `npm i ts-node -D`
4. `npm i tslib @types/node -D`
5. instalar express `npm i express`
6. `npm i --save-dev @types/express`
7. generar tsconfig.json `npx tsc --init`
8. instalar prisma `npm i prisma -D`
9. iniciar prisma `npx prisma init`
10. instalar dotenv `npm i dotenv `
11. `npm install @prisma/client`
12. `npm i nodemon -D`
13. `npx prisma migrate dev --name ADD_TABLE_SONG_USER `
14. `npm i --save-dev @types/bcrypt`
14. `npm i --save-dev @types/jsonwebtoken`


### PARA USAR EL PROYECTO
* `git clone git@github.com:raulTSantos/simple-rest-api-playlist-nodejs.git`
* `cd simple-rest-api-playlist-nodejs`
* `npm install`

### PARA EJECUTAR(modo dev)
* `npm run dev`


> DATOS
> * "npx" permite ejecutar comandos instalados a nivel de proyecto
> * traspilar archivos .ts a .js `npx tsc archivo.ts `
> * Opcional: instalar globalmente tsc `npm i tsc -g` o  `sudo npm i tsc -g`(linux)