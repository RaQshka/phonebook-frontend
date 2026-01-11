import React, { useState } from 'react';
import ContactItem from './ContactItem';
import './ContactList.css';

const ContactList = ({ contacts, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt'); // 'name', 'createdAt', 'updatedAt'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  // Фильтрация контактов
  const filteredContacts = contacts.filter(contact => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      (contact.phone && contact.phone.toLowerCase().includes(searchLower)) ||
      (contact.email && contact.email.toLowerCase().includes(searchLower)) ||
      (contact.note && contact.note.toLowerCase().includes(searchLower))
    );
  });

  // Сортировка контактов
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    let aValue, bValue;
    
    if (sortBy === 'name') {
      aValue = a.name.toLowerCase();
      bValue = b.name.toLowerCase();
    } else {
      aValue = new Date(a[sortBy]);
      bValue = new Date(b[sortBy]);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Переключение сортировки
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Получение иконки сортировки
  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="contact-list-container">
      <div className="list-header">
        <h2 className="list-title">
          📋 Список контактов 
          <span className="badge bg-primary ms-2">{sortedContacts.length}</span>
        </h2>
        
        <div className="list-controls">
          {/* Поиск */}
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Поиск по имени, телефону или email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          {/* Сортировка */}
          <div className="sort-controls">
            <span className="sort-label">Сортировать:</span>
            <div className="btn-group">
              <button
                className={`btn btn-sm ${sortBy === 'name' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleSort('name')}
              >
                По имени {getSortIcon('name')}
              </button>
              <button
                className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleSort('createdAt')}
              >
                По дате создания {getSortIcon('createdAt')}
              </button>
              <button
                className={`btn btn-sm ${sortBy === 'updatedAt' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleSort('updatedAt')}
              >
                По дате обновления {getSortIcon('updatedAt')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Сообщение если нет контактов */}
      {sortedContacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Контакты не найдены</h3>
          <p>
            {searchTerm 
              ? `По запросу "${searchTerm}" ничего не найдено`
              : 'Добавьте первый контакт используя форму слева'
            }
          </p>
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => setSearchTerm('')}
            >
              Очистить поиск
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Статистика */}
          <div className="list-stats">
            <small className="text-muted">
              Показано {sortedContacts.length} из {contacts.length} контактов
              {searchTerm && ` по запросу "${searchTerm}"`}
            </small>
          </div>
          
          {/* Список контактов */}
          <div className="contacts-grid">
            {sortedContacts.map(contact => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
          
          {/* Подсказка */}
          <div className="list-hint">
            <p className="text-muted">
              <i className="bi bi-info-circle"></i> Нажмите на телефон или email чтобы позвонить/написать
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactList;