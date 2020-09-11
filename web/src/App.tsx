import React from 'react';
import DeckPage from './pages/DeckPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useGlobalState } from './state/appState';
import ButtonsSettingsPage from './pages/ButtonsSettingsPage';
import TargetsSettingsPage from './pages/TargetsSettingsPage';
import ConnectAgentPage from './pages/ConnectAgentPage';
import AgentSettingsPage from './pages/AgentSettingsPage';

const App: React.FC = () => {
  const [{ agent }] = useGlobalState();

  // If we are not connected to an agent, show the connect page.
  if (!agent.agent || agent.connecting) {
    return <ConnectAgentPage />;
  }

  // We are connected, launch the deck!
  return (
    <Switch>
      <Route exact path="/" component={DeckPage} />
      <Redirect exact path="/settings" to="/settings/buttons" />
      <Route exact path="/settings/buttons" component={ButtonsSettingsPage} />
      <Route exact path="/settings/targets" component={TargetsSettingsPage} />
      <Route exact path="/settings/agent" component={AgentSettingsPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
