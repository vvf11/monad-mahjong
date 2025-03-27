import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 60px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 4px;
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #000000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  &.selected {
    background-color: #e0e0e0;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const Tile = ({ value, position, onClick, isSelected }) => {
  return (
    <TileContainer
      style={{
        left: position.x,
        top: position.y,
        zIndex: position.z
      }}
      className={isSelected ? 'selected' : ''}
      onClick={onClick}
    >
      {value}
    </TileContainer>
  );
};

export default Tile; 