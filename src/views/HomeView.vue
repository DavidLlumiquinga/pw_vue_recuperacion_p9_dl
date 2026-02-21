<template>
  <div class="home-view">
    <div class="hero">
      <h1>Sistema de Gestión de Pacientes</h1>
      <p>Bienvenido al sistema de gestión de consultorio médico</p>
      <router-link to="/login" class="btn-primary">
        Iniciar Sesión
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
}

.hero {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 42px;
  margin-bottom: 16px;
  color: #0099cc;
  font-weight: bold;
  letter-spacing: 2px;
}

p {
  font-size: 16px;
  margin-bottom: 32px;
  color: #666;
}

.btn-primary {
  display: inline-block;
  padding: 16px 70px;
  background: #0babeb;
  color: white;
  text-decoration: none;
  border: 2px solid #000000;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #0099d6;
  transform: translateY(-2px);
}
</style>
