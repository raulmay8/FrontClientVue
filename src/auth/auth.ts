
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return token !== null; 
  };
  
  export const saveAuthToken = (token: string): void => {
    localStorage.setItem('token', token);
  };
  
  export const removeAuthToken = (): void => {
    localStorage.removeItem('token');
  };
  