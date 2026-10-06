# 🎵 Sonido Sur App

Aplicación móvil desarrollada con **React Native y Expo** como parte del Trabajo Práctico N°11.

La aplicación permite realizar una **inscripción a un evento musical**, ingresando datos personales y seleccionando el tipo de entrada. El proyecto incluye validaciones de formularios, almacenamiento local y, como parte principal de este trabajo, la implementación de **React Context para gestionar y compartir el estado de la inscripción entre diferentes componentes**.

---

## 📱 ¿Qué permite hacer la aplicación?

La aplicación cuenta con un formulario de inscripción al evento **Sonido Sur**.

El usuario puede ingresar:

* 👤 Nombre completo
* 📧 Email
* 🎂 Edad
* 🎟️ Tipo de entrada
* 📱 Teléfono 

Una vez completado correctamente el formulario, el usuario puede confirmar su inscripción y visualizar los datos ingresados.


---

# 🛠️ Tecnologías utilizadas

El proyecto fue desarrollado utilizando las siguientes tecnologías:

* **React Native** — desarrollo de la interfaz de la aplicación móvil.
* **Expo** — ejecución y desarrollo del proyecto.
* **React Hook Form** — gestión y validación del formulario.
* **React Context** — manejo y distribución del estado global de la inscripción.
* **JavaScript / JSX** — lenguaje utilizado para desarrollar la aplicación.

---

# 📂 Estructura principal del proyecto

```text
TP11_Forms/
│
├── App.jsx
│
├── components/
│   ├── CampoFormulario.jsx
│   ├── TicketConfirmacion.jsx
│   └── ResumenInscripcion.jsx
│
├── screens/
│   └── InscripcionScreen.jsx
│
├── src/
│   └── context/
│       └── RegistrationContext.jsx
│
├── assets/
│   └── ...
│
├── package.json
└── README.md
```

### ¿Qué función cumple cada archivo?

**`App.jsx`**

Es el punto de entrada de la aplicación. Allí se coloca el `RegistrationProvider`, que permite que los componentes de la aplicación puedan acceder al estado compartido.

**`screens/InscripcionScreen.jsx`**

Contiene el formulario principal de inscripción. Se encarga de recibir los datos del usuario, validarlos y guardar la inscripción mediante React Context.

**`components/CampoFormulario.jsx`**

Es un componente reutilizable utilizado para representar los distintos campos de texto del formulario.

**`components/TicketConfirmacion.jsx`**

Muestra la confirmación de la inscripción una vez que el formulario fue enviado correctamente.

**`components/ResumenInscripcion.jsx`**

Es un componente creado para demostrar el uso de React Context desde otro componente. Obtiene directamente los datos guardados en el Context y los muestra.

**`src/context/RegistrationContext.jsx`**

Contiene la implementación de React Context. Allí se crea el Context, se administra el estado de la inscripción y se definen las funciones para guardar y eliminar los datos.

---

# ⚛️ Implementación de React Context

## ¿Por qué se utilizó React Context?

La aplicación necesita utilizar los datos de una inscripción en diferentes componentes.

Por ejemplo, `InscripcionScreen` obtiene los datos del formulario y necesita guardarlos, mientras que `ResumenInscripcion` necesita acceder a esos mismos datos para mostrarlos.

Una alternativa sería pasar los datos mediante `props`:

```text
InscripcionScreen
      ↓ props
Componente intermedio
      ↓ props
ResumenInscripcion
```

Esto puede volverse innecesariamente complicado cuando existen varios niveles de componentes.

Por eso se decidió utilizar **React Context**, que permite compartir información entre componentes sin tener que pasarla manualmente mediante props.

---

# 🧩 1. Creación del Context

El primer paso fue crear el archivo:

```text
src/context/RegistrationContext.jsx
```

Dentro de este archivo se utiliza `createContext()`:

```jsx
const RegistrationContext = createContext();
```

Esto crea el Context que posteriormente podrán utilizar los diferentes componentes de la aplicación.

También se utiliza `useState()` para almacenar los datos:

```jsx
const [registrationData, setRegistrationData] = useState(null);
```

Inicialmente no existe ninguna inscripción, por eso el valor inicial es `null`.

---

# 💾 2. Guardar los datos

Se creó la función:

```jsx
const saveRegistration = (data) => {
  setRegistrationData(data);
};
```

Esta función recibe los datos enviados por el formulario y los almacena dentro del estado del Context.

Los datos guardados contienen:

```text
nombreCompleto
email
edad
tipoEntrada
telefono
```

Cuando el usuario confirma la inscripción, `InscripcionScreen` ejecuta:

```jsx
saveRegistration(data);
```

De esta manera, los datos dejan de pertenecer únicamente al formulario y pasan a estar disponibles mediante el Context.

---

# 🗑️ 3. Limpiar los datos

También se creó una función para eliminar la información almacenada:

```jsx
const clearRegistration = () => {
  setRegistrationData(null);
};
```

Esta función se utiliza cuando el usuario decide reiniciar el formulario.

Así se evita que los datos de la inscripción anterior permanezcan almacenados en el Context.

---

# 🌐 4. Creación del Provider

Para que los componentes puedan acceder al Context, se creó:

```jsx
RegistrationProvider
```

El Provider recibe `children` y permite que todos los componentes que estén dentro de él puedan acceder a la información compartida.

En `App.jsx` se utiliza de esta manera:

```jsx
<RegistrationProvider>
  <StatusBar style="dark" />
  <InscripcionScreen />
</RegistrationProvider>
```

Por lo tanto, `InscripcionScreen` y todos sus componentes hijos tienen acceso al Context.

La estructura final es:

```text
App
└── RegistrationProvider
    └── InscripcionScreen
        ├── CampoFormulario
        ├── TicketConfirmacion
        └── ResumenInscripcion
```

---

# 🔌 5. Consumo del Context

Para utilizar la información almacenada se creó un hook personalizado:

```jsx
export const useRegistrationContext = () => {
  return useContext(RegistrationContext);
};
```

Esto permite que los componentes puedan acceder al Context de una manera sencilla:

```jsx
const {
  registrationData,
  saveRegistration,
  clearRegistration,
} = useRegistrationContext();
```

---

# 📋 6. Uso del Context en InscripcionScreen

`InscripcionScreen` es uno de los componentes que utiliza el Context.

Desde este componente se obtienen:

```jsx
const {
  saveRegistration,
  clearRegistration,
} = useRegistrationContext();
```

Cuando el usuario completa el formulario correctamente, se ejecuta:

```jsx
saveRegistration(data);
```

Esto guarda la inscripción en el Context.

Cuando se reinicia el formulario:

```jsx
clearRegistration();
```

se eliminan los datos almacenados.

De esta forma, `InscripcionScreen` funciona como el componente que **modifica el estado compartido**.

---

# 📄 7. Uso del Context en ResumenInscripcion

El segundo componente que utiliza el Context es:

```text
components/ResumenInscripcion.jsx
```

Este componente obtiene los datos mediante:

```jsx
const {
  registrationData,
} = useRegistrationContext();
```

Después utiliza esos datos para mostrar la información:

```text
Nombre: ...
Email: ...
Edad: ...
Entrada: ...
Teléfono: ...
```

Lo importante es que `ResumenInscripcion` **no recibe estos datos mediante props**.

Los obtiene directamente desde `RegistrationContext`.

Esto demuestra que el Context está funcionando como un estado compartido entre diferentes componentes.

---

# 🔗 Relación entre los componentes

La implementación final puede resumirse así:

| Componente                | Función con Context              |
| ------------------------- | -------------------------------- |
| `App.jsx`                 | Coloca el `RegistrationProvider` |
| `InscripcionScreen.jsx`   | Guarda y elimina datos           |
| `ResumenInscripcion.jsx`  | Lee y muestra datos              |
| `RegistrationContext.jsx` | Centraliza el estado compartido  |

---

# 📝 Validación del formulario

Además de React Context, la aplicación utiliza **React Hook Form** para manejar el formulario.

Cada campo posee sus propias reglas de validación.

Por ejemplo, el nombre debe tener una cantidad mínima de caracteres y el email debe respetar un formato válido.

La edad también es validada para que se encuentre dentro del rango permitido.

El botón de confirmación permanece deshabilitado mientras el formulario no sea válido o mientras se esté procesando la inscripción.

El flujo es:

```text
Usuario completa formulario
          ↓
React Hook Form valida los datos
          ↓
¿Los datos son válidos?
       ↙       ↘
     NO         SÍ
     ↓           ↓
No permite    handleSubmit()
enviar             ↓
              saveRegistration()
                    ↓
             Datos en Context
                    ↓
             Confirmación
```

---

# 💾 Almacenamiento del email

La aplicación también utiliza **AsyncStorage**.

Cada vez que se confirma una inscripción, se guarda el email:

```jsx
AsyncStorage.setItem(LAST_EMAIL_KEY, data.email.trim());
```

Cuando la aplicación vuelve a abrirse, intenta recuperar ese email:

```jsx
AsyncStorage.getItem(LAST_EMAIL_KEY);
```

Si encuentra un email guardado, lo utiliza para completar automáticamente ese campo del formulario.

Esto permite combinar dos formas diferentes de almacenamiento:

* **React Context:** estado compartido durante el funcionamiento de la aplicación.
* **AsyncStorage:** almacenamiento local que permite conservar información entre ejecuciones de la aplicación.

---

# 🎯 ¿Qué problema resuelve React Context?

Antes de utilizar Context, para compartir los datos de la inscripción entre componentes sería necesario pasar la información mediante `props`.

Por ejemplo:

```text
InscripcionScreen
       ↓
Componente intermedio
       ↓
ResumenInscripcion
```

Esto genera un **prop drilling**, es decir, pasar información por componentes que realmente no necesitan utilizarla solamente para que llegue a otro componente.

Con React Context:

```text
             RegistrationContext
                ↙           ↘
               ↓             ↓
    InscripcionScreen   ResumenInscripcion
```

Cada componente puede acceder directamente a la información que necesita.

---

# ✅ Justificación técnica

Se eligió **React Context** porque existe un estado que debe ser compartido entre diferentes componentes: los datos de la inscripción.

La implementación no utiliza Context de manera artificial. El formulario realmente modifica el estado compartido mediante `saveRegistration()`, mientras que otro componente (`ResumenInscripcion`) obtiene y muestra esa información mediante `useContext()`.

Esto permite:

* Evitar el paso innecesario de props.
* Centralizar el estado de la inscripción.
* Separar la lógica del estado de la interfaz.
* Facilitar la reutilización de los datos.
* Hacer que el proyecto sea más sencillo de mantener y ampliar.

---

# 📁 Ubicación del Context

**Archivo:**

```text
src/context/RegistrationContext.jsx
```

**Provider:**

```text
App.jsx
```

**Componentes que consumen el Context:**

```text
screens/InscripcionScreen.jsx
components/ResumenInscripcion.jsx
```

---

# 🚀 Instalación

Para ejecutar el proyecto localmente:

### 1. Clonar el repositorio

```bash
git clone https://github.com/kiaribrukk/TP11_Forms.git
```

### 2. Entrar en la carpeta

```bash
cd TP11_Forms
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar Expo

```bash
npx expo start
```

Luego se puede ejecutar la aplicación utilizando un dispositivo físico, un emulador o **Expo Go**.

---

# 🎓 Conclusión

En este trabajo se incorporó **React Context** a una aplicación de inscripción desarrollada previamente.

El proceso consistió en identificar una información que necesitaba ser utilizada por más de un componente, crear un Context específico para esa información, colocar un Provider en el nivel adecuado de la aplicación y consumirlo desde los componentes correspondientes.

El resultado es una aplicación en la que `InscripcionScreen` puede guardar y limpiar la información de la inscripción, mientras que `ResumenInscripcion` puede acceder a esos datos directamente mediante `useContext()`.

De esta manera, React Context se utiliza para resolver una necesidad real de la aplicación y no solamente como una implementación de ejemplo.
