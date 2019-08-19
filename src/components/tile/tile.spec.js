import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';
import { css } from 'styled-components';
import Tile from '.';
import { TileContent } from './tile.style';
import Content from '../content';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

function render(props, renderer = TestRenderer.create) {
  return renderer(
    <Tile { ...props }>
      <Content key='one'>Child 1</Content>
      <Content>Child 2</Content>
    </Tile>
  );
}

describe('Tile', () => {
  it('renders base styles', () => {
    const wrapper = render({});

    expect(wrapper).toMatchSnapshot();
  });

  describe('wrapping of children in TileContent components', () => {
    const wrapper = render({}, mount);
    const tileContents = wrapper.find(TileContent).getElements();

    it('contains one TileContent for each child', () => {
      expect(tileContents.length).toBe(2);
    });

    it.each([0, 1])('TileContent[%i] contains the passed Content as its own child', (childIndex) => {
      expect(tileContents[childIndex].props.children.type.name).toBe('Content');
      expect(tileContents[childIndex].props.children.props.children).toBe(`Child ${childIndex + 1}`);
    });
  });

  describe('styles', () => {
    describe('as', () => {
      it('renders a white background when as === "tile"', () => {
        const wrapper = render({ as: 'tile' }).toJSON();

        assertStyleMatch({ backgroundColor: '#FFFFFF' }, wrapper);
      });

      it('renders a transparent background when as === "transparent"', () => {
        const wrapper = render({ as: 'transparent' }).toJSON();

        assertStyleMatch({ backgroundColor: 'transparent' }, wrapper);
      });
    });

    describe('orientation', () => {
      describe('when it is horizontal', () => {
        const wrapper = render({ orientation: 'horizontal' }).toJSON();

        it('sets the correct flex-direction on the main wrapper', () => {
          assertStyleMatch({ flexDirection: 'row' }, wrapper);
        });

        it('sets the TileContent display to inline', () => {
          assertStyleMatch({ display: 'inline' }, wrapper, { modifier: css`${TileContent}` });
        });

        it('sets padding-right for all but the last TileContent', () => {
          assertStyleMatch(
            {
              paddingRight: '16px'
            },
            wrapper,
            { modifier: css`${`${TileContent}:not(:last-of-type)`}` }
          );
        });

        it('sets border-left and padding-left for all but the first TileComponent', () => {
          assertStyleMatch(
            {
              borderLeft: 'solid 1px #E5EAEC',
              paddingLeft: '16px'
            },
            wrapper, { modifier: css`${`${TileContent} + ${TileContent}`}` }
          );
        });
      });

      describe('when it is vertical', () => {
        const wrapper = render({ orientation: 'vertical' }).toJSON();

        it('sets the correct flex-direction on the main wrapper', () => {
          assertStyleMatch({ flexDirection: 'column' }, wrapper);
        });

        it('sets the TileContent width to auto', () => {
          assertStyleMatch({ width: 'auto' }, wrapper, { modifier: css`${TileContent}` });
        });

        it('sets padding-bottom for all but the last TileContent', () => {
          assertStyleMatch(
            { paddingBottom: '16px' },
            wrapper,
            { modifier: css`${`${TileContent}:not(:last-of-type)`}` }
          );
        });

        it('sets border-top and padding-top, and width: auto for all but the first TileComponent', () => {
          assertStyleMatch(
            {
              borderTop: 'solid 1px #E5EAEC',
              paddingTop: '16px'
            },
            wrapper, { modifier: css`${`${TileContent} + ${TileContent}`}` }
          );
        });
      });

      describe('width', () => {
        it('sets width to 100% when width prop is undefined', () => {
          const wrapper = render().toJSON();

          assertStyleMatch({ width: '100%' }, wrapper);
        });

        it('sets width to 100% when width prop is 0', () => {
          const wrapper = render({ width: 0 }).toJSON();

          assertStyleMatch({ width: '100%' }, wrapper);
        });

        it('sets width to the passed percentage value when width prop is non-zero', () => {
          const wrapper = render({ width: 25 }).toJSON();

          assertStyleMatch({ width: '25%' }, wrapper);
        });
      });

      describe('padding', () => {
        const paddingSizes = [
          ['extra-small', '8px'],
          ['small', '12px'],
          ['medium', '16px'],
          ['large', '32px'],
          ['extra-large', '40px']
        ];

        it.each(paddingSizes)('when %s, padding is set to %s', (option, value) => {
          const wrapper = render({ padding: option }).toJSON();

          assertStyleMatch({ padding: value }, wrapper);
        });
      });
    });
  });

  describe('TileContent', () => {
    describe('styles', () => {
      function renderTileContent(props) {
        return TestRenderer.create(<TileContent { ...props }>Test</TileContent>).toJSON();
      }

      it('has the correct base styles', () => {
        const wrapper = renderTileContent();

        assertStyleMatch(
          {
            position: 'relative',
            flexGrow: '1',
            width: undefined
          },
          wrapper
        );
      });

      describe('width', () => {
        it('sets width to the passed percentage value and flex-grow to 0 when width prop is non-zero', () => {
          const wrapper = renderTileContent({ width: 25 });

          assertStyleMatch({ flexGrow: '0', width: '25%' }, wrapper);
        });
      });
    });
  });
});
