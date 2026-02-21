<template>
  <div class="pacientes-view">
    <div class="container">
      <PacienteListaComponent
        :pacientes="pacientes"
        :cargando="cargandoLista"
        :error="errorLista"
        @ver-detalle="cargarDetallePaciente"
      />
      
      <PacienteDetalleComponent
        :paciente="pacienteSeleccionado"
        :cargando="cargandoDetalle"
        :error="errorDetalle"
      />
    </div>
  </div>
</template>

<script>
import PacienteListaComponent from '@/components/PacienteListaComponent.vue';
import PacienteDetalleComponent from '@/components/PacienteDetalleComponent.vue';
import { fachadaListarPacientes, fachadaObtenerPacientePorUrl } from '@/clients/PacienteClient';

export default {
  name: 'PacientesView',
  components: {
    PacienteListaComponent,
    PacienteDetalleComponent
  },
  data() {
    return {
      pacientes: [],
      pacienteSeleccionado: null,
      cargandoLista: false,
      cargandoDetalle: false,
      errorLista: '',
      errorDetalle: ''
    };
  },
  mounted() {
    this.cargarPacientes();
  },
  methods: {
    async cargarPacientes() {
      this.cargandoLista = true;
      this.errorLista = '';
      
      try {
        this.pacientes = await fachadaListarPacientes();
      } catch (error) {
        console.error('Error al cargar pacientes:', error);
        this.errorLista = 'Error al cargar la lista de pacientes';
        
      
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          this.$router.push('/login');
        }
      } finally {
        this.cargandoLista = false;
      }
    },
    async cargarDetallePaciente(urlHateoas) {
      this.cargandoDetalle = true;
      this.errorDetalle = '';
      this.pacienteSeleccionado = null;
      
      try {
        
        this.pacienteSeleccionado = await fachadaObtenerPacientePorUrl(urlHateoas);
      } catch (error) {
        console.error('Error al cargar detalle del paciente:', error);
        this.errorDetalle = 'Error al cargar el detalle del paciente';
        
     
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          this.$router.push('/login');
        }
      } finally {
        this.cargandoDetalle = false;
      }
    },
    cerrarSesion() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.pacientes-view {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 0;
}

.container {
  max-width: 100%;
  margin: 0 auto;
}
</style>
