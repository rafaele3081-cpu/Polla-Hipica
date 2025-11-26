// Paso 1: Reemplaza estos valores con tu Project URL y Anon Key de Supabase
const SUPABASE_URL = 'TU_PROJECT_URL_AQUI'; // Ejemplo: 'https://abcd1234.supabase.co'
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_AQUI'; // Ejemplo: 'eyJhbGciOiJIUzI1NiI...'

// Inicializa el cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener las carreras y mostrarlas
async function getCarreras() {
    // Consulta la tabla 'carreras' y selecciona todas las columnas
    let { data: carreras, error } = await supabase
        .from('carreras')
        .select('*'); // Puedes agregar .order('fecha', { ascending: true }) para ordenarlas

    const lista = document.getElementById('lista-carreras');
    lista.innerHTML = ''; // Limpia el mensaje de "Cargando..."

    if (error) {
        console.error('Error al cargar carreras:', error);
        lista.innerHTML = '<li>Error al cargar las carreras.</li>';
        return;
    }

    if (carreras.length === 0) {
        lista.innerHTML = '<li>No hay carreras programadas aún.</li>';
        return;
    }
    
    // Muestra las carreras en la lista
    carreras.forEach(carrera => {
        const li = document.createElement('li');
        li.textContent = `${carrera.nombre_carrera} - Pista: ${carrera.pista} - Fecha: ${carrera.fecha} (${carrera.estatus})`;
        lista.appendChild(li);
    });
}

// Llama a la función al cargar la página
getCarreras();
