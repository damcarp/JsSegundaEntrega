document.getElementById('contadorBoton').addEventListener('click', iniciarContador);

function iniciarContador() {
    let duracionDelCurso = parseInt(prompt("¿Cuántos días dura el curso?"));
    if (isNaN(duracionDelCurso) || duracionDelCurso <= 0) {
        alert("Por favor ingresa un número válido para la duración del curso.");
        return;
    }

    let cantidadDeAlumnos = parseInt(prompt("¿Cuántos alumnos son?"));
    if (isNaN(cantidadDeAlumnos) || cantidadDeAlumnos <= 0) {
        alert("Por favor ingresa un número válido para la cantidad de alumnos.");
        return;
    }

    let alumnosTotales = [];

    for (let i = 0; i < cantidadDeAlumnos; i++) {
        let nombreAlumno = prompt("Nombre del alumno " + (i + 1));
        if (nombreAlumno === null || nombreAlumno.trim() === "") {
            alert("El nombre del alumno no puede estar vacío.");
            return;
        }
        alumnosTotales.push({ nombre: nombreAlumno, asistencias: 0 });
    }

    function tomarAsistencia(alumno) {
        let presencia;
        do {
            presencia = prompt(`¿${alumno.nombre} está presente? (Si/No)`);
            if (presencia === null) return;
            presencia = presencia.trim().toLowerCase();
            if (presencia === "si" || presencia === "s") {
                alumno.asistencias++;
            } else if (presencia === "no" || presencia === "n") {
            } else {
                alert("Respuesta inválida. Debes poner 'Si' o 'No'.");
            }
        } while (presencia !== "si" && presencia !== "s" && presencia !== "no" && presencia !== "n");
    }

    for (let i = 0; i < duracionDelCurso; i++) {
        alumnosTotales.forEach(alumno => tomarAsistencia(alumno));
    }


    const alumnosReprobados = alumnosTotales.filter(alumno => {
        const ausencias = duracionDelCurso - alumno.asistencias;
        const porcentajeAusencias = (ausencias / duracionDelCurso) * 100;
        return porcentajeAusencias > 30;
    });


    let resultadoHTML = "<table border='1' cellpadding='5'><thead><tr><th>Nombre</th><th>Asistencias</th><th>Ausencias</th><th>Porcentaje de Ausencias</th><th>Estado</th></tr></thead><tbody>";
    alumnosTotales.forEach(alumno => {
        const ausencias = duracionDelCurso - alumno.asistencias;
        const porcentajeAusencias = (ausencias / duracionDelCurso) * 100;
        resultadoHTML += `<tr>
            <td>${alumno.nombre}</td>
            <td>${alumno.asistencias}</td>
            <td>${ausencias}</td>
            <td>${porcentajeAusencias.toFixed(2)}%</td>
            <td>${porcentajeAusencias > 30 ? "REPROBADO POR INASISTENCIAS" : "Aprobado"}</td>
        </tr>`;
    });
    resultadoHTML += "</tbody></table>";
    

    document.getElementById('resultados').innerHTML = resultadoHTML;


    console.log("Alumnos reprobados por inasistencias:");
    alumnosReprobados.forEach(alumno => console.log(alumno.nombre));
}