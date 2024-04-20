import axios from 'axios';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
interface Cliente {
  id: number;
  nameCliente: string;
  apellidoCliente: string;
  correoCliente: string;
  telefono: string;
  fechaLlegada: string;
  horaLlegada: string;
  personas: string;

}

interface Cenote {
  id: number;
  nameCenote: string;
  createdAt: string; 
}

interface Reserva {
  cliente: Cliente;
  cenote: Cenote;
  token: string;
  precioTotal: number;
  createdAt: string;
  updatedAt: string;
}

export default class AuthService {
  private token: Ref<string>;
  private router = useRouter();

  constructor() {
    const storedToken = localStorage.getItem('token');
    this.token = ref<string>(storedToken || '');
  }

  getToken(): Ref<string> {
    return this.token;
  }

  async login(correoUsuario: string, password: string): Promise<boolean> {
    if (!correoUsuario || !password) {
      throw new Error('Correo y contraseña son requeridos.');
    }

    const formData = { correoUsuario, password };

    try {
      const response = await axios.post(`http://localhost:4000/admin/login`, formData);

      const jsonResponse = response.data;

      if (response.status === 200) {
        if (jsonResponse && jsonResponse.token) {
          this.token.value = jsonResponse.token;
          localStorage.setItem('token', jsonResponse.token);
          return true;
        } else {
          this.token.value = '';
          throw new Error('Token no encontrado en la respuesta.');
        }
      } else {
        throw new Error(jsonResponse.error || 'Error al iniciar sesión.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 401) {
          throw new Error('Usuario no encontrado.');
        } else if (status === 409) {
          throw new Error('La cuenta no ha sido confirmada.');
        } else if (status === 400) {
          throw new Error('Contraseña incorrecta.');
        } else {
          throw new Error('Error de red.');
        }
      } else {
        throw new Error('Error de red.');
      }
    }
  }

  async register(correoUsuario: string, nameUsuario: string, password: string, password_confirmation: string): Promise<boolean> {
    if (!correoUsuario || !nameUsuario || !password || !password_confirmation) {
      throw new Error('Correo y contraseña son requeridos.');
    }

    const formData = { correoUsuario, nameUsuario, password, password_confirmation };

    try {
      const response = await axios.post(`http://localhost:4000/admin/register`, formData);
      const jsonResponse = response.data;

      this.router.push({ name: 'reserva' });
      if (response.status === 201) {
        console.log('Registro exitoso. Redirigiendo al inicio de sesión...');
        return true;
      } else {
        throw new Error(jsonResponse.error || 'Error al registrar usuario.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        } else if (status === 409) {
          throw new Error('Usuario registrado');
        } else {
          throw new Error('Error al registrar usuario. Por favor, intenta nuevamente más tarde.');
        }
      } else {
        throw new Error('Error de red. Por favor, verifica tu conexión a internet.');
      }
    }
  }

  async confirmAccount(token: string): Promise<boolean> {
    try {
      const response = await axios.post(`http://localhost:4000/admin/confirm-account`, { token });
      if (response.status === 200) {
        // Cuenta confirmada exitosamente
        return true;
      } else {
        throw new Error(response.data.error || 'Error al confirmar la cuenta.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 401) {
          throw new Error('Token no válido.');
        } else if (status === 404) {
          throw new Error('Usuario no encontrado.');
        } else {
          throw new Error('Error al confirmar la cuenta.');
        }
      } else {
        throw new Error('Error de red. Por favor, verifica tu conexión a internet.');
      }
    }
  }
  async getReservaDetails(token: string): Promise<Reserva | null> {
    try {
      const response = await axios.get(`http://localhost:4000/reserva/${token}`);
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener detalles de la reserva:', error);
      return null;
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.token.value = '';
    this.router.push({ name: 'login' }); // Redirige al usuario al inicio de sesión al cerrar sesión
  }
}
