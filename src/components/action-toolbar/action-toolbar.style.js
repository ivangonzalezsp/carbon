import styled, { css } from 'styled-components';
import { LinkStyleAnchor } from '../link/link.style';
import { StyledSvgIconWrapper } from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

const StyledActionToolbar = styled.div`
  display: inline-block;
  padding: 15px 0;
`;

const StyledActionToolbarTotal = styled.div`
  display: inline-block;
  margin-right: 10px;
  min-width: auto;
  text-align: left;
`;

const StyledActionToolbarActions = styled.div`
  display: inline-flex;
  margin: 0 10px;

  ${LinkStyleAnchor} {
    text-decoration: none;
  }

  .carbon-link__icon {
    margin-right: 0;

    ${StyledSvgIconWrapper} {
      position: relative;
      bottom: 1px;
    }
  }

  .carbon-link__content {
    margin-left: 5px;
  }

  & > * {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  ${({ theme, disabled }) => isClassic(theme)
    && disabled
    && css`
      ${LinkStyleAnchor} {
        color: #b3c2c8;
      }
    `}
`;

export { StyledActionToolbar, StyledActionToolbarTotal, StyledActionToolbarActions };
