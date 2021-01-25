import React, { InputHTMLAttributes } from 'react';
import Icon from '../Icon';
import classNames from '../../util/classNames';

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (text: string) => void;
  type?: 'text' | 'password';
  value?: string;
  icon?: string;
  onClickIcon?: () => void;
}

export const TextInput: React.FC<Props> = (props) => {
  const inputProps = { ...props };
  delete inputProps.onClickIcon;

  return (
    <div className={classNames(['input', props.className])}>
      <input
        {...inputProps}
        className={classNames([props.icon && 'has-icon-right'])}
        value={props.value || ''}
        onChange={(e) => props.onChange(e.currentTarget.value)}
      />
      {props.icon && <Icon icon={props.icon} onClick={props.onClickIcon} />}
    </div>
  );
};
