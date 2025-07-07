package com.estudiantes.controller;

import com.estudiantes.model.Estudiante;
import com.estudiantes.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class EstudianteController {
    
    @Autowired
    private EstudianteService estudianteService;
    
    // Obtener todos los estudiantes
    @GetMapping
    public ResponseEntity<List<Estudiante>> obtenerTodosLosEstudiantes() {
        try {
            List<Estudiante> estudiantes = estudianteService.obtenerTodosLosEstudiantes();
            return new ResponseEntity<>(estudiantes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Obtener estudiante por ID
    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtenerEstudiantePorId(@PathVariable String id) {
        try {
            Optional<Estudiante> estudiante = estudianteService.obtenerEstudiantePorId(id);
            if (estudiante.isPresent()) {
                return new ResponseEntity<>(estudiante.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Crear nuevo estudiante
    @PostMapping
    public ResponseEntity<?> crearEstudiante(@Valid @RequestBody Estudiante estudiante) {
        try {
            Estudiante estudianteGuardado = estudianteService.guardarEstudiante(estudiante);
            return new ResponseEntity<>(estudianteGuardado, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Actualizar estudiante
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEstudiante(@PathVariable String id, @Valid @RequestBody Estudiante estudiante) {
        try {
            Estudiante estudianteActualizado = estudianteService.actualizarEstudiante(id, estudiante);
            return new ResponseEntity<>(estudianteActualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Eliminar estudiante
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEstudiante(@PathVariable String id) {
        try {
            estudianteService.eliminarEstudiante(id);
            return new ResponseEntity<>("Estudiante eliminado exitosamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Buscar estudiante por correo
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Estudiante> obtenerEstudiantePorCorreo(@PathVariable String correo) {
        try {
            Optional<Estudiante> estudiante = estudianteService.obtenerEstudiantePorCorreo(correo);
            if (estudiante.isPresent()) {
                return new ResponseEntity<>(estudiante.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
