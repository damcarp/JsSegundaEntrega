document.getElementById('contadorBoton').addEventListener('click', iniciarContador);

function iniciarContador() {
    let duracionDelCurso = prompt("¿Cuántos días dura el curso?");
    if (duracionDelCurso === null || duracionDelCurso <= 0) return;

    let cantidadDeAlumnos = prompt("¿Cuántos alumnos son?");
    if (cantidadDeAlumnos === null || cantidadDeAlumnos <= 0) return;

    let alumnosTotales = [];

    for (let i = 0; i < cantidadDeAlumnos; i++) {
        let nombreAlumno = prompt("Nombre del alumno " + (i + 1));
        if (nombreAlumno === null) return;
        alumnosTotales.push({ nombre: nombreAlumno, asistencias: 0 });
    }

    function tomarAsistencia(alumno) {
        let presencia;
        do {
            presencia = prompt(`¿${alumno.nombre} está presente? (Si/No)`);
            if (presencia === null) return;
            if (presencia.toLowerCase() === "si" || presencia.toLowerCase() === "s") {
                alumno.asistencias++;
            } else if (presencia.toLowerCase() !== "no" && presencia.toLowerCase() !== "n") {
                alert("Respuesta inválida. Debes poner 'Si' o 'No'.");
            }
        } while (presencia.toLowerCase() !== "si" && presencia.toLowerCase() !== "s" && presencia.toLowerCase() !== "no" && presencia.toLowerCase() !== "n");
    }

    for (let i = 0; i < duracionDelCurso; i++) {
        alumnosTotales.forEach(alumno => tomarAsistencia(alumno));
    }

    const alumnosReprobados = alumnosTotales.filter(alumno => {
        const ausencias = duracionDelCurso - alumno.asistencias;
        const porcentajeAusencias = (ausencias / duracionDelCurso) * 100;
        return porcentajeAusencias > 30;
    });
    
    let resultadoHTML = "";
    alumnosTotales.forEach(alumno => {
        const ausencias = duracionDelCurso - alumno.asistencias;
        const porcentajeAusencias = (ausencias / duracionDelCurso) * 100;

        resultadoHTML += `${alumno.nombre}:<br>
        Presentes: ${alumno.asistencias}<br>
        Ausencias: ${ausencias}<br>
        Porcentaje de Ausencias: ${porcentajeAusencias.toFixed(2)}%<br>`;

        if (porcentajeAusencias > 30) {
            resultadoHTML += "REPROBADO POR INASISTENCIAS<br><br>";
        } else {
            resultadoHTML += "<br><br>";
        }
    });
    
    document.getElementById('resultados').innerHTML = resultadoHTML;
    
    console.log("Alumnos reprobados por inasistencias:");
    alumnosReprobados.forEach(alumno => console.log(alumno.nombre));
}

