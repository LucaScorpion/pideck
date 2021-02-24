import React, { useCallback, useState } from 'react';
import { TemplateInfo } from 'touchdeck-model';
import { useConnectedAgent, useGlobalState } from '../state/appState';
import { TemplatesList } from '../components/TemplatesList';
import { TemplateProperties } from '../components/TemplateProperties';

export const TemplatesPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo>();
  const [, dispatch] = useGlobalState();
  const { agent } = useConnectedAgent();

  const deleteTemplate = useCallback(
    async (template: TemplateInfo) => {
      await agent.deleteTemplate(template.path);
      setSelectedTemplate(undefined);
      const newTemplates = await agent.getTemplates();
      dispatch({
        type: 'templatesLoaded',
        templates: newTemplates,
      });
    },
    [agent, dispatch]
  );

  return (
    <main className="templates-page config-page">
      <TemplatesList
        onClickTemplate={setSelectedTemplate}
        onCreateTemplate={() =>
          setSelectedTemplate({
            path: '',
            text:
              'This is a template!\nPut values in here like so: {{ counter }}\nGive it a name, and press save to store it.',
            values: {},
          })
        }
      />
      {selectedTemplate && (
        <TemplateProperties
          template={selectedTemplate}
          onDelete={() => deleteTemplate(selectedTemplate)}
          onClose={() => setSelectedTemplate(undefined)}
          onUpdate={setSelectedTemplate}
        />
      )}
    </main>
  );
};
