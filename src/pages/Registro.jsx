import React from 'react'
import { useNavigate } from 'react-router-dom'

const Registro = () => {
  
  const [formData, setFormData] = React.useState({
    nombre: '',
    apellido: '',
    usuario: '',
    email: '',
    documento: '',
    numeroDocumento: '',
    password: '',
    fechaNacimiento: '',
    direccion: '',
    telefono: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
    const correoExiste = usuariosExistentes.find(user => user.email === formData.email);
    if (correoExiste) {
      alert("Este correo ya está registrado.");
      return;
    }
    usuariosExistentes.push(formData);
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
    alert('¡Registro exitoso! Ya puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="registro-container">
      <h2 className="registro-title">Registro</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="registro-input" />
        <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required className="registro-input" />
        <input name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Usuario" required className="registro-input" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="registro-input" />
        <select name="documento" value={formData.documento} onChange={handleChange} required className="registro-input">
          <option value="">Tipo de documento</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="PA">Pasaporte</option>
        </select>
        <input name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} placeholder="Número de documento" required className="registro-input" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required className="registro-input" />
        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required className="registro-input" />
        <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" className="registro-input" />
        <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className="registro-input" />
        <button type="submit" className="registro-btn registro-btn-primary">Registrar</button>
      </form>
      <button type="button" onClick={() => navigate('/login')} className="registro-btn registro-btn-secondary">Volver al login</button>
    </div>
  )
}

export default Registro