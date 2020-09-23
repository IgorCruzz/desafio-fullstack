import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  @media (max-width: 600px) {
    width: 100%;
    padding: 15px;
  }
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    @media (max-width: 360px) {
      height: 60px;
      width: 210px;
    }

    margin-bottom: 26px;
  }

  form {
    @media (max-width: 600px) {
      width: 90%;
    }

    @media (max-width: 360px) {
      padding: 5px;
      width: 100%;
    }

    a {
      margin-left: 2px;
      color: #191970;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    padding: 45px;
    width: 100%;
    background: #f8f9fe;
    border-radius: 6px;
    display: flex;
    align-items: center;
    flex-direction: column;

    strong {
      color: #94a3b3;
      font-size: 1.6rem;
      margin-bottom: 30px;
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

    p {
      color: #94a3b3;
      font-size: 1.2rem;
    }

    button {
      margin-top: 18px;
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
  }
`
export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 20px;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
