import React from 'react';
import styled from 'styled-components';
import GameBoard from './components/GameBoard';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  color: white;
`;

const GameBoardContainer = styled.div`
  width: 800px;
  height: 600px;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-top: 20px;
  color: #ffffff;
`;

function App() {
  return (
    <AppContainer>
      <Title>Monad Mahjong</Title>
      <GameBoardContainer>
        <GameBoard />
      </GameBoardContainer>
    </AppContainer>
  );
}

export default App; 