import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    @media (max-width: 360px) {
      height: 60px;
      width: 210px;
    }

    margin-bottom: 25px;
  }

  a {
    color: #ffffff;
    margin-top: 10px;
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`
export const Content = styled.div`
  padding: 25px;
  background: #f8f9fe;
  border-radius: 6px;

  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    color: #94a3b3;
    font-size: 1.2rem;
  }

  button {
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

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
