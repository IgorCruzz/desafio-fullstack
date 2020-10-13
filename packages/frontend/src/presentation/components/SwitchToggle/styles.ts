import styled from 'styled-components'

export const Container = styled.div`
  height: 4vh;
  background: ${props => props.theme.colors.backgroundToggle};
  color: ${props => props.theme.colors.toggle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: absolute;
  margin-left: 20px;
  margin-top: 20px;
`;