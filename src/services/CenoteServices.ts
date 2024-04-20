// cenoteService.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // URL base de tu API

// Función para obtener la información de todos los cenotes
export async function getAllCenotes() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data.data; // Retorna solo la data de los cenotes
  } catch (error) {
    console.error('Error al obtener los cenotes:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

// Función para obtener la información de un cenote específico por su ID
export async function getCenoteById(cenoteId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/${cenoteId}`);
    console.log(response)
    return response.data; // Retorna toda la información del cenote
  } catch (error) {
    console.error(`Error al obtener el cenote con ID ${cenoteId}:`, error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}
export async function deleteCenoteService(cenoteId: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/${cenoteId}`);
    return response.data; // Retorna la respuesta de la eliminación
  } catch (error) {
    console.error(`Error al eliminar el cenote con ID ${cenoteId}:`, error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

export async function updateCenote(cenoteId: number, newData: any) {
  try {
    const response = await axios.put(`${BASE_URL}/${cenoteId}`, newData);
    return response.data; // Retorna la respuesta de la actualización
  } catch (error) {
    console.error(`Error al actualizar el cenote con ID ${cenoteId}:`, error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}
export async function createCenote(newCenoteData: any) {
  try {
    const response = await axios.post(`${BASE_URL}/`, newCenoteData);
    return response.data; // Retorna la respuesta de la creación
  } catch (error) {
    console.error('Error al crear un nuevo cenote:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}
