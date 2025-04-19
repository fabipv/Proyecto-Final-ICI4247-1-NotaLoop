# Proyecto Final ICI4247-1: NotaLoop

Integrantes:
- Javier Caamaño Campos
- Fabiana Piña Vera

# Sistema de Gestión de Apuntes y Resumenes

##  Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
    1. [Requerimientos Funcionales](#requerimientos-funcionales-por-rol)
    2. [Requerimientos No Funcionales](#requerimientos-no-funcionales)       
3. [Arquitectura de la Información](#arquitectura-de-la-información)
4. [Diseño de prototipos](#prototipo-de-diseño)
5. [Librerías en Angular](#liberías-usadas-con-angular)

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






