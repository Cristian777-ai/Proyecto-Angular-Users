# Angular Users Admin Panel

Este proyecto es una SPA de administración de usuarios construida con Angular (standalone components) y Angular Material en el frontend, y un servidor Express en Node.js que sirve la API y el build de Angular.  

## Tecnologías

- **Angular 15+** (Standalone Components, `bootstrapApplication`)  
- **Angular Material** (toolbar, sidenav, table, paginator, cards, snackbars, icons, spinner)  
- **RxJS** para manejo de streams y formularios reactivos  
- **Express.js** como servidor estático y API REST mock (`db.json`)  
- **Node.js** v18+  
- **Heroku** para despliegue full-stack  

## Características

- **Login** con formulario reactivo y validación  
- **Persistencia** de token en `localStorage` y guard de autenticación (`AuthGuard`)  
- **Listado de usuarios** con tabla paginada y placeholder de carga  
- **Detalle de usuario** en ruta dinámica (`/users/:id`)  
- **Layout profesional** con sidenav, toolbar, progress bar global y footer  
- **API mock** en `db.json` para login, list y detalle de usuarios  
- **Despliegue en Heroku** sirviendo frontend y backend en un solo dyno  

## Estructura de carpetas

```
/
├─ server.js            # Servidor Express (API + static)
├─ db.json              # Mock de datos de usuarios
└─ ui-app/              # Cliente Angular
   ├─ src/
   │  ├─ main.ts        # Arranque con provideRouter y providers
   │  ├─ index.html     # entrypoint con <base href="/">
   │  └─ app/
   │     ├─ app.component.ts        # Layout con sidenav, toolbar y outlet
   │     ├─ app.routes.ts           # Definición de rutas y guards
   │     ├─ auth/
   │     │  └─ login.component.ts   # Formulario de login standalone
   │     ├─ users/
   │     │  ├─ user-list.component.ts   # Tabla paginada de usuarios
   │     │  └─ user-detail.component.ts # Vista detalle de usuario
   │     └─ services/
   │        ├─ auth.service.ts      # Login/logout, token, estado auth
   │        └─ auth.guard.ts        # Guard de rutas protegidas
   └─ angular.json       # Configuración build / outputPath: dist/ui-app
```

## Instalación local

1. Clonar repositorio  
   ```bash
   git clone https://github.com/Cristian777-ai/Proyecto-Angular-Users.git
   cd Proyecto-Angular-Users
   ```

2. Instalar dependencias  
   ```bash
   npm install           # raíz instala Express
   cd ui-app
   npm install           # cliente Angular
   cd ..
   ```

3. Construir cliente  
   ```bash
   cd ui-app
   npm run build --configuration production
   cd ..
   ```

4. Levantar servidor  
   ```bash
   node server.js
   ```
   - API en `http://localhost:8080/auth/login`, `GET /users`, `GET /users/:id`  
   - Frontend servido en `http://localhost:8080/`  

## Despliegue en Heroku

1. Crear app y asignar remoto  
   ```bash
   heroku create angularusers
   ```

2. Variables de entorno (si las hubiera)  
   ```bash
   heroku config:set NODE_ENV=production
   ```

3. Push al remoto principal  
   ```bash
   git push heroku main
   ```

4. Abrir la app  
   ```bash
   heroku open
   ```  

## Notas de desarrollo

- El **server.js** carga primero `db.json`, monta los endpoints API y luego sirve el build de Angular.  
- En **main.ts** se usan `provideRouter(routes)`, `provideHttpClient()` y `provideAnimations()`.  
- En **AppComponent** se incorporó `MatSidenavModule` y `MatListModule` para un layout con menú lateral responsive.  
- Las rutas protegidas usan un **AuthGuard** que se suscribe al `BehaviorSubject` de `AuthService`.  
- Se mantiene un **ProgressBar** global que garantiza un mínimo de 600 ms de animación en cada navegación.  

---

© 2025 Cristian777-ai. Proyecto licenciado bajo MIT.
