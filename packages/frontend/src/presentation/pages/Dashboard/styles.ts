import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div``

export const Header = styled.header`
  padding: 20px 0;
  height: 80px;
  background: #28262e;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  /* > img {
    height: 80px;
  } */

  button {
    margin-left: auto;
    background: none;
    border: none;

    svg {
      color: #7159c1;
    }
  }
`

export const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 710px;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
      font-size: 15px;
    }

    a {
      text-decoration: none;
      color: #7159c1;
      font-size: 15px;

      transition: opacity 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`