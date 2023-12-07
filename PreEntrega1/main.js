let nombreAlumno= prompt("Ingrese el Nombre del Alumno");
let notasPregunta = Number(prompt("¿Cuantas Notas tiene el Alumno?"));

let suma = 0
for (i = 1; i <= notasPregunta; i++){
    let notas = Number(prompt("Nota " + i + ":"));
    if (notas == 0) {
        alert("Debe ingresar una nota válida");
        i--;
    }else{
        suma = suma + notas;
    }
}

const promedio = (x,y) => x/y;

alert("El promedio de notas de " + nombreAlumno + " es: " + promedio(suma, notasPregunta));
