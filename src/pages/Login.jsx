import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // 1. Estado para guardar los datos del formulario de login
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // 2. Manejador para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Lógica para verificar el inicio de sesión
  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtenemos la lista de usuarios de nuestra "base de datos temporal"
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscamos si hay un usuario que coincida con el email Y la contraseña
    const usuarioValido = usuariosExistentes.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (usuarioValido) {
      // Si las credenciales son correctas:
      alert(`¡Bienvenido de nuevo, ${usuarioValido.nombre || usuarioValido.usuario}!`);
      
      // Opcional: Guardamos en localStorage quién es el usuario que inició sesión actualmente
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));

      // Redirigimos a la página de Inicio
      navigate('/'); 
    } else {
      // Si no coinciden:
      alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Ingresa tu email" 
            required 
            className="login-input"
          />
        </div>

        <div className="input-group">
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Ingresa tu contraseña" 
            required 
            className="login-input"
          />
        </div>

        <button type="submit" className="login-btn login-btn-primary">
          Ingresar
        </button>
      </form>

      <button 
        type="button" 
        onClick={() => navigate('/registro')} 
        className="login-btn login-btn-secondary"
      >
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
};

export default Login;