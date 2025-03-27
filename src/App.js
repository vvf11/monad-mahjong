import React, { useState } from 'react';
import styled from 'styled-components';
import Tile from './components/Tile';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const GameBoard = styled.div`
  width: 800px;
  height: 600px;
  background-color: #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  color: #ffffff;
`;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [score, setScore] = useState(0);

  const generateTiles = () => {
    const numbers = [];
    // Создаем пары чисел от 1 до 9
    for (let i = 1; i <= 9; i++) {
      for (let j = 0; j < 4; j++) {
        numbers.push(i);
      }
    }
    
    // Перемешиваем числа
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Создаем плитки с позициями
    return numbers.map((number, index) => ({
      id: index,
      value: number,
      x: 100 + (index % 8) * 80,
      y: 100 + Math.floor(index / 8) * 100
    }));
  };

  const handleStartGame = () => {
    setTiles(generateTiles());
    setGameStarted(true);
    setScore(0);
  };

  const handleTileClick = (tile) => {
    if (!selectedTile) {
      setSelectedTile(tile);
    } else {
      if (selectedTile.id !== tile.id) {
        if (selectedTile.value === tile.value) {
          // Убираем совпавшие плитки
          setTiles(tiles.filter(t => t.id !== tile.id && t.id !== selectedTile.id));
          setScore(score + 10);
        }
        setSelectedTile(null);
      }
    }
  };

  return (
    <AppContainer>
      <Title>Monad Mahjong</Title>
      <GameBoard>
        {!gameStarted ? (
          <StartButton onClick={handleStartGame}>Начать игру</StartButton>
        ) : (
          <>
            <ScoreDisplay>Очки: {score}</ScoreDisplay>
            {tiles.map(tile => (
              <Tile
                key={tile.id}
                value={tile.value}
                x={tile.x}
                y={tile.y}
                isSelected={selectedTile?.id === tile.id}
                onClick={() => handleTileClick(tile)}
              />
            ))}
          </>
        )}
      </GameBoard>
    </AppContainer>
  );
}

export default App; 