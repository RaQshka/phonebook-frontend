import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = ({ onSubmit, initialData, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    note: ''
  });
  
  const [errors, setErrors] = useState({});

  // Заполняем форму при редактировании
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        note: initialData.note || ''
      });
    }
  }, [initialData]);

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Имя не должно превышать 100 символов';
    }
    
    if (formData.phone && formData.phone.length > 20) {
      newErrors.phone = 'Телефон не должен превышать 20 символов';
    }
    
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Введите корректный email';
      } else if (formData.email.length > 100) {
        newErrors.email = 'Email не должен превышать 100 символов';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      if (!isEditing) {
        setFormData({
          name: '',
          phone: '',
          email: '',
          note: ''
        });
      }
    }
  };

  // Обработка отмены
  const handleCancel = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      note: ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-title">
        {isEditing ? '✏️ Редактировать контакт' : '➕ Добавить новый контакт'}
      </h2>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Имя <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Введите имя"
            maxLength={100}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="+7 (999) 123-45-67"
            maxLength={20}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="example@mail.com"
            maxLength={100}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="note" className="form-label">
            Заметка
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="form-control"
            placeholder="Дополнительная информация..."
            rows="3"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Обновить' : 'Добавить'}
          </button>
          
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Отмена
            </button>
          )}
          
          {!isEditing && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setFormData({
                name: '',
                phone: '',
                email: '',
                note: ''
              })}
            >
              Очистить
            </button>
          )}
        </div>
      </form>
      
      <div className="form-hint">
        <p><span className="required">*</span> - обязательное поле</p>
      </div>
    </div>
  );
};

export default ContactForm;