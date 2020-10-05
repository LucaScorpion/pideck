import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { ButtonConfig } from '../../model/configuration/ButtonConfig';
import { useConnectedAgent } from '../../state/appState';
import TextInput from '../input/TextInput';
import Icon from '../Icon';

export interface Props {
  onClickButton: (button: ButtonConfig) => void;
  onCreateButton: () => void;
}

const ButtonList: React.FC<Props> = ({ onClickButton, onCreateButton }) => {
  const { config } = useConnectedAgent();
  const { buttons } = config;

  const [showButtons, setShowButtons] = useState(buttons);
  const [searchTerm, setSearchTerm] = useState('');
  useLayoutEffect(() => {
    setShowButtons(
      buttons
        .filter((b) => filterButton(searchTerm, b))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [buttons, searchTerm]);

  return (
    <div className="button-list">
      <div className="search-wrapper">
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChange={setSearchTerm}
          icon="search"
        />
        <div className="create" onClick={onCreateButton}>
          <Icon icon="plus" />
        </div>
      </div>
      <div className="list">
        {showButtons
          .filter((b) => b != null)
          .map((b, i) => buttonToComponent(b, i, onClickButton))}
      </div>
    </div>
  );
};

export default ButtonList;

function buttonToComponent(
  button: ButtonConfig,
  index: number,
  onClickButton: (button: ButtonConfig) => void
): ReactNode {
  if (!button) {
    return <></>;
  }

  return (
    <div
      key={button.id}
      className="entry"
      onClick={() => onClickButton(button)}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('button', button.id)}
    >
      {'style' in button && button.style.image && (
        <img alt="" src={`/api/images/${button.style.image}`} />
      )}
      <span className="name">{getButtonNameOrText(button)}</span>
    </div>
  );
}

function getButtonNameOrText(button: ButtonConfig): string {
  let text = button.name;

  // If the button has text and no name, use the text.
  if (!text && 'style' in button) {
    text = button.style.text;
  }

  return text;
}

function filterButton(searchTerm: string, button: ButtonConfig): boolean {
  const searchTermLower = searchTerm.toLowerCase();

  // Check the button name.
  if (button.name.toLowerCase().indexOf(searchTermLower) > -1) {
    return true;
  }

  // Check the button text.
  if (
    'style' in button &&
    button.style.text.toLowerCase().indexOf(searchTermLower) > -1
  ) {
    return true;
  }

  // No match.
  return false;
}
