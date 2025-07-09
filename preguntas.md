# Repositorio
https://github.com/DanyDanny7/dany_test/tree/master


# Respuesta de las preguntas

1. Solo tengo conocimientos en react native y flutter, 
preferencia de uso.
React Native => principlamente con el uso de expo es muy practica para aplicaciones de facil y rapido desarrollo, siempre que no se necesiten elementos nativos, sino hay que desarrollar sin expo, y los errores y demas detalles pueden llegar a ser significativos si se trabaja con apps obsoletas.
Flutter => debido al apoyo de google tiene una de las mejores documentaciones y deja poco al criterio, definiendo un flujo de trabajo mas lineal, muy bueno para proyectos robustos y con multiple devs.


2. La gestion de estado.
Al desarrollar necesitamos persistir los valores de las variables, de manera simple a nivel de componente, pero al avanzar es necesario persistir dicha informacion a nivel de vistas, o incluso al salir y cerrar la app, las metodologias que mas he usado en react nativo son.
Redux => para persistir entre vistas, organizar los servicios y separar la logica de los mismos, muy util en proyectos muy robustos. 
Context => los prefiero porque no se usan dependencias de terceros, y puede llegar a ser tan robusto como se necesite, poco usado en apps antiguas porque su soporte es relativamente nuevo, y se pueden crear tantos como se necesiten, aunq si es el caso habria que hacer un archivo administrador de proveedores, para no saturar el apps

3. El useEffect permite controlar el ciclo de vida, basicamente es una funcion que recibe 2 parametros, lo primero es el contenido y lo segundo es los detonantes, es decir especificamos que variables escuchara para poder ejecutarse, y cada que el valor de la variable cambie esta se ejecutara y realizara lo que se le haya asignado, si no se asigna una variable solo se deja [], identificando que se usara 1 vez, cuando el componente sea montado.
hay que tener cuidado de no referenciar objetos, ya que en cada render su referencia cambia y se pueden generar multiple renders o bucles, si se referencia objetos lo mejor es o convertirlo a string, o usar un useCallback.

4. idemponente entiendo que las veces que se consuma siempre que sea identico, respondera lo mismo y si algun valor cambia como un parametro, entonces es procesado como una ejecucion nueva, los metodos GET por lo regular serian idemponente, y los put post y delete no. 

5. merge vs rebase
la diferencia es el resultado final, es decir, si consideramos que los commits son un alinea de tiempo, y 2 lineas de tiempo se unen, merge intentara consolidarlas y previamente hay que resolver conflictos para que se homologuen y ambas lineas se vuelvan 1, pero rebase superpondra una linea sobre otra (la que se especifique), ignorando todo el flujo que la descartada tenia.

usar merge => cuando el trabajo de 2 personas se necesita consolidar.
usar rebase => cuando se han manejado 2 ramas similares, pero con alguna diferencia signficativa por ejemplo en una migracion, en una rama lo migrado y en o la otra la version anterior, pero una vez la migracion termine, se superpondra a la anterior.