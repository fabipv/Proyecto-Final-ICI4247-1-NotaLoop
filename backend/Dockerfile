FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Instala TODAS las dependencias (incluidas las de desarrollo como nodemon)
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación Express escuchará
EXPOSE 8100

# El comando por defecto cuando el contenedor se inicie, si no se especifica otro
# Para desarrollo, usaremos el script 'dev' de package.json
CMD ["npm", "start"]