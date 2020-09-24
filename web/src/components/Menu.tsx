import React from 'react';
import classNames from '../util/classNames';
import Icon from './Icon';
import { Link, NavLink } from 'react-router-dom';

export interface Props {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<Props> = ({ open, onClose }) => (
  <nav className={classNames(['menu', !open && 'closed'])}>
    <Link to="/">
      <Icon className="close" icon="times" size={2} onClick={onClose} />
    </Link>
    <NavLink className="entry" to="/" exact>
      <h2>
        <Icon icon="th" />
        Deck
      </h2>
    </NavLink>
    <NavLink className="entry" to="/layout">
      <h2>
        <Icon icon="edit" />
        Layout
      </h2>
    </NavLink>
    <NavLink className="entry" to="/targets">
      <h2>
        <Icon icon="link" />
        Targets
      </h2>
    </NavLink>
    <NavLink className="entry" to="/agent">
      <h2>
        <Icon icon="robot" />
        Agent
      </h2>
    </NavLink>
  </nav>
);

export default Menu;
