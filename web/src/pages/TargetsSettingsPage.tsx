import React, { useState } from 'react';
import { useGlobalState } from '../state/appState';
import TargetRow from '../components/TargetRow';
import ObsSettings from '../components/settings/ObsSettings';

const TargetsSettingsPage: React.FC = () => {
  const [state, setState] = useGlobalState();
  const { config } = state;

  const [settingsPane, setSettingsPane] = useState();

  if (config.loading) {
    return <>Loading...</>;
  }

  return (
    <div className="targets-settings">
      <main>
        <div className="targets-list">
          <TargetRow
            name="OBS Studio"
            onClick={() =>
              setSettingsPane(
                <ObsSettings
                  config={config.config.targets.obs}
                  onSaveConfig={(newConfig) => {
                    // TODO
                    console.log(newConfig);
                  }}
                />
              )
            }
          />
        </div>
        <div className="target-settings">{settingsPane}</div>
      </main>
    </div>
  );
};

export default TargetsSettingsPage;
