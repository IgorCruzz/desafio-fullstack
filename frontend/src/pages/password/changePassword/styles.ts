import styled from 'styled-components'
import { darken } from 'polished'
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    @media (max-width: 360px) {
      height: 60px;
      width: 210px;
    }

    margin-bottom: 26px;
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

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #f8f9fe;
    border-radius: 6px;
    padding: 20px;

    p {
      color: #94a3b3;
      font-size: 1.2rem;
      margin: 10px 0;
      text-align: center;
    }

    #passwordInput {
      width: 100%;

      position: relative;
      margin-bottom: 24px;
      align-items: center;

      #type {
        margin: 0;
        background: none;
        color: #363636;
        top: 10px;
        right: 15px;
        position: absolute;
        padding: 0;
        width: 40px;
        box-shadow: none;
      }
      svg {
        top: 15px;
        left: 15px;
        position: absolute;
      }

      input {
        padding-left: 40px;
        border: 0;
        height: 44px;
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25),
          0px 1px 3px rgba(0, 0, 0, 0.02);
      }
    }

    #input {
      width: 100%;

      position: relative;
      margin-bottom: 24px;
      align-items: center;
      svg {
        top: 15px;
        left: 15px;
        position: absolute;
      }

      input {
        width: 100%;
        padding-left: 40px;
        border: 0;
        height: 44px;
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25),
          0px 1px 3px rgba(0, 0, 0, 0.02);
      }
    }

    button {
      margin-top: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
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
  }
`
