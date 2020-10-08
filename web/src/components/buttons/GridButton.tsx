import React from 'react';
import classNames from '../../util/classNames';
import { ButtonStyling } from '../../model/configuration/ButtonConfig';
import { useConnectedAgent } from '../../state/appState';
import Icon from '../Icon';

export interface ButtonProps {
  size: number;
  buttonsPerRow?: number;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  editing?: boolean;
  onDelete?: () => void;
  onClick?: () => void | Promise<void>;
}

export interface Props extends ButtonProps {
  disabled?: boolean;
  style: ButtonStyling;
}

const GridButton: React.FC<Props> = ({
  children,
  disabled,
  onClick,
  style,
  size,
  buttonsPerRow,
  draggable,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  editing,
  onDelete,
}) => {
  const wrapperStyle: { width?: string } = {};
  if (buttonsPerRow) {
    wrapperStyle.width = `calc(100% / ${buttonsPerRow})`;
  }

  const { images } = useConnectedAgent();

  return (
    <div
      className="grid-button-wrapper"
      style={wrapperStyle}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div
        className={classNames(['grid-button', disabled && 'disabled'])}
        style={{
          backgroundColor: style.backgroundColor,
          color: style.textColor,
          backgroundImage: style.image ? `url(${images[style.image]})` : '',
          width: size,
          height: size,
          fontSize: size / 4,
        }}
        onClick={onClick}
        draggable={draggable}
        onDragEnd={onDragEnd}
      >
        {style.text}
        {children}
      </div>
      {editing && (
        <div
          className={classNames(['delete', onDelete && 'show'])}
          style={{
            top: `${(size || 0) / 2}px`,
          }}
          onClick={onDelete}
        >
          {onDelete && <Icon icon="trash" />}
        </div>
      )}
    </div>
  );
};

export default GridButton;
