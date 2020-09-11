import React, { useEffect, useState } from 'react';
import ButtonList from '../components/buttons/ButtonList';
import ActionOption from '../model/ActionOption';
import { useAgent, useGlobalState } from '../state/appState';
import SettingsLayout from '../components/settings/SettingsLayout';

const ButtonsSettingsPage: React.FC = () => {
  const [state] = useGlobalState();
  const { config } = state;
  const agent = useAgent();

  const [actionOptions, setActionOptions] = useState<ActionOption[]>([]);

  useEffect((): void => {
    agent.getActionOptions().then((options) => setActionOptions(options));
  }, [agent]);

  if (!config.config) {
    return <>Loading...</>;
  }

  return (
    <SettingsLayout>
      <ButtonList buttons={config.config.buttons} />
      <div className="button-settings"></div>
    </SettingsLayout>
  );
};

export default ButtonsSettingsPage;
