package com.estudiantes.repository;

import com.estudiantes.model.Estudiante;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstudianteRepository extends MongoRepository<Estudiante, String> {
    
    Optional<Estudiante> findByCorreo(String correo);
    
    boolean existsByCorreo(String correo);
}
