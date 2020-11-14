# CyberCitySim

*A game-type project developed as an academic endevour during our studies on WUST (PL).*

**Table of Contents:**
- [1. Client application program](#1-client-application-program)
- [2. Server application program](#2-server-application-program)
    - [2.1. Auxiliary classes](#21-auxiliary-classes)

---

## 1. Client application program

*Source files in the `client` directory.*

The front-end application is an Angular application built using `@angular/cli`.

---

## 2. Server application program

*Source files in the `server` directory.*

The back-end application is an Express.js (with TypeScript) application.

---

### 2.1. Auxiliary classes

The application is using a few wrapper classes (located in `server/src/auxiliary`) that ensure type safety across the whole program.

Instead of using the standard `Express.Router` class for setting up routes we use here `RouterWrapper` that is the type-safe medium between our program and the Express Router API.

---
