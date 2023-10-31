const baseUrl = 'http://localhost:3000';

const api = {
  async request(endpoint:string, options = {}) {
    const url = `${baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;

    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  }
};

export default api;
