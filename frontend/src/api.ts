import axios from 'axios';
import { Estudiante } from './types';

const API_BASE_URL = 'http://localhost:8080/api/estudiantes';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const estudianteService = {
  // Obtener todos los estudiantes
  obtenerTodos: async (): Promise<Estudiante[]> => {
    try {
      const response = await api.get<Estudiante[]>('');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
      throw error;
    }
  },

  // Obtener estudiante por ID
  obtenerPorId: async (id: string): Promise<Estudiante> => {
    try {
      const response = await api.get<Estudiante>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estudiante:', error);
      throw error;
    }
  },

  // Crear nuevo estudiante
  crear: async (estudiante: Omit<Estudiante, 'id'>): Promise<Estudiante> => {
    try {
      const response = await api.post<Estudiante>('', estudiante);
      return response.data;
    } catch (error) {
      console.error('Error al crear estudiante:', error);
      throw error;
    }
  },

  // Actualizar estudiante
  actualizar: async (id: string, estudiante: Omit<Estudiante, 'id'>): Promise<Estudiante> => {
    try {
      const response = await api.put<Estudiante>(`/${id}`, estudiante);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar estudiante:', error);
      throw error;
    }
  },

  // Eliminar estudiante
  eliminar: async (id: string): Promise<void> => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
      throw error;
    }
  },
};
