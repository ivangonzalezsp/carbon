import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Pod from './pod';
import Button from './../button';
import { shallow } from 'enzyme';

describe('Pod', () => {
  let instance;

  describe('componentWillMount', () => {
    describe('when collapsed is passed as a prop', () => {
      it('sets the collapsed state to the passed value', () => {
        instance = TestUtils.renderIntoDocument(<Pod collapsed={true} />);
        expect(instance.state.collapsed).toBeTruthy();
      });
    });

    describe('when collapsed is not passed as a prop', () => {
      it('sets the collapsed state is not defined', () => {
        instance = TestUtils.renderIntoDocument(<Pod/>);
        expect(instance.state.collapsed).toBeUndefined();
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(<Pod />);
    });

    describe('if not in hover state', () => {
      it('does not call toggleHoverState', () => {
        instance.setState({ hoverEdit: false });
        spyOn(instance, 'toggleHoverState');
        instance.componentWillReceiveProps();
        expect(instance.toggleHoverState).not.toHaveBeenCalled();
      });
    });

    describe('if in hover state', () => {
      it('calls toggleHoverState', () => {
        instance.setState({ hoverEdit: true });
        spyOn(instance, 'toggleHoverState');
        instance.componentWillReceiveProps();
        expect(instance.toggleHoverState).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('pod classes', () => {
    it('assigns custom classes and maintains its own classes', () => {
      instance = TestUtils.renderIntoDocument(<Pod className="custom" />);
      let div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod');
      expect(div.className).toEqual('carbon-pod custom carbon-pod--left');
    });
  });

  describe('podHeader', () => {
    describe('when title is not passed as a prop', () => {
      it('returns null', () => {
        instance = TestUtils.renderIntoDocument(<Pod/>);
        expect(instance.podHeader).toBeUndefined();
      });
    });

    describe('when subtitle is passed as a prop', () => {
      it('Adds a subtitle to the pod', () => {
        instance = TestUtils.renderIntoDocument(<Pod title='Title' subtitle="subtitle" />);
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
        expect(header.textContent).toEqual('subtitle');
      });
    });

    describe('when title is passed as a prop', () => {
      it('Adds a title to the pod', () => {
        instance = TestUtils.renderIntoDocument(<Pod title='Title'/>);
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h4');
        expect(header.textContent).toEqual('Title');
      });

      describe('when alignTitle prop is passed', () => {
        it('adds a align class', () => {
          instance = TestUtils.renderIntoDocument(<Pod title='Title' alignTitle='center' />);
          let header = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod__header');
          expect(header.className).toMatch('carbon-pod__header--center');
        });
      });

      describe('when pod is collapsible', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(<Pod title='Title' collapsed={true} />);
        });

        it('Adds a additional collaspsible arrow to the the header', () => {
          let arrow = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod__arrow');
          expect(arrow.className).toEqual('carbon-icon carbon-pod__arrow carbon-pod__arrow--true icon-dropdown');
        });

        it('Adds a additonal class header', () => {
          let header = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod__header');
          expect(header.className).toEqual('carbon-pod__header carbon-pod__header--left carbon-pod__header--true');
        });

        it('Adds a onClick handler to the header', () => {
          spyOn(instance, 'setState');
          let header = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod__header');
          TestUtils.Simulate.click(header);
          expect(instance.setState).toHaveBeenCalledWith({ collapsed: false });
        });
      });

      describe('when pod is NOT collapsible', () => {
        it('does not add additional collapsible arrow', () => {
          instance = TestUtils.renderIntoDocument(<Pod title='Title'/>);
          let arrows = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pod__arrow');
          expect(arrows.length).toEqual(0);
        });
      });
    });
  });

  describe('podDescription', () => {
    describe('when description is passed as a prop', () => {
      it('renders a description div', () => {
        instance = TestUtils.renderIntoDocument(
          <Pod title='Title' description='This is the pod description'/>
        );
        let description = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod__description');
        expect(description.textContent).toEqual('This is the pod description');
      });
    });

    describe('when description is not passed as a prop', () => {
      it('does not render a description', () => {
        instance = TestUtils.renderIntoDocument(<Pod/>);
        let description = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pod__description');
        expect(description.length).toEqual(0);
      });
    });
  });

  describe('mainClasses', () => {
    describe('if an onEdit prop is passed', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod onEdit={ () => {} } />);
        expect(instance.mainClasses).toEqual('carbon-pod carbon-pod--left carbon-pod--editable');
      });
    });
  });

  describe('blockClasses', () => {
    describe('if border is enabled and there is no footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.blockClasses).toEqual('carbon-pod__block carbon-pod__block--padding-medium carbon-pod__block--primary');
      });
    });

    describe('if editContentFullWidth is set to false', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod editContentFullWidth={ true } />);
        expect(instance.blockClasses).toEqual('carbon-pod__block carbon-pod__block--padding-medium carbon-pod__block--primary carbon-pod__block--full-width');
      });
    });

    describe('if border is disabled and there is a footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={<div />} />);
        expect(instance.blockClasses).toEqual('carbon-pod__block carbon-pod__block--padding-medium carbon-pod__block--primary carbon-pod__block--no-border carbon-pod__block--footer');
      });
    });
  });

  describe('editActionClasses', () => {
    describe('if border is disabled', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={<div />} />);
        expect(instance.editActionClasses).toEqual('carbon-pod__edit-action carbon-pod__edit-action--primary carbon-pod__edit-action--padding-medium carbon-pod__edit-action--no-border');
      });
    });

    describe('if displayEditButtonOnHover is enabled', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod displayEditButtonOnHover={true} footer={<div />} />);
        expect(instance.editActionClasses).toEqual('carbon-pod__edit-action carbon-pod__edit-action--primary carbon-pod__edit-action--padding-medium carbon-pod__display-on-hover');
      });
    });

    describe('if displayEditButtonOnHover is enabled', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod displayEditButtonOnHover={true} footer={<div />} />);
        expect(instance.editActionClasses).toEqual('carbon-pod__edit-action carbon-pod__edit-action--padding-medium carbon-pod__display-on-hover');
      });
    });
  });

  describe('contentClasses', () => {
    describe('if border is enabled and there is no footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.contentClasses).toEqual('carbon-pod__content carbon-pod__content--primary carbon-pod__content--padding-medium');
      });
    });

    describe('if border is disabled and there is a footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={<div />} />);
        expect(instance.contentClasses).toEqual('carbon-pod__content carbon-pod__content--primary carbon-pod__content--padding-medium carbon-pod__content--footer carbon-pod--no-border');
      });
    });
  });

  describe('footerClasses', () => {
    describe('if border is enabled and there is no footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.footerClasses).toEqual('carbon-pod__footer carbon-pod__footer--primary carbon-pod__footer--padding-medium');
      });
    });

    describe('if border is disabled and there is a footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod border={ false } />);
        expect(instance.footerClasses).toEqual('carbon-pod__footer carbon-pod__footer--primary carbon-pod__footer--padding-medium carbon-pod--no-border');
      });
    });
  });

  describe('footer', () => {
    describe('if there is no footer', () => {
      it('returns null', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.footer).toBe(null);
      });
    });

    describe('if there is a footer', () => {
      it('returns the footer', () => {
        instance = TestUtils.renderIntoDocument(<Pod footer={ <div /> } />);
        let footer = instance.footer;
        expect(footer.props.className).toEqual(instance.footerClasses);
      });
    });
  });

  describe('edit', () => {
    describe('if no prop is passed', () => {
      it('returns nothing', () => {
        expect(instance.edit).toBe(null);
      });
    });

    describe('if a string is passed', () => {
      it('returns a link with a href prop', () => {
        instance = TestUtils.renderIntoDocument(<Pod onEdit="foo" />);
        expect(instance.edit.props.to).toEqual('foo');
      });
    });

    describe('if a function is passed', () => {
      it('onClick and onKeyDown events are set to processPodEditEvent', () => {
        instance = TestUtils.renderIntoDocument(<Pod onEdit={ () => { } } />);
        expect(instance.edit.props.onClick).toEqual(instance.processPodEditEvent);
        expect(instance.edit.props.onKeyDown).toEqual(instance.processPodEditEvent);
      });
    });

    describe('if an object is passed', () => {
      it('returns a link with a object as props', () => {
        let foo = { foo: "foo", bar: "bar" };
        instance = TestUtils.renderIntoDocument(<Pod onEdit={ foo } />);
        expect(instance.edit.props.foo).toEqual("foo");
        expect(instance.edit.props.bar).toEqual("bar");
      });
    });
  });

  describe("processPodEditEvent()", () => {
    let editSpy;

    beforeEach(() => {
      editSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(<Pod onEdit={ editSpy } />);
    });
    it("doesn't trigger anything if the wrong key", () => {
      let ev = {
        which: 1,
        type: 'keydown',
        target: {
          dataset: {}
        },
        preventDefault: jasmine.createSpy()
      };
      instance.processPodEditEvent(ev);
      expect(ev.preventDefault).not.toHaveBeenCalled();
      expect(editSpy).not.toHaveBeenCalled();
    });
    it("prevents default and triggers on edit if correct key or not key", () => {
      let ev = {
        which: 13,
        type: 'keydown',
        target: {
          dataset: {}
        },
        preventDefault: jasmine.createSpy()
      };
      instance.processPodEditEvent(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(editSpy).toHaveBeenCalled();
    });
  });

  describe('toggleHoverState', () => {
    it('switches the hoverEdit state', () => {
      instance.setState({ hoverEdit: false });
      instance.toggleHoverState(true);
      expect(instance.state.hoverEdit).toBeTruthy();
    });
  });

  describe("podProps", () => {
    it("returns props without the title if the title is not a string", () => {
      let instance, result;

      instance = TestUtils.renderIntoDocument(<Pod title={ <Button>Foo</Button> } onEdit={ () => { } } />);
      result = instance.podProps();
      expect(result.title).toBeUndefined();
      expect(result.onEdit).not.toBeUndefined();
    });
  });

  describe("titleIsString", () => {
    it("returns false if title is not a string", () => {
      instance = TestUtils.renderIntoDocument(<Pod title={ undefined } />);
      expect(instance.titleIsString()).toEqual(false);
    });
    it("returns true if title is object", () => {
      instance = TestUtils.renderIntoDocument(<Pod title='testing' />);
      expect(instance.titleIsString()).toEqual(true);
    });
  });

  describe('render', () => {
    it('applies all props to the pod', () => {
      instance = TestUtils.renderIntoDocument(<Pod content="bar" />);
      let pod = TestUtils.findRenderedComponentWithType(instance, Pod);
      expect(pod.props.content).toEqual("bar");
    });

    describe('pod content', () => {
      describe('when pod is closed', () => {
        it('does not render the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod collapsed={true} ><Button>Button</Button> </Pod>
          );
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(0);
        });
      });

      describe('when pod is open', () => {
        it('renders the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod collapsed={false} ><Button>Button</Button> </Pod>
          );
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(1);
        });

        describe('when displayEditButtonOnHover is enabled', () => {
          describe('when onEdit has been set', () => {
            it('toggles the hover state when moving the mouse in to the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} onEdit='foo' />)
              wrapper.find('.carbon-pod__block').simulate('mouseEnter')
              expect(wrapper.state().hoverEdit).toBe(true);
            });

            it('toggles the hover state when moving the mouse out of the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} onEdit='foo' />)
              wrapper.find('.carbon-pod__block').simulate('mouseLeave')
              expect(wrapper.state().hoverEdit).toBe(false);
            });

            it('toggles the hover state when focusing on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} onEdit='foo' />)
              wrapper.find('.carbon-pod__block').simulate('focus')
              expect(wrapper.state().hoverEdit).toBe(true);
            });

            it('toggles the hover state when bluring on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} onEdit='foo' />)
              wrapper.find('.carbon-pod__block').simulate('blur')
              expect(wrapper.state().hoverEdit).toBe(false);
            });
          });

          describe('when onEdit has not been set', () => {
            it('does not toggle the hover state when moving the mouse in to the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} />)
              wrapper.find('.carbon-pod__block').simulate('mouseEnter')
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });

            it('does not toggle the hover state when moving the mouse out of the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} />)
              wrapper.find('.carbon-pod__block').simulate('mouseLeave')
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });

            it('does not toggle the hover state when focusing on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} />)
              wrapper.find('.carbon-pod__block').simulate('focus')
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });

            it('does not toggle the hover state when bluring on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover={true} />)
              wrapper.find('.carbon-pod__block').simulate('blur')
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });
          });
        });

        describe('when triggerEditOnContent is enabled', () => {
          describe('when onEdit has been set', () => {
            it('sets an onClick handler on the content block', () => {
              let editFunction = () => {}
              const wrapper = shallow(<Pod triggerEditOnContent={ true } onEdit={ () => {} } />)
              expect(wrapper.find('.carbon-pod__block').props().onClick).toBeDefined;
            });
          });

          describe('when onEdit has not been set', () => {
            it('does not set an onClick handler on the content block', () => {
              let editFunction = () => {}
              const wrapper = shallow(<Pod triggerEditOnContent={ true } />)
              expect(wrapper.find('.carbon-pod__block').props().onClick).not.toBeDefined;
            });
          });
        });
      });

      describe('when pod is not collapsible', () => {
        it('renders the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod><Button>Button</Button> </Pod>
          );
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(1);
        });
      });
    });

    it('renders all children passed to it', () => {
      instance = TestUtils.renderIntoDocument(
        <Pod>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </Pod>
      );

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
      expect(buttons.length).toEqual(3);
    });
  });
});
