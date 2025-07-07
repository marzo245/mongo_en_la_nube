package com.estudiantes.service;

import com.estudiantes.model.Estudiante;
import com.estudiantes.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {
    
    @Autowired
    private EstudianteRepository estudianteRepository;
    
    public List<Estudiante> obtenerTodosLosEstudiantes() {
        return estudianteRepository.findAll();
    }
    
    public Optional<Estudiante> obtenerEstudiantePorId(String id) {
        return estudianteRepository.findById(id);
    }
    
    public Estudiante guardarEstudiante(Estudiante estudiante) {
        // Verificar si ya existe un estudiante con ese correo
        if (estudianteRepository.existsByCorreo(estudiante.getCorreo())) {
            throw new RuntimeException("Ya existe un estudiante con el correo: " + estudiante.getCorreo());
        }
        return estudianteRepository.save(estudiante);
    }
    
    public Estudiante actualizarEstudiante(String id, Estudiante estudiante) {
        Optional<Estudiante> estudianteExistente = estudianteRepository.findById(id);
        
        if (estudianteExistente.isPresent()) {
            Estudiante estudianteActualizado = estudianteExistente.get();
            
            // Verificar si el correo ya existe (y no es del mismo estudiante)
            if (!estudianteActualizado.getCorreo().equals(estudiante.getCorreo()) 
                && estudianteRepository.existsByCorreo(estudiante.getCorreo())) {
                throw new RuntimeException("Ya existe un estudiante con el correo: " + estudiante.getCorreo());
            }
            
            estudianteActualizado.setNombre(estudiante.getNombre());
            estudianteActualizado.setCorreo(estudiante.getCorreo());
            estudianteActualizado.setFechaNacimiento(estudiante.getFechaNacimiento());
            estudianteActualizado.setPrograma(estudiante.getPrograma());
            
            return estudianteRepository.save(estudianteActualizado);
        } else {
            throw new RuntimeException("Estudiante no encontrado con ID: " + id);
        }
    }
    
    public void eliminarEstudiante(String id) {
        if (estudianteRepository.existsById(id)) {
            estudianteRepository.deleteById(id);
        } else {
            throw new RuntimeException("Estudiante no encontrado con ID: " + id);
        }
    }
    
    public Optional<Estudiante> obtenerEstudiantePorCorreo(String correo) {
        return estudianteRepository.findByCorreo(correo);
    }
}
