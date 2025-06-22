# Proyecto Final ICI4247-1: NotaLoop

Integrantes:
- Javier Caamaño Campos 21.377.764-5
- Fabiana Piña Vera 21.526.472-6

# Sistema de Gestión de Apuntes y Resumenes

##  Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
    1. [Requerimientos Funcionales](#requerimientos-funcionales-por-rol)
    2. [Requerimientos No Funcionales](#requerimientos-no-funcionales)
3. [Arquitectura de la Información](#arquitectura-de-la-información)
4. [Diseño de prototipos](#diseño-de-prototipos)
5. [Definición de navegación y Experiencia de Usuario](#definición-de-navegación-y-experiencia-de-usuario)
6. [Principios de Diseño UX](principios-de-diseño-ux)
7. [Tecnologías](tecnologías)
8. [Estructura de carpetas](estructura-de-carpetas)
9. [Funcionalidades Implementadas](funcionalidades-implementadas)
10. [Instrucciones para correr el proyecto](instrucciones-para-correr-el-proyecto)

## Resumen del Proyecto

NotaLoop es un innovador Banco de Apuntes y Resúmenes diseñado para estudiantes, ofreciendo un espacio colaborativo donde compartir, organizar y acceder fácilmente a material académico. Su objetivo es optimizar el aprendizaje a través de una comunidad activa y funcional.

Principales Funcionalidades:

- Subida y Descarga de Apuntes
- Sistema de Votación y Reseñas
- Búsqueda y Filtrado Avanzado
- Gestión de Categorías y Asignaturas
- Comunicación entre Usuarios
- Favoritos
- Gamificación y Recompensas
- Personalización del Perfil

## Requerimientos

### Roles del Sistema
- **Usuario:** Interactuar con la plataforma, subiendo y descargando apuntes, participando en votaciones y comentarios, realizando búsquedas, y agregando apuntes a favoritos. Además, puede participar en secciones de preguntas y respuestas y recibir recompensas por su actividad.
- **Administrador:** Control total sobre la plataforma. Gestiona a los usuarios, la moderación de contenido, categorías y asignaturas. Además, supervisa las estadísticas de uso y gestiona el sistema de recompensas y gamificación.
- **Profesor/Usuario Avanzado:** Puede responder preguntas, moderar contenidos en su área de experticia, y gestionar su perfil académico. También puede ganar puntos por responder preguntas útiles o realizar aportes valiosos.

## Requerimientos Funcionales por Rol

### Rol-Administrador

- **RF-ADM-01**: El administrador puede gestionar la creación, edición y eliminación de apuntes.
- **RF-ADM-02**: El administrador puede gestionar usuarios (asignar roles, banear usuarios, etc.).
- **RF-ADM-03**: El administrador puede gestionar las categorías y asignaturas de los apuntes.
- **RF-ADM-04**: El administrador puede moderar comentarios y votar apuntes para mantener la calidad.
- **RF-ADM-05**: El administrador puede visualizar estadísticas de uso, como la cantidad de apuntes subidos, votaciones, comentarios y usuarios activos.
- **RF-ADM-06**: El administrador puede gestionar y configurar las recompensas y el sistema de gamificación.
    
### Rol-Usuario

- **RF-NOR-01**: El usuario puede subir apuntes en formato de texto o archivo, asociado a una asignatura y categoría.
- **RF-NOR-02**: El usuario puede descargar apuntes subidos por otros usuarios.
- **RF-NOR-03**: El usuario puede votar y dejar comentarios sobre los apuntes subidos por otros.
- **RF-NOR-04**: El usuario puede realizar búsquedas y filtrados avanzados de apuntes por asignatura, categoría o palabras clave.
- **RF-NOR-05**: El usuario puede agregar apuntes a su lista de favoritos
- **RF-NOR-06**: El usuario puede acceder a una sección de preguntas y respuestas sobre los apuntes y participar en discusiones.
- **RF-NOR-07**: El usuario puede recibir recompensas y puntos por su participación (subida de apuntes, comentarios útiles, etc.).

### Rol-Profesor

- **RF-PA-01**: El profesor o usuario avanzado puede responder preguntas relacionadas con los apuntes.
- **RF-PA-02**: El profesor o usuario avanzado puede ganar puntos por responder preguntas útiles o realizar aportes valiosos.
- **RF-PA-03**: El profesor o usuario avanzado puede moderar el contenido en su área de experticia (asignatura/categoría).
- **RF-PA-04:** El profesor o usuario avanzado puede crear y gestionar su propio perfil académico.


## Requerimientos No Funcionales

- **RNF-01: Tiempo de respuesta**:  El sistema debe procesar operaciones clave (subida, descarga, votación, búsqueda de apuntes) en menos de 5 segundos en el 95% de los casos.  
- **RNF-02: Seguridad**: Solo usuarios autenticados pueden acceder a las funcionalidades principales de la plataforma. Y los roles deben restringir el acceso a funciones según permisos (Administrador, Usuario, Profesor/Usuario Avanzado).  
- **RNF-03: Usabilidad**:  La interfaz debe ser intuitiva y de fácil uso, con un diseño accesible para estudiantes con distintos niveles de experiencia tecnológica.Y debe ser compatible con dispositivos móviles y de escritorio mediante diseño responsive.  
- **RNF-04: Escalabilidad**: El sistema debe ser capaz de soportar un aumento progresivo en la cantidad de usuarios y apuntes sin afectar el rendimiento.  
- **RNF-05: Compatibilidad**: El sistema debe ser accesible desde dispositivos móviles y de escritorio sin pérdida de funcionalidad.
- **RNF-06: Disponibilidad**: La plataforma debe tener una disponibilidad del 99.5% del tiempo, con mantenimiento planificado en horarios de menor uso.  
- **RNF-07: Mantenimiento y Actualización**: La plataforma debe contar con un sistema de actualizaciones periódicas para corregir errores, mejorar el rendimiento y agregar nuevas funcionalidades.

# Arquitectura de la Información
[Ver estructura de navegacion](https://whimsical.com/notaloop-navegacion-SXsUtF8tj9PwRNtDTR7rvS)

# Diseño de prototipos
[Ver estructura de prototipo](https://www.figma.com/design/ZmATT0K094dXNhvZc7XPcE/Proyecto-NotaLoop?node-id=0-1&t=D4mF95ZFz6R11KG4-1)

Mockups realizados:
- Página principal
- Registro
- Inicio de sesión
- Página principal con sesión iniciada
- Subir apunte
- Explorar apuntes
- Descargar, votar apunte
- Ver comentarios
- Perfil del usuario
- Ver favoritos
- Editar perfil

# Definición de navegación y Experiencia de Usuario 

La experiencia de usuario de NotaLoop se enfoca en ser simple, intuitiva y motivadora, pensada para estudiantes que buscan compartir y encontrar apuntes académicos de manera eficiente.

### Navegación

La navegación principal está compuesta por un sistema de rutas implementado en Angular, que permite al usuario moverse fácilmente entre las distintas vistas de la aplicación. Las páginas funcionales son:

- `/registro`: Página de registro para nuevos usuarios.
- `/inicio-sesion`: Página para autenticación de usuarios existentes.
- `/home`: Página principal, muestra contenido relevante y accesos directos.
- `/perfil`: Muestra la información del usuario y su actividad.
- `/modificar-perfil`: Permite editar la información personal.
- `/favoritos`: Sección donde se visualizan los apuntes marcados como favoritos.

Desde el **menú principal**, se puede acceder rápidamente a:
- Subir nuevo apunte (próxima funcionalidad).
- Explorar apuntes (próxima funcionalidad).
- Ver favoritos.
- Acceder y editar el perfil.
- Cerrar sesión.

## Principios de Diseño UX 

### Simplicidad y claridad
- Interfaz limpia, con botones destacados como "Iniciar sesión", "Registrarse" y "Subir apunte"
- Elementos visuales como íconos, ratings y etiquetas ayudan a identificar funciones sin necesidad de texto extenso.
### Flujo natural de navegación
- Desde la página principal, el usuario puede fácilmente registrarse o iniciar sesión
- Luego de inicar sesión, se presentan accesos directos a acciones clave como "Subir apunte" , "Ver favoritos" , "Explorar" o "Perfil"
### Feedback constante
- La gamificación con recompensas y logros refuerza el compromiso del usuario.
### Motivación y participación
- El sistema de recompensas y el diseño basado en la comunidad fomentan la participación activa.
- Al poder añadir a favoritos y contar con puntos los usuarios pueden sentirse parte de una comunidad.
### Adaptabilidad
- El diseño está pensado para funcionar bien en desktop, con una estructura adaptable para una futura versión responsive en dispositivos móviles.


# Tecnologías
- Frontend: Ionic + Angular
- Lenguaje Frontend: TypeScript
- Estilos: CSS (con Ionic Components)
- Control de versiones: Git + GitHub
- Backend: Node.js + Express
- Lenguaje Backend: JavaScript
- Base de Datos: SQLite
- Autenticación: JWT (JSON Web Tokens)

## Estructura de carpetas

Proyecto-Final-ICI4247-1-NotaLoop/

    ├── backend/
    
    │   ├── bin/
    │   ├── controllers/
    │   ├── data/
    │   │   ├── database/
    │   │   └── DockerDesktop/
    │   ├── models/
    │   ├── node_modules/
    │   ├── public/
    │   ├── routes/
    │   ├── views/
    │   ├── .env
    │   ├── .env-example
    │   ├── .gitignore
    │   ├── app.js
    │   ├── docker-compose.yml
    │   ├── Dockerfile
    │   ├── package-lock.json
    │   ├── package.json
    │   └── tu_basededatos.db
    └── frontend/
        ├── .angular/
        ├── .vscode/
        ├── node_modules/
        ├── src/
        ├── .browserslistrc
        ├── .editorconfig
        ├── .eslintrc.json
        ├── .gitignore
        ├── angular.json
        ├── ionic.config.json
        ├── ionic.starter.json
        ├── karma.conf.js
        ├── package-lock.json
        ├── package.json
        ├── tsconfig.app.json
        ├── tsconfig.json
        └── tsconfig.spec.json


## Funcionalidades Implementadas

- Registro de usuarios (local)
- Inicio de sesión
- Visualización y edición del perfil
- Visualización de apuntes favoritos (mock)
- Eliminación de apuntes favoritos
- Contador dinámico de apuntes favoritos
- Títulos y descripciones por imagen


---

### Entrega Parcial 2: Integración Frontend + Backend y Autenticación

Para esta entrega se desarrolló un backend funcional utilizando Node.js con Express, integrando una base de datos relacional en SQLite y conectando el frontend hecho en Ionic + Angular. Además, se incorporó un sistema de autenticación con JWT, permitiendo el registro, inicio de sesión y validación de usuarios.

**EP 2.1: Creación del servidor en Node.js con Express**
Se configuró un servidor Express en el directorio `/backend`, inicializando el proyecto con `npm init` y estructurando los archivos principales como `app.js` y `db.js`. Se implementaron middlewares como `cors` y `express.json()` para permitir el intercambio de datos entre el frontend y el backend.

**EP 2.2: Configuración y modelado de la base de datos relacional**
Se utilizó SQLite como motor de base de datos junto con Knex.js como query builder. Se creó una estructura de tablas relacionales que incluyen `users`, `notes`, `favorites` y `votes`, permitiendo almacenar usuarios, apuntes, favoritos y valoraciones. El esquema fue inicializado automáticamente desde el archivo `db.js`.

**EP 2.3: Desarrollo de API REST con endpoints básicos**
Se construyeron los endpoints principales para el manejo de usuarios y apuntes. Entre ellos destacan rutas como `POST /api/users/register`, `POST /api/users/login` y `GET /api/notes`. Los endpoints están organizados en rutas modulares bajo la carpeta `/routes`.

**EP 2.4: Consumo de la API desde Ionic usando HttpClient**
Desde el frontend en Ionic, se desarrolló un servicio Angular (`api.service.ts`) utilizando `HttpClient` para consumir las rutas del backend. Esto permite registrar nuevos usuarios, iniciar sesión y obtener datos desde la base de datos de forma reactiva. Se configuró `HttpClientModule` en el módulo principal para su uso global.

**EP 2.5: Implementación de autenticación con JWT**
Para el sistema de autenticación, se usó la librería `jsonwebtoken`. Al registrarse o iniciar sesión, se genera un token firmado que se devuelve al frontend. Este token se almacena en el cliente y se utiliza en las peticiones protegidas. Las contraseñas se almacenan cifradas utilizando `bcryptjs`.

**EP 2.6: Validación de usuarios y manejo de sesiones**
Se creó un middleware `authMiddleware` que valida los tokens JWT antes de acceder a rutas protegidas, como por ejemplo la creación de nuevos apuntes. Este middleware verifica la autenticidad del token y extrae los datos del usuario para ser utilizados en las operaciones backend, asegurando que cada acción esté correctamente autenticada.



# Instrucciones para correr el proyecto
Clonar el repositorio:
```bash
git clone https://github.com/<usuario>/<repositorio>.git
```

```bash
cd Proyecto-Final-ICI4247-1-NotaLoop
```

Backend
```bash
cd backend
npm install      
npm start        
```

Frontend
```bash
cd frontend
npm install      
ionic serve      
```

Esto abrirá la aplicación en el navegador (http://localhost:8100/).
