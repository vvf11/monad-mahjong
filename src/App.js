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
  width: 1000px;
  height: 800px;
  background-color: #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
  margin: 20px;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [score, setScore] = useState(0);

  const isBlockedByOthers = (tile, allTiles) => {
    // Проверяем, есть ли плитки над данной
    const hasUpperTile = allTiles.some(t => 
      t.z > tile.z && 
      Math.abs(t.x - tile.x) < 60 && 
      Math.abs(t.y - tile.y) < 80
    );

    // Проверяем, заблокирована ли плитка слева и справа
    const isBlockedSides = allTiles.some(t =>
      t.z === tile.z &&
      t.y === tile.y &&
      ((t.x === tile.x + 60) || (t.x === tile.x - 60))
    );

    return hasUpperTile || (isBlockedSides && tile.z === 0);
  };

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

    const layout = [];
    let index = 0;

    // Создаем базовый слой (8x8)
    const baseSize = 8;
    for (let y = 0; y < baseSize; y++) {
      for (let x = 0; x < baseSize; x++) {
        if (index < numbers.length) {
          layout.push({
            id: index,
            value: numbers[index],
            x: 100 + x * 60,
            y: 50 + y * 80,
            z: 0
          });
          index++;
        }
      }
    }

    // Добавляем второй слой (6x6)
    const secondLayerSize = 6;
    const secondLayerOffset = 1; // Смещение от края на 1 плитку
    for (let y = 0; y < secondLayerSize; y++) {
      for (let x = 0; x < secondLayerSize; x++) {
        if (index < numbers.length) {
          layout.push({
            id: index,
            value: numbers[index],
            x: 100 + (secondLayerOffset + x) * 60 + 15,
            y: 50 + (secondLayerOffset + y) * 80 + 15,
            z: 1
          });
          index++;
        }
      }
    }

    // Добавляем третий слой (4x4)
    const thirdLayerSize = 4;
    const thirdLayerOffset = 2; // Смещение от края на 2 плитки
    for (let y = 0; y < thirdLayerSize; y++) {
      for (let x = 0; x < thirdLayerSize; x++) {
        if (index < numbers.length) {
          layout.push({
            id: index,
            value: numbers[index],
            x: 100 + (thirdLayerOffset + x) * 60 + 30,
            y: 50 + (thirdLayerOffset + y) * 80 + 30,
            z: 2
          });
          index++;
        }
      }
    }

    // Добавляем верхний слой (2x2)
    const topLayerSize = 2;
    const topLayerOffset = 3; // Смещение от края на 3 плитки
    for (let y = 0; y < topLayerSize; y++) {
      for (let x = 0; x < topLayerSize; x++) {
        if (index < numbers.length) {
          layout.push({
            id: index,
            value: numbers[index],
            x: 100 + (topLayerOffset + x) * 60 + 45,
            y: 50 + (topLayerOffset + y) * 80 + 45,
            z: 3
          });
          index++;
        }
      }
    }

    return layout;
  };

  const handleStartGame = () => {
    setTiles(generateTiles());
    setGameStarted(true);
    setScore(0);
  };

  const handleTileClick = (tile) => {
    // Проверяем, не заблокирована ли плитка
    if (isBlockedByOthers(tile, tiles)) {
      return;
    }

    if (!selectedTile) {
      setSelectedTile(tile);
    } else {
      if (selectedTile.id !== tile.id) {
        if (selectedTile.value === tile.value && !isBlockedByOthers(selectedTile, tiles)) {
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
      <Title>Пасьянс Маджонг</Title>
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
                z={tile.z}
                isSelected={selectedTile?.id === tile.id}
                isBlocked={isBlockedByOthers(tile, tiles)}
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