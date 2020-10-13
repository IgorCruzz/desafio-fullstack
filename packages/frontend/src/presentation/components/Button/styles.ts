import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isLoading: number;
}

export const Container = styled.button<ContainerProps>`
  background: #023e8a;
  height: 40px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: ${props => props.theme.colors.insideButton};
  width: 100%;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.2s ease 0s, transform 0.2s ease 0s;

  &:hover {
    background: ${shade(0.2, '#023e8a')};
    /* transform: translate3d(21px, -31px, -67.5px); */
  }

  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
`;
