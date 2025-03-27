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
  cursor: ${props => props.isBlocked ? 'not-allowed' : 'pointer'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${props => props.isSelected ? '#ffffff' : '#000000'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  user-select: none;
  transform: ${props => `translateZ(${props.z * 20}px)`};
  opacity: ${props => props.isBlocked ? 0.6 : 1};

  &:hover {
    transform: ${props => !props.isBlocked && `translateZ(${props.z * 20}px) translateY(-2px)`};
    box-shadow: ${props => !props.isBlocked && '0 6px 12px rgba(0, 0, 0, 0.3)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.isBlocked ? 'rgba(0, 0, 0, 0.2)' : 'none'};
    border-radius: 8px;
    pointer-events: ${props => props.isBlocked ? 'none' : 'auto'};
  }
`;

const Tile = ({ value, x, y, z, isSelected, isBlocked, onClick }) => {
  return (
    <TileContainer
      x={x}
      y={y}
      z={z}
      isSelected={isSelected}
      isBlocked={isBlocked}
      onClick={onClick}
    >
      {value}
    </TileContainer>
  );
};

export default Tile; 