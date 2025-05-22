# Proyecto Angular Users

Una aplicación web de gestión de usuarios construida con **Angular v16** y **Angular Material**, que incluye:

* Autenticación con validaciones y notificaciones.
* Listado paginado de usuarios con spinner y manejo de errores.
* Detalle de usuario con indicador de carga, manejo de fallos y navegación.
* Tests unitarios completos con Jasmine/Karma.
* Arquitectura standalone en Angular y uso de RxJS.

## Características

* **Login**
  * Formulario de login con campos obligatorios y validación inmediata.
  * Manejo de errores 401 (“Credenciales inválidas”) y 500 (“Error en el servidor”).
  * Notificaciones mediante MatSnackBar.

* **User List**
  * Tabla basada en MatTable + MatPaginator.
  * Spinner de carga (MatSpinner) mientras se obtienen datos.
  * Mensaje de error si falla la carga.

* **User Detail**
  * Spinner de carga durante la petición de detalle.
  * Mensaje de error si la llamada falla.
  * Botón "Volver" para regresar a la lista.

* **Arquitectura standalone** en Angular v16.
* **Tests unitarios** completos con Jasmine/Karma.
* **Diseño responsivo** usando Angular Material.

## Requisitos

* Node.js LTS (v18.x o v20.x recomendado)
* npm v8 o superior
* Angular CLI v15 o superior
* json-server para mock API

## Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Cristian777-ai/Proyecto-Angular-Users.git
cd Proyecto-Angular-Users/ui-app

# 2. Instalar dependencias
npm install
```

## Mock API con json-server

La aplicación consume el endpoint `http://localhost:3000/users`. Para simularlo:

```bash
# Crear archivo db.json en la raíz (fuera de ui-app/)
cat > db.json <<EOF
{
  "users": [
    { "id": 1, "name": "Alice",   "email": "a@x.com" },
    { "id": 2, "name": "Bob",     "email": "b@x.com" },
    { "id": 3, "name": "Charlie", "email": "c@x.com" }
  ]
}
EOF

# Iniciar servidor mock
npx json-server --watch db.json --port 3000
```

## Uso

```bash
cd ui-app
ng serve --open
```

* **Login**: http://localhost:4200/login
* **Lista de usuarios**: http://localhost:4200/users
* **Detalle de usuario**: http://localhost:4200/users/:id

## Tests

```bash
cd ui-app
ng test
```

## Despliegue (opcional)

```bash
cd ui-app
ng build --prod
```

La carpeta `dist/ui-app` contiene los assets para hospedar en Netlify, Vercel, GitHub Pages, etc.

## Documentación

Cada componente y servicio incluye comentarios explicativos de la lógica clave. Revisa `ui-app/src/app/` para más detalles.
