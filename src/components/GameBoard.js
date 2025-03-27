import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tile from './Tile';

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const GameBoard = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    // Инициализация игрового поля
    const initialTiles = generateTiles();
    setTiles(initialTiles);
  }, []);

  const generateTiles = () => {
    const newTiles = [];
    // Генерация плиток (1-9)
    for (let i = 1; i <= 9; i++) {
      // Создаем по 4 плитки каждого значения
      for (let j = 0; j < 4; j++) {
        newTiles.push({
          id: `${i}-${j}`,
          value: i,
          position: {
            x: Math.random() * 700,
            y: Math.random() * 500,
            z: Math.floor(Math.random() * 100)
          }
        });
      }
    }
    return newTiles;
  };

  const handleTileClick = (tile) => {
    if (selectedTile === tile.id) {
      setSelectedTile(null);
    } else {
      setSelectedTile(tile.id);
    }
  };

  return (
    <BoardContainer>
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          value={tile.value}
          position={tile.position}
          onClick={() => handleTileClick(tile)}
          isSelected={selectedTile === tile.id}
        />
      ))}
    </BoardContainer>
  );
};

export default GameBoard; 