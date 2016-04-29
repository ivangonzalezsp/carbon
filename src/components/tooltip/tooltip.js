import React from 'react';
import classNames from 'classnames';

/**
* A Tooltip widget.
*
* == How to use a Tooltip in a component:
*
* In your file:
*
*   import Tooltip from 'carbon/lib/components/tooltip'
*
* To render the Tooltip:
*
*   <Tooltip isVisible={ toggleTooltipHandler }>
*     My tooltip content
*   </Tooltip>
*
* You must pass a prop of 'isVisible' which is toggled to true or false.
*
* You can pass a prop of 'align' to the component which shifts the alignment of the pointer.
* This defaults to 'center'.
* You can also pass a prop of 'position' to the component which shifts the position of the pointer.
* This defaults to 'bottom'
*
* @class Tooltip
* @constructor
*/
class Tooltip extends React.Component {

  static propTypes = {
    /**
     * Sets alignment of pointer on tooltip
     *
     * Options: top, bottom, center, right, left
     *
     * @property align
     * @type {String}
     * @default 'center'
     */
    align: React.PropTypes.string,

    /**
     * Sets position of the tooltip
     *
     *
     * Options: top, bottom, right, left
     *
     * @property position
     * @type {String}
     * @default 'bottom'
     */
    position: React.PropTypes.string,

    /**
     * Whether to to show the Tooltip
     *
     * @property isVisible
     * @type {Boolean}
     * @default false
     */
    isVisible: React.PropTypes.bool
  };

  static defaultProps = {
    align: 'center',
    position: 'top',
    isVisible: false
  };

  /**
   * Main classes
   *
   * @method mainClasses
   * @return {String} classNames for tooltip
   */
  get mainClasses() {
    return classNames(
      'ui-tooltip',
      `ui-tooltip--position-${this.props.position}`,
      `ui-tooltip--pointer-align-${this.props.align}`,
      this.props.className
    );
  }

  /**
   * Return HTML for tooltip
   *
   * @method tooltipHTML
   * @return {JSX}
   */
  get tooltipHTML() {
    let contents = [
      this.props.children,
      <span key='pointer' className='ui-tooltip__pointer'></span>
    ];

    return (
      <div className={ this.mainClasses }>
        <div className="ui-tooltip__container">
          { contents }
        </div>
      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    if (!this.props.isVisible) { return null; }

    return this.tooltipHTML;
  }
}

export default Tooltip;
