<template>
  <div class="login-container">
    <div class="login-card">
<h1>LOGIN</h1>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            v-model="usuario"
            required
            placeholder="Ingrese su usuario"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Ingrese su contraseña"
            class="form-control"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn-login" :disabled="cargando">
          {{ cargando ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { getTokenFachada } from '@/clients/AuthorizationClient';

export default {
  name: 'LoginComponent',
  data() {
    return {
      usuario: '',
      password: '',
      cargando: false,
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      this.cargando = true;
      this.error = '';
      
      try {
       
        const response = await getTokenFachada(this.usuario, this.password, 'admin');
        
       
        localStorage.setItem('token', response.accessToken);
        
       
        this.$router.push('/pacientes');
      } catch (error) {
        this.error = 'Usuario o contraseña incorrectos';
        console.error('Error en login:', error);
      } finally {
        this.cargando = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

h1 {
  color: #003d82;
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 14px;
}

form {
  width: 100%;
  background-color: transparent;
  border: 2px solid #003d82;
  border-radius: 8px;
  padding: 40px;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  color: #003d82;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #003d82;
  border-radius: 6px;
  font-size: 15px;
  background-color: #ffffff;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #0066cc;
}

.btn-login {
  width: 100%;
  padding: 16px;
  background-color: #0babeb;
  color: white;
  border: 2px solid #003d82;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.btn-login:hover:not(:disabled) {
  background-color: #0099d6;
  transform: translateY(-2px);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 13px;
}
</style>
