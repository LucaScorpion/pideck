import React, { useRef } from 'react';
import Dimmer from './Dimmer';
import classNames from '../util/classNames';
import useClickOutside from '../util/useClickOutside';

export interface Props {
  active: boolean;
  className?: string;
  onClose?: () => void;
}

const Modal: React.FC<Props> = ({ active, className, onClose, children }) => {
  const ref = useRef(null);
  useClickOutside(ref, onClose || (() => undefined));

  return (
    <Dimmer active={active} className={classNames(['modal', className])}>
      <div ref={ref}>{children}</div>
    </Dimmer>
  );
};

export default Modal;
