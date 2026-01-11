import React from 'react';
import './ContactItem.css';

const ContactItem = ({ contact, onEdit, onDelete }) => {
  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Проверка наличия данных
  const hasPhone = contact.phone && contact.phone.trim() !== '';
  const hasEmail = contact.email && contact.email.trim() !== '';
  const hasNote = contact.note && contact.note.trim() !== '';

  return (
    <div className="contact-item card">
      <div className="card-body">
        <div className="contact-header">
          <h3 className="contact-name">
            <span className="contact-icon">👤</span>
            {contact.name}
          </h3>
          
          <div className="contact-actions">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(contact)}
              title="Редактировать"
            >
              <i className="bi bi-pencil"></i> Изменить
            </button>
            
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(contact.id)}
              title="Удалить"
            >
              <i className="bi bi-trash"></i> Удалить
            </button>
          </div>
        </div>
        
        <div className="contact-details">
          {hasPhone && (
            <div className="contact-field">
              <span className="field-icon">📱</span>
              <span className="field-label">Телефон:</span>
              <a href={`tel:${contact.phone}`} className="field-value">
                {contact.phone}
              </a>
            </div>
          )}
          
          {hasEmail && (
            <div className="contact-field">
              <span className="field-icon">✉️</span>
              <span className="field-label">Email:</span>
              <a href={`mailto:${contact.email}`} className="field-value">
                {contact.email}
              </a>
            </div>
          )}
          
          {hasNote && (
            <div className="contact-field">
              <span className="field-icon">📝</span>
              <span className="field-label">Заметка:</span>
              <span className="field-value note">{contact.note}</span>
            </div>
          )}
        </div>
        
        <div className="contact-footer">
          <div className="timestamps">
            <small className="text-muted">
              <i className="bi bi-calendar-plus"></i> Создан: {formatDate(contact.createdAt)}
            </small>
            <small className="text-muted">
              <i className="bi bi-calendar-check"></i> Обновлен: {formatDate(contact.updatedAt)}
            </small>
          </div>
          
          <div className="contact-id">
            <span className="badge bg-secondary">ID: {contact.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;