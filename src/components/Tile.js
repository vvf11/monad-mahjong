import React from 'react';
import styled from 'styled-components';

const TileContainer = styled.div`
  width: 60px;
  height: 80px;
  background: linear-gradient(135deg, #f0f0f0 0%, #ffffff 50%, #e0e0e0 100%);
  border-radius: 4px;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  cursor: ${props => props.isBlocked ? 'not-allowed' : 'pointer'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: "Noto Sans SC", sans-serif;
  color: ${props => props.isSelected ? '#ff4444' : '#333333'};
  box-shadow: 
    ${props => props.isSelected 
      ? '0 0 10px rgba(255, 68, 68, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.2)' 
      : '2px 2px 4px rgba(0, 0, 0, 0.2)'};
  transition: all 0.3s ease;
  user-select: none;
  transform: 
    ${props => `translateZ(${props.z * 20}px) 
    ${props.isSelected ? 'scale(1.05)' : 'scale(1)'}
    ${props.isBlocked ? 'translateY(0)' : ''}`};
  opacity: ${props => props.isBlocked ? 0.6 : 1};
  border: 1px solid #ccc;
  transform-style: preserve-3d;
  backface-visibility: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border: 1px solid #ddd;
    border-radius: 2px;
    pointer-events: none;
    transform: translateZ(1px);
  }

  &:hover {
    ${props => !props.isBlocked && `
      transform: translateZ(${props.z * 20}px) translateY(-2px) scale(1.02);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    `}
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.isBlocked ? 'rgba(0, 0, 0, 0.2)' : 'none'};
    border-radius: 4px;
    pointer-events: none;
    transform: translateZ(2px);
  }
`;

const TileValue = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  
  &:before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 1px solid #e8e8e8;
    border-radius: 2px;
    opacity: 0.5;
    transform: translateZ(1px);
  }
`;

const Tile = ({ value, x, y, z, isSelected, isBlocked, onClick }) => {
  return (
    <TileContainer
      className="tile-container"
      x={x}
      y={y}
      z={z}
      isSelected={isSelected}
      isBlocked={isBlocked}
      onClick={onClick}
    >
      <TileValue>{value}</TileValue>
    </TileContainer>
  );
};

export default Tile; 