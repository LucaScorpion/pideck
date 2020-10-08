import React, { useCallback, useEffect, useState } from 'react';
import { useGlobalState } from '../state/appState';
import Icon from '../components/Icon';
import Agent from '../api/Agent';
import listDiscoveredAgents from '../api/listDiscoveredAgents';
import AgentInfo from '../model/AgentInfo';
import AgentList from '../components/AgentList';
import TextInput from '../components/input/TextInput';
import Modal from '../components/Modal';
import Button from '../components/Button';

const ConnectAgentPage: React.FC = () => {
  const [{ agent }, dispatch] = useGlobalState();

  const [connectInput, setConnectInput] = useState('');
  const [agentList, setAgentList] = useState<AgentInfo[]>();
  const [agentListError, setAgentListError] = useState<string>();

  useEffect(() => {
    listDiscoveredAgents()
      .then(setAgentList)
      .catch((err) => setAgentListError(err.message));
  }, []);

  const connectToAgent = useCallback(
    async (address) => {
      // Connect to the agent.
      dispatch({ type: 'dismissError' });
      dispatch({ type: 'agentConnecting' });
      const newAgent = new Agent(address);
      newAgent.onButtonStateChanged((event) =>
        dispatch({
          type: 'buttonStateChanged',
          buttonId: event.buttonId,
          buttonState: event.buttonState,
        })
      );

      // Test if the agent is valid.
      let agentInfo: AgentInfo;
      try {
        agentInfo = await newAgent.getInfo();
        if (agentInfo.name !== 'pideck-agent') {
          dispatch({
            type: 'error',
            message: `Invalid agent name: ${agentInfo.name}`,
            id: Math.random().toString().substring(2),
          });
          dispatch({ type: 'agentDisconnected' });
          return;
        }
      } catch (err) {
        dispatch({
          type: 'error',
          message: `Could not connect to agent: ${err.message}`,
          id: Math.random().toString().substring(2),
        });
        dispatch({ type: 'agentDisconnected' });
        return;
      }

      // Load the configuration, action options, button states from the agent.
      const agentConfig = await newAgent.getConfiguration();
      const actionOptions = await newAgent.getActionOptions();
      // const buttonStates = await newAgent.getButtonStates();
      const images = await newAgent.getImages();

      // Dispatch the connected event.
      dispatch({
        type: 'agentConnected',
        agent: newAgent,
        info: agentInfo,
        config: agentConfig,

        actionOptions,
        buttonStates: {}, // TODO
        images,
      });
    },
    [dispatch]
  );

  return (
    <div className="connect-agent">
      <Modal active={agent.connecting}>
        <Icon icon="spinner" size={3} pulse />
        <h2>Connecting to agent...</h2>
      </Modal>

      <main>
        <h2>Connect to an agent</h2>

        <h3>Select an agent from the list:</h3>
        <AgentList
          agents={agentList}
          onClickAgent={(address) => connectToAgent(address)}
          error={agentListError}
        />

        <h3>Or enter the IP address:</h3>
        <div className="manual-address">
          <TextInput
            placeholder="localhost:3000"
            value={connectInput}
            onChange={setConnectInput}
            onKeyDown={(e) => {
              if (connectInput && e.key === 'Enter') {
                connectToAgent(connectInput);
              }
            }}
          />
          <Button
            disabled={!connectInput}
            onClick={() => connectToAgent(connectInput)}
            compact
          >
            Connect
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ConnectAgentPage;
