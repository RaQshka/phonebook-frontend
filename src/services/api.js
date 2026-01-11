const API_URL = 'https://localhost:5001/api';

export const contactsApi = {
  // Получить все контакты
  async getAll() {
    const response = await fetch(`${API_URL}/contacts`);
    return await response.json();
  },
  
  // Получить контакт по ID
  async getById(id) {
    const response = await fetch(`${API_URL}/contacts/${id}`);
    return await response.json();
  },
  
  // Создать контакт
  async create(contact) {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    return await response.json();
  },
  
  // Обновить контакт
  async update(id, contact) {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    return response.ok;
  },
  
  // Удалить контакт
  async delete(id) {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
};