import { useState, useEffect } from "react";

const [totalSeconds, setTotalSeconds] = useState(60);
import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState(60);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      setIsActive(false);
      // Звуковой сигнал (опционально)
      // new Audio('/beep.mp3').play();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, totalSeconds]);

  const startTimer = () => {
    if (totalSeconds > 0) {
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTotalSeconds(inputValue);
  };

  const setCustomTime = () => {
    let value = parseInt(inputValue);
    if (isNaN(value) || value <= 0) {
      value = 60;
      setInputValue(60);
    }
    if (value > 7200) value = 7200; // максимум 2 часа
    setIsActive(false);
    setTotalSeconds(value);
    setInputValue(value);
  };

  const formatTime = (sec) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getProgressPercent = () => {
    const maxTime = inputValue > 0 ? inputValue : 60;
    return (totalSeconds / maxTime) * 100;
  };

  // Быстрые настройки времени
  const setQuickTime = (seconds) => {
    setInputValue(seconds);
    setIsActive(false);
    setTotalSeconds(seconds);
  };

  return (
    <div className="timer-container">
      <div className="timer-card">
        <div className="timer-icon">⏱️</div>
        <h1 className="timer-title">Таймер обратного отсчета</h1>

        {/* Прогресс-бар */}
        <div className="progress-section">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${getProgressPercent()}%` }}
            ></div>
          </div>
          <div className="progress-label">
            {Math.floor((totalSeconds / inputValue) * 100)}%
          </div>
        </div>

        {/* Отображение времени */}
        <div className="time-display">{formatTime(totalSeconds)}</div>

        {/* Статус */}
        <div className="timer-status">
          {totalSeconds === 0 ? (
            <span className="status-complete">🎉 ВРЕМЯ ВЫШЛО! 🎉</span>
          ) : isActive ? (
            <span className="status-running">▶️ ИДЕТ ОТСЧЕТ...</span>
          ) : (
            <span className="status-paused">⏸ НА ПАУЗЕ</span>
          )}
        </div>

        {/* Главные кнопки */}
        <div className="button-group">
          {!isActive && totalSeconds > 0 && totalSeconds !== 0 && (
            <button className="btn btn-start" onClick={startTimer}>
              ▶ СТАРТ
            </button>
          )}
          {isActive && totalSeconds > 0 && (
            <button className="btn btn-pause" onClick={pauseTimer}>
              ⏸ ПАУЗА
            </button>
          )}
          <button className="btn btn-reset" onClick={resetTimer}>
            🔄 СБРОС
          </button>
        </div>

        {/* Быстрый выбор времени */}
        <div className="quick-section">
          <p className="section-title">⚡ БЫСТРЫЙ ВЫБОР</p>
          <div className="quick-buttons">
            <button className="quick-btn" onClick={() => setQuickTime(10)}>
              10 сек
            </button>
            <button className="quick-btn" onClick={() => setQuickTime(30)}>
              30 сек
            </button>
            <button className="quick-btn" onClick={() => setQuickTime(60)}>
              1 мин
            </button>
            <button className="quick-btn" onClick={() => setQuickTime(180)}>
              3 мин
            </button>
            <button className="quick-btn" onClick={() => setQuickTime(300)}>
              5 мин
            </button>
            <button className="quick-btn" onClick={() => setQuickTime(600)}>
              10 мин
            </button>
            <button className="quick-btn" onClick={() => setQuickTime(900)}>
              15 мин
            </button>
            <button className="quick-btn" onClick={() => setQuickTime(1800)}>
              30 мин
            </button>
          </div>
        </div>

        {/* Ручная настройка */}
        <div className="custom-section">
          <p className="section-title">🎯 СВОЕ ВРЕМЯ</p>
          <div className="custom-control">
            <input
              type="number"
              className="time-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите секунды"
              min="1"
              max="7200"
            />
            <button className="btn-set" onClick={setCustomTime}>
              Установить
            </button>
          </div>
          <p className="hint">
            * можно ввести любое количество секунд (до 2 часов)
          </p>
        </div>

        {/* Большие кнопки времени */}
        <div className="big-time-section">
          <p className="section-title">📊 ПОПУЛЯРНОЕ</p>
          <div className="big-buttons">
            <button className="big-time-btn" onClick={() => setQuickTime(60)}>
              <span className="big-time">01:00</span>
              <span className="big-label">1 минута</span>
            </button>
            <button className="big-time-btn" onClick={() => setQuickTime(300)}>
              <span className="big-time">05:00</span>
              <span className="big-label">5 минут</span>
            </button>
            <button className="big-time-btn" onClick={() => setQuickTime(600)}>
              <span className="big-time">10:00</span>
              <span className="big-label">10 минут</span>
            </button>
          </div>
        </div>

        {/* Анимация при завершении */}
        {totalSeconds === 0 && (
          <div className="completion-animation">⏰⏰⏰</div>
        )}
      </div>
    </div>
  );
}

export default App;
