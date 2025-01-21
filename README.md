# Fiero Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

## Descripción

**Fiero Backend** es una API RESTful desarrollada con **NestJS** y **PostgreSQL**. Este sistema está diseñado para gestionar cotizaciones y notas de venta de manera eficiente, ofreciendo funcionalidades como administración de usuarios, clientes, productos y reportes.

---

## Características principales

- **Gestión de usuarios**:
    - Roles: Administrador, Gerente, Vendedor.
    - Autenticación y autorización mediante JWT.
- **Administración de clientes**:
    - Registro y seguimiento de clientes.
- **Gestión de productos**:
    - Crear, leer, actualizar y eliminar productos.
- **Cotizaciones y notas de venta**:
    - Generación y gestión de cotizaciones y su detalle.
    - Conversión de cotizaciones en notas de venta.
- **Reportes detallados**:
    - Subtotales, descuentos y totales por operación.
- **Seguridad y escalabilidad**:
    - Validación robusta de datos.
    - Integración modular y estructura escalable.

---

## Tecnologías utilizadas

- **Framework**: [NestJS](https://nestjs.com)
- **Base de datos**: PostgreSQL
- **Autenticación**: JSON Web Tokens (JWT)
- **ORM**: TypeORM
- **Lenguaje**: TypeScript

---

## Instalación y configuración

### Requisitos previos
- Node.js >= 16.x
- PostgreSQL >= 13.x
- npm >= 7.x

### Pasos para instalar
1. Clona este repositorio:
   ```bash
   git clone https://github.com/jafoyelich/fiero-backend.git
   cd fiero-backend
## Instala las dependencias

```bash
$ npm install
```

## Compilar y ejecutar la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```