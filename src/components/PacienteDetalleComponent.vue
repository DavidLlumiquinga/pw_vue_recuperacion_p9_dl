<template>
  <div class="paciente-detalle">
    <h2>PACIENTE</h2>
    
    <div v-if="cargando" class="loading">
      Cargando información del paciente...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <form v-else-if="paciente" class="formulario-detalle">
      <div class="form-group">
        <label>ID:</label>
        <input type="text" v-model="paciente.id" readonly class="form-control-readonly" />
      </div>
      
      <div class="form-group">
        <label>Nombre:</label>
        <input type="text" v-model="paciente.nombres" readonly class="form-control-readonly" />
      </div>
      
      <div class="form-group">
        <label>Apellido:</label>
        <input type="text" v-model="paciente.apellidos" readonly class="form-control-readonly" />
      </div>
      
      <div class="form-group">
        <label>Dirección:</label>
        <input type="text" v-model="paciente.direccion" readonly class="form-control-readonly" />
      </div>
      
      <div class="form-group">
        <label>Fecha de Nacimiento:</label>
        <input type="text" :value="formatearFecha(paciente.fechaNacimiento)" readonly class="form-control-readonly" />
      </div>
    </form>
    
    <div v-else class="sin-seleccion">
      Seleccione un paciente de la lista para ver sus detalles
    </div>
  </div>
</template>

<script>
export default {
  name: 'PacienteDetalleComponent',
  props: {
    paciente: {
      type: Object,
      default: null
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
    formatearFecha(fecha) {
      if (!fecha) return '';
      const date = new Date(fecha);
      return date.toLocaleDateString('es-EC');
    }
  }
};
</script>

<style scoped>
.paciente-detalle {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

h2 {
  color: #003d82;
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 40px;
  letter-spacing: 2px;
}

.loading, .error, .sin-seleccion {
  text-align: center;
  padding: 30px;
  font-size: 14px;
}

.error {
  color: #c62828;
  background-color: #ffebee;
  border-radius: 3px;
}

.sin-seleccion {
  color: #666;
  font-size: 16px;
}

.formulario-detalle {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background-color: transparent;
  border: 2px solid #003d82;
  border-radius: 8px;
  padding: 40px;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #003d82;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}

.form-control-readonly {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #003d82;
  border-radius: 6px;
  background-color: #ffffff;
  color: #333;
  font-size: 15px;
  box-sizing: border-box;
}

textarea.form-control-readonly {
  resize: vertical;
  font-family: inherit;
  min-height: 60px;
}
</style>
