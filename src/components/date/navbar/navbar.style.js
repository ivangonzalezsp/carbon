import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';
import Navbar from './navbar';

const StyledNavbar = styled(Navbar)`
&.DayPicker-NavBar {
  display: flexbox;
  justify-content: space-between;
  padding: 0;
  top: 0;
  height: 40px;
}
`;

StyledNavbar.defaultProps = {
  theme: baseTheme
};

export default StyledNavbar;
