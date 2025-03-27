import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 60px;
  height: 80px;
  background-color: ${props => props.isSelected ? '#6d9eeb' : '#ffffff'};
  border-radius: 8px;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${props => props.isSelected ? '#ffffff' : '#000000'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  user-select: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const Tile = ({ value, x, y, isSelected, onClick }) => {
  return (
    <TileContainer
      x={x}
      y={y}
      isSelected={isSelected}
      onClick={onClick}
    >
      {value}
    </TileContainer>
  );
};

export default Tile; 