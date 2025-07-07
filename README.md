# 🎓 Sistema de Gestión de Estudiantes

Una aplicación web fullstack moderna para capturar y gestionar información de estudiantes, desarrollada con React (frontend), Spring Boot (backend) y MongoDB en la nube.

> **📌 Repositorio:** https://github.com/marzo245/mongo_en_la_nube.git

## ✨ Características

- **Registro de Estudiantes**: Formulario intuitivo para capturar nombre, correo, fecha de nacimiento y programa académico
- **Visualización de Datos**: Tabla responsiva que muestra todos los estudiantes registrados con información adicional como edad calculada
- **Validaciones**: Validación tanto en frontend como backend para garantizar integridad de datos
- **API REST**: Endpoints completos para CRUD de estudiantes
- **Base de Datos en la Nube**: MongoDB Atlas para persistencia de datos
- **Interfaz Moderna**: Diseño responsivo con gradientes y efectos visuales atractivos

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data MongoDB**
- **Spring Web**
- **Bean Validation**
- **Maven**

### Frontend
- **React 18**
- **TypeScript**
- **Axios**
- **CSS3 con gradientes**

### Base de Datos
- **MongoDB Atlas** (en la nube)

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 17 o superior
- Node.js 16 o superior
- Maven 3.6 o superior
- Cuenta en MongoDB Atlas
- Git

### 0. Clonar el Repositorio

```bash
git clone https://github.com/marzo245/mongo_en_la_nube.git
cd mongo_en_la_nube
```

### 1. Configuración de MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://cloud.mongodb.com/)
2. Crea un nuevo cluster
3. Configura el acceso de red (IP whitelist)
4. Crea un usuario de base de datos
5. Obtén la cadena de conexión

### 2. Configuración del Backend

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```

2. Configura la conexión a MongoDB en `src/main/resources/application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://diego:<db_password>@universidad.lavtxfi.mongodb.net/universidad?retryWrites=true&w=majority
   spring.data.mongodb.database=universidad
   ```
   
   **⚠️ Importante:** Reemplaza `<db_password>` con tu contraseña real de MongoDB Atlas.

3. Compila y ejecuta la aplicación:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

El backend estará disponible en `http://localhost:8080`

### 3. Configuración del Frontend

1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación de desarrollo:
   ```bash
   npm start
   ```

El frontend estará disponible en `http://localhost:3000`

## 📋 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estudiantes` | Obtener todos los estudiantes |
| GET | `/api/estudiantes/{id}` | Obtener estudiante por ID |
| POST | `/api/estudiantes` | Crear nuevo estudiante |
| PUT | `/api/estudiantes/{id}` | Actualizar estudiante |
| DELETE | `/api/estudiantes/{id}` | Eliminar estudiante |
| GET | `/api/estudiantes/correo/{correo}` | Buscar por correo |

## 📊 Estructura del Proyecto

```
mongo_en_la_nube/
├── backend/
│   ├── src/main/java/com/estudiantes/
│   │   ├── BackendEstudiantesApplication.java
│   │   ├── controller/
│   │   │   └── EstudianteController.java
│   │   ├── model/
│   │   │   └── Estudiante.java
│   │   ├── repository/
│   │   │   └── EstudianteRepository.java
│   │   └── service/
│   │       └── EstudianteService.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormularioEstudiante.tsx
│   │   │   └── TablaEstudiantes.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── index.tsx
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 💡 Funcionalidades Principales

### Registro de Estudiantes
- Formulario con validación en tiempo real
- Campos obligatorios: nombre, correo, fecha de nacimiento, programa
- Validación de formato de correo electrónico
- Prevención de correos duplicados

### Gestión de Datos
- Lista completa de estudiantes registrados
- Cálculo automático de edad
- Formato de fechas localizado
- Funcionalidad de eliminación con confirmación

### Interfaz de Usuario
- Diseño responsivo para móviles y escritorio
- Efectos visuales modernos con gradientes
- Feedback visual para acciones del usuario
- Manejo elegante de estados de carga y errores

## 🔧 Desarrollo

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y commit (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📝 Notas Importantes

- Asegúrate de tener configurada la cadena de conexión a MongoDB antes de ejecutar el backend
- El frontend debe ejecutarse en el puerto 3000 para que funcione el CORS configurado
- Los datos se validan tanto en el frontend como en el backend para mayor seguridad
- El correo electrónico debe ser único para cada estudiante

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que la cadena de conexión sea correcta
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas
- Confirma que el usuario de base de datos tenga los permisos necesarios

### Error de CORS
- Verifica que el frontend esté ejecutándose en `http://localhost:3000`
- Asegúrate de que el backend tenga configurado el CORS correctamente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para la gestión eficiente de estudiantes.
