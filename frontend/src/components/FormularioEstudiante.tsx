import React, { useState } from 'react';
import { Estudiante } from '../types';
import { estudianteService } from '../api';

interface Props {
  onEstudianteAgregado: () => void;
}

const FormularioEstudiante: React.FC<Props> = ({ onEstudianteAgregado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    fechaNacimiento: '',
    programa: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await estudianteService.crear(formData);
      setFormData({
        nombre: '',
        correo: '',
        fechaNacimiento: '',
        programa: '',
      });
      onEstudianteAgregado();
      alert('Estudiante registrado exitosamente!');
    } catch (error: any) {
      console.error('Error al crear estudiante:', error);
      if (error.response?.data) {
        setError(error.response.data);
      } else {
        setError('Error al registrar el estudiante. Por favor, intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const programas = [
    'Ingeniería de Sistemas',
    'Ingeniería Industrial',
    'Ingeniería Civil',
    'Medicina',
    'Derecho',
    'Administración de Empresas',
    'Psicología',
    'Contaduría Pública',
    'Arquitectura',
    'Diseño Gráfico',
  ];

  return (
    <div className="formulario-container">
      <h2>Registrar Nuevo Estudiante</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ingresa el nombre completo"
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="campo">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="programa">Programa Académico:</label>
          <select
            id="programa"
            name="programa"
            value={formData.programa}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un programa</option>
            {programas.map(programa => (
              <option key={programa} value={programa}>
                {programa}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Registrando...' : 'Registrar Estudiante'}
        </button>
      </form>
    </div>
  );
};

export default FormularioEstudiante;
