<template>
  <div class="paciente-lista">
    <h2>LISTA DE PACIENTES</h2>
    
    <div v-if="cargando" class="loading">
      Cargando pacientes...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="tabla-container">
      <table class="tabla-pacientes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paciente in pacientes" :key="paciente.id">
            <td>{{ paciente.id }}</td>
            <td>{{ paciente.nombres }}</td>
            <td>{{ paciente.apellidos }}</td>
            <td>{{ formatearFecha(paciente.fechaNacimiento) }}</td>
            <td>
              <button @click="verDetalle(paciente)" class="btn-ver">
                Ver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="pacientes.length === 0" class="sin-datos">
        No hay pacientes registrados
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PacienteListaComponent',
  props: {
    pacientes: {
      type: Array,
      default: () => []
    },
    cargando: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    verDetalle(paciente) {
     
      this.$emit('ver-detalle', paciente.self);
    },
    formatearFecha(fecha) {
      if (!fecha) return '';
      const date = new Date(fecha);
      return date.toLocaleDateString('es-EC');
    }
  }
};
</script>

<style scoped>
.paciente-lista {
  max-width: 1000px;
  margin: 40px auto;
  padding: 40px;
  border: 2px solid #003d82;
  border-radius: 8px;
  background-color: white;
}

h2 {
  color: #003d82;
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 14px;
}

.error {
  color: #c62828;
  background-color: #ffebee;
  border-radius: 3px;
}

.tabla-container {
  overflow-x: auto;
}

.tabla-pacientes {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.tabla-pacientes th,
.tabla-pacientes td {
  padding: 14px;
  text-align: center;
  border: 2px solid #003d82;
  font-size: 15px;
}

.tabla-pacientes th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #003d82;
}

.tabla-pacientes tbody tr:hover {
  background-color: #f8f9fa;
}

.btn-ver {
  background-color: #dc3545;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-ver:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.btn-ver:active {
  transform: translateY(0);
}

.sin-datos {
  text-align: center;
  padding: 30px;
  color: #666;
  font-size: 16px;
}
</style>
