package com.estudiantes.config;

import com.estudiantes.model.Estudiante;
import com.estudiantes.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo insertar datos si la colección está vacía
        if (estudianteRepository.count() == 0) {
            System.out.println("Inicializando base de datos con datos de ejemplo...");
            
            // Crear estudiantes de ejemplo
            Estudiante estudiante1 = new Estudiante(
                "Juan Carlos Pérez",
                "juan.perez@universidad.edu.co",
                LocalDate.of(2000, 5, 15),
                "Ingeniería de Sistemas"
            );
            
            Estudiante estudiante2 = new Estudiante(
                "María José García",
                "maria.garcia@universidad.edu.co",
                LocalDate.of(1999, 8, 22),
                "Administración de Empresas"
            );
            
            Estudiante estudiante3 = new Estudiante(
                "Carlos Andrés López",
                "carlos.lopez@universidad.edu.co",
                LocalDate.of(2001, 2, 10),
                "Ingeniería Industrial"
            );

            // Guardar en la base de datos
            estudianteRepository.save(estudiante1);
            estudianteRepository.save(estudiante2);
            estudianteRepository.save(estudiante3);
            
            System.out.println("Base de datos inicializada con " + estudianteRepository.count() + " estudiantes.");
        } else {
            System.out.println("Base de datos ya contiene " + estudianteRepository.count() + " estudiantes.");
        }
    }
}
