// src/services/api.js
const BASE_URL = 'http://localhost:8080/api'; // Ajusta esto si tu backend usa otro puerto o ruta

// Manejador genérico de respuestas
async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error en la petición');
  }
  return response.json();
}

// --- PACIENTES ---
export const getPatients = () => fetch(`${BASE_URL}/patients`).then(handleResponse);

// --- DOCTORES ---
export const getDoctors = () => fetch(`${BASE_URL}/doctors`).then(handleResponse);

// --- CONSULTORIOS ---
export const getOffices = () => fetch(`${BASE_URL}/offices`).then(handleResponse);

// --- DISPONIBILIDAD ---
export const getAvailability = (doctorId, date) => 
  fetch(`${BASE_URL}/availability/doctors/${doctorId}?date=${date}`).then(handleResponse);

// --- CITAS (RESERVAS) ---
export const getAppointments = () => fetch(`${BASE_URL}/appointments`).then(handleResponse);

export const createAppointment = (data) => 
  fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);