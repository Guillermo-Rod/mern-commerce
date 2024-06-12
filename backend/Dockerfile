# Usa la imagen base oficial de Node.js Alpine
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación escuchará
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
