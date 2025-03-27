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
  perspective: 1000px;
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
    
    // Создаем пирамиду из 5 уровней
    for (let z = 0; z < 5; z++) {
      const layerSize = 6 - z; // Каждый следующий уровень меньше
      for (let y = 0; y < layerSize; y++) {
        for (let x = 0; x < layerSize; x++) {
          if (index < numbers.length) {
            layout.push({
              id: index,
              value: numbers[index],
              x: 200 + x * 60 + z * 15, // Смещаем каждый уровень немного вправо
              y: 100 + y * 80 + z * 15, // и вниз для эффекта 3D
              z: z
            });
            index++;
          }
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