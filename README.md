# Prueba técnica: Gestión y servicios SRL. 
## Tienda Online CRUD + Autenticacin + Dashboard

Este proyecto es una aplicación web full-stack que incluye una tienda online y un panel de administración. Está construido utilizando tecnologías modernas y sigue buenas prácticas de desarrollo.

### Videos de prueba:
- 🔗[POSTMAN](https://drive.google.com/file/d/1NHAr49bY6sAaRshtwVFuk_27k1rPhOA8/view?usp=sharing)

- 🔗[SITIO](https://drive.google.com/file/d/1F3fyswzCGFxW_gVABFsvzC8dKKuaFsVZ/view?usp=sharing)


## 🛠 Herramientas Utilizadas

### Frontend
- **Next.js 14.1.0** - Framework de React para aplicaciones web
- **React 18.2.0** - Biblioteca para construir interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **TailwindCSS** - Framework CSS utilitario
- **Recharts** - Biblioteca para gráficos y visualizaciones
- **ESLint** - Linter para mantener la calidad del código

### Backend
- **Node.js** - Entorno de ejecución para JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **Multer** - Middleware para manejo de archivos
- **Cloudinary** - Servicio de almacenamiento en la nube para imágenes
- **bcryptjs** - Encriptación de contraseñas

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- MongoDB instalado y ejecutándose localmente
- Cuenta en Cloudinary (para almacenamiento de imágenes)

## 🚀 Instalación

### Backend

1. Navega al directorio del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del backend con las siguientes variables:
```env
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

### Frontend

1. Navega al directorio del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Consideraciones Técnicas

### Arquitectura
- Arquitectura cliente-servidor
- API RESTful
- Autenticación basada en JWT
- Manejo de estado del lado del cliente con React
- Estilos con TailwindCSS para un diseño responsive

### Seguridad
- Autenticación y autorización implementadas
- Contraseñas hasheadas con bcryptjs
- Protección de rutas en el frontend y backend
- Validación de datos en ambos lados

### Base de Datos
- MongoDB como base de datos principal
- Mongoose para modelado de datos y validación
- Índices optimizados para búsquedas frecuentes

### Despliegue
- Frontend optimizado para producción con Next.js
- Backend preparado para despliegue en servidores Node.js
- Variables de entorno para configuración segura

## 📝 Scripts 

### Backend
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm start` - Inicia el servidor en modo producción
- `npm test` - Ejecuta las pruebas
- `npm run seed` - Puebla la base de datos con datos de ejemplo

### Frontend
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. 