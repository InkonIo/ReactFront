import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login || !password) return setError("Введите логин и пароль");

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Ошибка авторизации");
        return;
      }

      // Успешный вход
      const data = await response.json();
      console.log('Успешный вход, данные:', data);

      // Здесь можно, например, сохранить токен, если он приходит
      // localStorage.setItem('token', data.token);

      // Перенаправить пользователя куда нужно
      navigate('/dashboard');  // например, на главную страницу после входа

    } catch (err) {
      setError("Ошибка сети или сервера");
    }
  };

  return (
    <div>
      <h2>Вход в систему</h2>

      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Логин"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />

      <button onClick={handleLogin}>Войти</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
