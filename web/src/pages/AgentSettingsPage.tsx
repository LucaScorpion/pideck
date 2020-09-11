import React from 'react';
import { useGlobalState } from '../state/appState';
import SettingsLayout from '../components/settings/SettingsLayout';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import Rows from '../components/Rows';

const AgentSettingsPage: React.FC = () => {
  const [
    {
      agent: { info },
    },
    dispatch,
  ] = useGlobalState();

  return (
    <SettingsLayout>
      <main className="agent-settings">
        <Rows>
          <div>
            <span>Address:</span>
            <span>{info?.address}</span>
          </div>
          <div>
            <span>Version:</span>
            <span>{info?.version}</span>
          </div>
          <div>
            <span>Platform:</span>
            <span>{info?.platform}</span>
          </div>
          <div>
            <span>Hostname:</span>
            <span>{info?.hostname}</span>
          </div>
        </Rows>
        <Link
          className="disconnect"
          to="/"
          onClick={() => dispatch({ type: 'agentDisconnected' })}
        >
          <Icon icon="power-off" />
          Disconnect
        </Link>
      </main>
    </SettingsLayout>
  );
};

export default AgentSettingsPage;
