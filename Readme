# Evidencia de Aprendizaje: Autenticación y Autorización con NodeJS y JWT

Este proyecto implementa un backend seguro para un sistema de gestión de inventarios, enfocado en demostrar el ciclo completo de autenticación (quién eres) y autorización (qué puedes hacer) utilizando **JSON Web Tokens (JWT)** y roles de usuario.

---

## 📋 Contexto Académico
El objetivo principal es cumplir con los requerimientos del Caso de Estudio 3, destacando:
1.  **Seguridad en Datos:** Encriptación de contraseñas en base de datos.
2.  **Stateless Auth:** Uso de JWT para evitar sesiones en servidor.
3.  **Role-Based Access Control (RBAC):** Diferenciación estricta entre **Administrador** (lectura/escritura) y **Docente** (solo lectura).

---

## 🚀 Instalación y Puesta en Marcha

1.  **Clonar/Descargar el repositorio**.
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Configurar Variables de Entorno**:
    Cree un archivo `.env` en la raíz con la siguiente estructura (las credenciales de Atlas ya están configuradas para acceso académico):
    ```env
    PORT=4000
    MONGO_URI=
    SECRET_KEY=
    ```
4.  **Ejecutar el servidor**:
    ```bash
    node index.js
    ```

---

## 🧪 Guía de Pruebas 

Para verificar la lógica de negocio, se sugiere seguir este flujo secuencial en **Postman**:

### Fase 1: Gestión de Identidad (Auth)

**1. Registro de Usuarios (POST `/usuario`)**
Cree dos actores para probar los roles:
* **Actor A (Admin):**
    * JSON: `{ "nombre": "Admin", "email": "admin@test.com", "password": "adminpass", "rol": "administrador", "estado": "Activo" }`
    * *Validación:* Verificar en la respuesta (o en MongoDB Atlas) que el campo `password` NO es "adminpass", sino un hash encriptado (`$2a$10$...`).

* **Actor B (Docente):**
    * JSON: `{ "nombre": "Docente", "email": "docente@test.com", "password": "123", "rol": "docente", "estado": "Activo" }`

**2. Inicio de Sesión (POST `/login`)**
* Realice login con el usuario **Admin**.
* *Validación:* Copie el `access_token` generado. Este será su "llave maestra".
* *Nota:* Puede inspeccionar el token en [jwt.io](https://jwt.io) para ver que el `rol` viaja incrustado en el payload.

---

### Fase 2: Configuración del Sistema (Solo Admin)

Para crear un inventario, primero necesitamos los catálogos. Estas rutas están protegidas con `[validarJWT, validarRolAdmin]`.

**Use el Token de Admin** en el Header `Authorization` (Bearer Token) para crear:
1.  **Marca (POST `/marca`):** `{ "nombre": "Dell", "estado": "Activo" }` -> *Copie el ID generado*.
2.  **Tipo (POST `/tipo-equipo`):** `{ "nombre": "Laptop", "estado": "Activo" }` -> *Copie el ID generado*.
3.  **Estado (POST `/estado-equipo`):** `{ "nombre": "Nuevo", "estado": "Activo" }` -> *Copie el ID generado*.

---

### Fase 3: Prueba de Fuego (Autorización de Inventarios)

Aquí validamos la regla de negocio principal: *"El Docente solo visualiza, el Admin crea"*.

#### Escenario A: Creación Exitosa (Admin)
* **Ruta:** POST `/inventario`
* **Auth:** Token de **Admin**.
* **Body:** Use los IDs obtenidos en la Fase 2.
    ```json
    {
        "serial": "SR-1001",
        "modelo": "Latitude",
        "descripcion": "Equipo de prueba",
        "foto": "url.jpg",
        "color": "Negro",
        "fechaCompra": "2023-01-01",
        "precio": 2000000,
        "usuario": "", 
        "marca": "PEGAR_ID_MARCA",
        "estadoEquipo": "PEGAR_ID_ESTADO",
        "tipoEquipo": "PEGAR_ID_TIPO"
    }
    ```
* **Resultado:** `200 OK` (Objeto creado).

#### Escenario B: Bloqueo de Seguridad (Docente)
1.  Realice Login con el usuario **Docente** y copie su nuevo token.
2.  Intente realizar el **mismo POST** anterior usando el Token de Docente.
3.  **Resultado Esperado:** `403 Forbidden` - Mensaje: *"Acceso denegado: No tienes permisos de administrador"*.
    * *Explicación:* El middleware `validarRolAdmin` interceptó la petición correctamente.

#### Escenario C: Visualización Permitida (Docente)
* **Ruta:** GET `/inventario`
* **Auth:** Token de **Docente**.
* **Resultado Esperado:** `200 OK`.
    * *Explicación:* La ruta GET solo tiene el middleware `validarJWT`, permitiendo el acceso de lectura a cualquier usuario autenticado.

---

## 🛠️ Arquitectura de Seguridad

El proyecto utiliza una arquitectura de **Middlewares en cascada** en Express:

1.  **`validarJWT`**:
    * Intercepta el header `Authorization`.
    * Limpia el prefijo `Bearer`.
    * Verifica la firma con `SECRET_KEY`.
    * Decodifica el payload e inyecta el objeto usuario en la `request`.

2.  **`validarRolAdmin`**:
    * Se ejecuta solo después de validar el token.
    * Verifica estrictamente `req.payload.rol === 'administrador'`.
    * Si falla, corta el ciclo de la petición inmediatamente.

---
**Autor:** VICTOR SIERRA