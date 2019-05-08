import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';
import baseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';

const StyledTableRow = styled.tr`
  ${addCommonStyling}
`;

function isClassic(theme) {
  return theme.name === THEMES.classic || !theme;
}

function addCommonStyling(props) {
  const { theme, highlighted } = props;
  return css`
    border-color: #E7F1FC;
    &:hover .common-input__input {
      border-color: #E7F1FC;
    }

    &:nth-child(2n+1) {
      ${StyledTableCell} {
        background-color: #ffffff;
      }
    }

    .custom-drag-layer {
      & {
        background-color: #002E41;
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
        display: block;
      }

      ${StyledTableCell} {
        background-color: #002E41;
      }

      .configurable-item-row__content-wrapper {
        visibility: visible;
      }
    }

    &:first-child ${StyledTableHeader} {
      &:first-child {
        border-radius: 0px 0 0 0;
      }

      &:last-child {
        border-radius: 0 0px 0 0;
      }
    }

    &:hover {
      ${StyledTableCell} {
        background-color: #E7F1FC;
      }
    }

    ${props.onClick && `
      cursor: pointer;
    `}

    ${!isClassic(theme) && applyModernStyling}
    ${selectedRowStyling}
    ${highlighted && highlightRowStyling}
    ${dragRowStyling}
  `;
}

function applyModernStyling({ theme }) {
  const { colors, table } = theme;
  return !isClassic(theme) && `
      ${StyledTableCell} {
        padding-top: 0px;
        padding-bottom: 0px;
        background-color: ${colors.white};
      }
      &:hover {
        ${StyledTableCell} {
          background-color: ${table.primary};
        }
      }
    }
  `;
}

function selectedRowStyling ({ theme, selectable, selected }) {
  if (!selectable) {
    return css`
      ${StyledTableCell}:first-child,
      ${StyledTableHeader}:first-child {
        padding-left: 15px;
      }
    `;
  }

  const { table, colors } = theme;

  return css`
    ${selectable && `
      ${StyledTableCell}:first-child,
      ${StyledTableHeader}:first-child {
        text-align: center;
        width: 18px;
      
        .carbon-checkbox {
          height: 15px;
          padding-top: 0;
        }
      }
    `}

    ${selected && `
      &:nth-child(n), &:hover {
        && ${StyledTableCell} {
          background-color: ${isClassic(theme) ? '#1573E6' : table.selected};
          border-bottom-color: ${isClassic(theme) ? '#255BC7' : table.selected};
          color: ${isClassic(theme) ? colors.white : ''};
          position: relative;
      
          &:before {
            background-color: #255BC7;
            ${cellHoverStyling}
          }
        }
      }
    `}
  `;
}

function highlightRowStyling({ theme }) {
  const { table } = theme;
  return css`
    && ${StyledTableCell} {
      background-color: ${isClassic(theme) ? '#D0E3FA' : table.selected};
      border-bottom-color: ${isClassic(theme) ? '#1573E6' : table.selected};
      position: relative;

      &:before {
        background-color: #1573E6;
        ${cellHoverStyling}
      }
    }
    &:hover {
      ${StyledTableCell} {
        background-color: ${isClassic(theme) ? '#D0E3FA' : table.selected};
      }
    }
  `;
}

function cellHoverStyling() {
  return `
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    top: -1px;
    width: 100%;
  `;
}


function dragRowStyling ({ dragging, dragged }) {
  return css`
    ${dragging && `
      user-select: none;
    `}

    ${dragged && `
      ${StyledTableCell} {
        visibility: hidden;
      }

      + ${dragging && `
        ${StyledTableCell} {
          border-top: 1px solid #000A0E;
        }
      `}
    `}

    .draggable-table-cell__icon {
      cursor: move;
      padding: 8.5px 14px;
    
      ${dragging && dragged && `
        &,
        .custom-drag-layer & {
          cursor: grabbing;
          cursor: -moz-grabbing;
          cursor: -webkit-grabbing;
        }
      `}
  `;
}

StyledTableRow.propTypes = {

  /**
   * Enables multi-selectable table rows.
   */
  selectable: PropTypes.bool,

  /**
   * Enables highlightable table rows.
   */
  highlightable: PropTypes.bool,

  /**
   * Allows developers to manually control selected state for the row.
   */
  selected: PropTypes.bool,

  /**
   * Allows developers to manually control highlighted state for the row.
   */
  highlighted: PropTypes.bool,

  dragged: PropTypes.bool,

  dragging: PropTypes.func
};

StyledTableRow.defaultProps = {
  theme: baseTheme
};

export default StyledTableRow;
