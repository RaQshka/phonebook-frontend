import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import { contactsApi } from './services/api';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  
  // Загрузка контактов при монтировании
  useEffect(() => {
    loadContacts();
  }, []);
  
  const loadContacts = async () => {
    try {
      const data = await contactsApi.getAll();
      setContacts(data);
    } catch (error) {
      console.error('Ошибка загрузки контактов:', error);
    }
  };
  
  const handleCreate = async (contactData) => {
    try {
      const newContact = await contactsApi.create(contactData);
      setContacts([newContact, ...contacts]);
    } catch (error) {
      console.error('Ошибка создания контакта:', error);
    }
  };
  
  const handleUpdate = async (id, contactData) => {
    try {
      const success = await contactsApi.update(id, contactData);
      if (success) {
        loadContacts(); // Перезагружаем список
        setEditingContact(null);
      }
    } catch (error) {
      console.error('Ошибка обновления контакта:', error);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот контакт?')) {
      try {
        const success = await contactsApi.delete(id);
        if (success) {
          setContacts(contacts.filter(contact => contact.id !== id));
        }
      } catch (error) {
        console.error('Ошибка удаления контакта:', error);
      }
    }
  };
  
  const handleEdit = (contact) => {
    setEditingContact(contact);
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>📒 Контактная книжка</h1>
        <p>Простое приложение для управления контактами</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <ContactForm 
                onSubmit={editingContact ? 
                  (data) => handleUpdate(editingContact.id, data) : 
                  handleCreate}
                initialData={editingContact}
                onCancel={() => setEditingContact(null)}
                isEditing={!!editingContact}
              />
            </div>
            
            <div className="col-md-7">
              <ContactList 
                contacts={contacts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Всего контактов: {contacts.length}</p>
      </footer>
    </div>
  );
}

export default App;