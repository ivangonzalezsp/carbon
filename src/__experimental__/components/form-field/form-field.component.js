import React from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle from './form-field.style';
import Label from '../label';
import FieldHelp from '../field-help';
import OptionsHelper from '../../../utils/helpers/options-helper';

const FormField = ({
  children,
  disabled,
  fieldHelp,
  fieldHelpInline,
  hasError,
  hasWarning,
  hasInfo,
  helpId,
  helpTag,
  helpTabIndex,
  label,
  labelId,
  labelAlign,
  labelHelp,
  labelHelpIcon,
  labelInline,
  labelWidth,
  name,
  reverse,
  size,
  childOfForm,
  isOptional,
  readOnly,
  tooltipMessage,
  useValidationIcon
}) => (
  <FormFieldStyle inline={ labelInline }>
    {reverse && children}

    {label && (
      <Label
        labelId={ labelId }
        align={ labelAlign }
        disabled={ disabled }
        readOnly={ readOnly }
        hasError={ hasError }
        hasWarning={ hasWarning }
        hasInfo={ hasInfo }
        help={ labelHelp }
        helpId={ helpId }
        helpTag={ helpTag }
        helpTabIndex={ helpTabIndex }
        htmlFor={ name }
        helpIcon={ labelHelpIcon }
        inline={ labelInline }
        inputSize={ size }
        width={ labelWidth }
        childOfForm={ childOfForm }
        optional={ isOptional }
        tooltipMessage={ tooltipMessage }
        useValidationIcon={ useValidationIcon }
      >
        {label}
      </Label>
    )}

    {fieldHelp && fieldHelpInline && (
      <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
        {fieldHelp}
      </FieldHelp>
    )}

    {!reverse && children}

    {fieldHelp && !fieldHelpInline && (
      <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
        {fieldHelp}
      </FieldHelp>
    )}
  </FormFieldStyle>
);

FormField.defaultProps = {
  size: 'medium'
};

FormField.propTypes = {
  children: PropTypes.node,
  childOfForm: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldHelp: PropTypes.node,
  fieldHelpInline: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  helpId: PropTypes.string,
  hasInfo: PropTypes.bool,
  helpTag: PropTypes.string,
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isOptional: PropTypes.bool,
  label: PropTypes.node,
  labelId: PropTypes.string,
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  labelHelp: PropTypes.node,
  labelHelpIcon: PropTypes.string,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  tooltipMessage: PropTypes.string,
  useValidationIcon: PropTypes.bool
};

export default FormField;
