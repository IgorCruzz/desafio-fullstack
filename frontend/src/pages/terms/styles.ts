import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: #ffffff;
  }

  a {
    text-decoration: none;
    color: #ffffff;
    display: flex;
    align-items: center;
    &:hover {
      text-decoration: underline;
    }
    svg {
      margin-right: 10px;
    }
  }
`
export const Content = styled.div`
  @media (max-width: 800px) {
    width: 90%;
  }

  width: 50%;
  background: #ffffff;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;

  p {
    color: #94a3b3;
    font-size: 1.2rem;
  }
`
