import React, { useState, useEffect } from 'react';
import { Estudiante } from '../types';
import { estudianteService } from '../api';

interface Props {
  actualizarLista: boolean;
  onActualizacionCompleta: () => void;
}

const TablaEstudiantes: React.FC<Props> = ({ actualizarLista, onActualizacionCompleta }) => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarEstudiantes = async () => {
    try {
      setLoading(true);
      const data = await estudianteService.obtenerTodos();
      setEstudiantes(data);
      setError('');
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
      setError('Error al cargar la lista de estudiantes');
    } finally {
      setLoading(false);
      onActualizacionCompleta();
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  useEffect(() => {
    if (actualizarLista) {
      cargarEstudiantes();
    }
  }, [actualizarLista]);

  const handleEliminar = async (id: string, nombre: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
      try {
        await estudianteService.eliminar(id);
        await cargarEstudiantes();
        alert('Estudiante eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        alert('Error al eliminar el estudiante');
      }
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = nacimiento.getMonth();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  };

  if (loading) {
    return <div className="loading">Cargando estudiantes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="tabla-container">
      <h2>Lista de Estudiantes Registrados</h2>
      
      {estudiantes.length === 0 ? (
        <div className="no-estudiantes">
          <p>No hay estudiantes registrados aún.</p>
          <p>¡Registra el primer estudiante usando el formulario de arriba!</p>
        </div>
      ) : (
        <>
          <div className="estadisticas">
            <p>Total de estudiantes registrados: <strong>{estudiantes.length}</strong></p>
          </div>
          
          <div className="tabla-scroll">
            <table className="tabla-estudiantes">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Edad</th>
                  <th>Programa</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.id}>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.correo}</td>
                    <td>{formatearFecha(estudiante.fechaNacimiento)}</td>
                    <td>{calcularEdad(estudiante.fechaNacimiento)} años</td>
                    <td>{estudiante.programa}</td>
                    <td>
                      <button
                        onClick={() => handleEliminar(estudiante.id!, estudiante.nombre)}
                        className="btn-eliminar"
                        title="Eliminar estudiante"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TablaEstudiantes;
