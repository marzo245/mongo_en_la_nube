import React, { useState } from 'react';
import FormularioEstudiante from './components/FormularioEstudiante';
import TablaEstudiantes from './components/TablaEstudiantes';
import './App.css';

const App: React.FC = () => {
  const [actualizarTabla, setActualizarTabla] = useState(false);

  const handleEstudianteAgregado = () => {
    setActualizarTabla(true);
  };

  const handleActualizacionCompleta = () => {
    setActualizarTabla(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎓 Sistema de Gestión de Estudiantes</h1>
        <p>Registra y consulta información de estudiantes</p>
      </header>

      <main className="app-main">
        <div className="container">
          <FormularioEstudiante onEstudianteAgregado={handleEstudianteAgregado} />
          <TablaEstudiantes 
            actualizarLista={actualizarTabla} 
            onActualizacionCompleta={handleActualizacionCompleta}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 Sistema de Gestión de Estudiantes - Desarrollado con React y Spring Boot</p>
      </footer>
    </div>
  );
};

export default App;
