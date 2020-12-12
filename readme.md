# CyberCitySim

*A game-type project developed as an academic endeavour during our studies on WUST (PL).*

**Table of Contents:**
- [1. Model](#1-model)
- [2. Client application program](#2-client-application-program)
- [3. Server application program](#3-server-application-program)
    - [3.1. Auxiliary classes](#31-auxiliary-classes)
    - [3.2. Error Handling](#32-error-handling)

---

## 1. Model

All model classes and interfaces are defined in the `model` directory.\
For example all errors that can occur are defined as an `enum` in [`model/errors.ts`](model/errors.ts).

---

## 2. Client application program

*The source files are in the `client` directory.*

The front-end application is an Angular application built using `@angular/cli`.

Before running the program, you need to have the Angular CLI program installed globally in your system (use `npm install -g @angular/cli`). For some reason Angular CLI installed locally can’t be run.

To run the program in development mode use
```bash
npm run dev
```
whilst being in the `client` directory.

---

## 3. Server application program

*The source files are in the `server` directory.*

The back-end application is an Express.js (with TypeScript) application.

To run the program in development mode use
```bash
npm run dev
```
whilst being in the `server` directory.

---

### 3.1. Auxiliary classes

The application is using a few wrapper classes (located in `server/src/auxiliary`) that ensure type safety across the whole program.

Instead of using the standard `Express.Router` class for setting up routes here we use `RouterWrapper` that is the type-safe medium between our program and the Express Router API.

---

### 3.2. Error Handling

The program uses `Promise`-based errors which means when an `Error` is thrown `Express` will `catch` it. The error handler is defined in [`server/src/index.ts`](server/src/index.ts) while all error types are defined in [`model/errors.ts`](model/errors.ts) as told in [«Model»](#1-model).

---
