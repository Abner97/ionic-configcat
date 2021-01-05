# Aplicación de lista de tareas con ConfigCat y CloudBees

**Instalación del proyecto**

    $ npm install
    $ ionic serve

## Configcat

Instalar configcat en el proyecto (SDK para JS):

```shell
$ npm i configcat-js
```

    import  *  as configcat from  "configcat-js";

- Crear una cuenta en [Configcat](https://www.configcat.com).
- Crear las flags que desee utilizar en la app. (leer el documento de Jira para conocer más).
- Para modificar el servicio de configcat debe editar el archivo **_configcat.service.ts_** que se encuentra en la ruta : /src/app/services/
  - Lo primero es cambiar el SDK Key por el de tu proyecto Configcat:

```js
this.configCatClient = configcat.createClientWithAutoPoll(
  "VqDYCHA8hUSDB78ion6qaQ/C8uDWiW6HU-GRdDf-INAgQ",

  {
    // <-- This is the actual SDK Key for your Production environment

    pollIntervalSeconds: 5, //tiempo en segundos para hacer pull de la configuraciónn de config cat

    logger: logger,

    configChanged: async () => {
      //deteccion de cambios en la configuración

      //actualización del sujeto

      this.list_feature.next(await this.getlist_feature());
    },
  }
);
```

- Ya lo que queda por hacer es apuntar hacia las flags de tu proyecto como se indica en el doc de Jira.

## CloudBees

Instalar Rox en el proyecto (SDK para JS):

    # Add the Rollout SDK to your application:
    npm install rox-browser --save
    # For TypeScript projects, also add the corresponding types:
    npm install @types/rox-browser --save

- Crear una cuenta en [CloudBees](https://www.cloudbees.com/).
- Entrar a la sección de CloudBees Feature Management

![enter image description here](https://i.ibb.co/K5Fr53G/cloudbees-options.png)

- Crear las flags que desee utilizar en la app. (leer el documento de Jira para conocer más).
- Para modificar el servicio de rox debe editar el archivo **_rox-service.service.ts_** que se encuentra en la ruta : /src/app/services/
  - Lo primero es cambiar el SDK Key por el de tu proyecto Rox (recordar que el key cambia en cada environmet):

```js
async  initRollout() {

const  options = {

configurationFetchedHandler: this.configurationFetchedHandler,

};

Rox.register("", this.flags);

// Setup the Rollout key
await  Rox.setup("5fda7d19ccead0b18d678ff1", options);

}
```

- Ya lo que queda por hacer es apuntar hacia las flags de tu proyecto como se indica en el doc de Jira.

## Implementación en el código

- Se implento ConfigCat (configcat service) en el componente **tabs.page.ts** que se encuentra en /src/app/tabs/ y en un route guard (**configcat.guard.ts**) que se encuentra en /src/app/guards/ y el mismo se utilizo en el archivo **tabs-routing.module.ts** que se encuentra en /src/app/tabs/ (Apaga on enciende el tab de Terminados y bloquea o permite el acceso a la ruta de terminados)

- Se implemento CloudBees (Rox service) en el componente **tab1.page.ts** que se encuentra en /src/app/pages/tab1/ (Apaga o enciende la funcionalidad de agregar más listas)

- Documentación de Configcat : [Congicat Docs](https://configcat.com/docs/)
- Documentación de CloudBees: [Rollout Docs](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/)

## Funcionamiento básico

Para crear una lista nueva debe hacer debes presionar en el fab button en el tab de Pendientes.

![enter image description here](https://i.ibb.co/6JBZ3Fc/Screenshot-from-2021-01-05-13-32-21.png)
![enter image description here](https://i.ibb.co/1XXyY3k/Screenshot-from-2021-01-05-13-39-42.png)

**Eliminar una lista**
Hacer slide del item hacia la izquierda:

![delete list](https://i.ibb.co/cChQ5dL/Screenshot-from-2021-01-05-13-42-31.png)

**Editar Lista**
Hacer slide hacia la derecha:

![enter image description here](https://i.ibb.co/r088KLZ/Screenshot-from-2021-01-05-13-44-54.png)
