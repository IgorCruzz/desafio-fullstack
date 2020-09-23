import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  width: 100%;
  background: #8fbc8f;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(125, 213, 111, 0.4);
`
export const Content = styled.div`
  width: 100%;
  max-width: 1400px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    height: 60px;
    width: 210px;
  }

  button {
    @media (max-width: 370px) {
      width: 70px;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    width: 160px;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: 0.01em;
    background: #7dd56f;
    box-shadow: 0px 4px 10px rgba(125, 213, 111, 0.4);
    border-radius: 4px;
    border: 0;
    padding: 10px 24px;

    svg {
      margin-right: 12px;
    }

    &:hover {
      background: ${darken(0.1, '#7dd56f')};
    }
  }
`
