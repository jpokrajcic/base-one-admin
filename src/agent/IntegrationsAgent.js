import { requests } from './agent';
const ENDPOINT = '/integration-administration';

const IntegrationsAgent = {
  getIntegrations: () => requests.get(`${ENDPOINT}/integrations`),
};

export default IntegrationsAgent;
