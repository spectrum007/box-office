import styled from 'styled-components';

export const TitleWrapper = styled.div`
  text-align: center;
  margin: 0 0 40px;

  h1 {
    letter-spacing: 10px;
    text-transform: uppercase;
    margin: 0 0 10px;
    color: ${({ theme }) => theme.mainColors.blue};
    &.shows {
      color: ${({ theme }) => theme.mainColors.red};
    }
  }

  p {
    color: ${({ theme }) => theme.mainColors.dark};
    margin: 0;
  }
`;
