[![Build Status](https://travis-ci.org/arq1nnySu/enjoy-events-front.svg)](https://travis-ci.org/arq1nnySu/enjoy-events-front)

# enjoy-events-front

## Version
0.0.1

## Prerequisitos

NodeJs

## Para ejecutar:

```
npm install
npm run watch
```

#

## Definición formal inicial de los RNF

### Indispensable

##### Usabilidad:
- El portal debe ser fácilmente usable y operable.
- Ante cualquier error, el sistema debe informar al usuario lo sucedido.
- Que el portal permita la autenticación a través de las redes sociales (Especificar).

##### Modificabilidad (Extensibilidad, Escalabilidad):
- Que se incorporen nuevas funcionalidades sin tener tanto impacto en la aplicación.
- Que permita cambios fuera de los aspectos funcionales, Ej: Cambiar la estética de la interfaz.

##### Seguridad:
- La visualización de los eventos y ver el detalle de cada uno debe estar disponible para todos, sin ningún tipo de autenticación o verificación. 
- Toda acción que modifique alguna información sobre los eventos, solo la podrán realizar las personas que estén registradas; estos usuarios serán clasificados en varios tipos de usuarios (o roles) con acceso a las operaciones definidas para cada rol.

#

### Negociables

##### Portabilidad:
- Que el portal se pueda ver en todos los browsers (versiones modernas) (Especificar).
- Que sea el portal se pueda ver bien tanto las computadoras como en los celulares o tables (responsive) (detallar que es responsive).


##### Disponibilidad:
- Que el portal esté la mayor parte del tiempo disponible.


##### Accesibilidad:
- Que el portal sea de uso general, es decir, que cualquier usuario debería poder interactuar con el portal sin problemas o casi sin problemas.

##### Concurrencia:
- 

