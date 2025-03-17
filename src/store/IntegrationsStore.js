import { makeAutoObservable, runInAction } from 'mobx';
import { IntegrationsAgent as Agent } from '../agent';

const LOAD_ERROR = `Error loading data`;

const mockIntegrations = [
  {
    id: '1234567890',
    name: 'Online sales',
    services: [
      { id: '1234567890', name: 'Shopify', isIntegrated: true, logo: 'shopify' },
      { id: '2345678901', name: 'WooCommerce', isIntegrated: false, logo: 'woocommerce' },
      { id: '3456789012', name: 'Magento', isIntegrated: true, logo: 'magento' },
    ],
  },
  {
    id: '2345678901',
    name: 'Accounting',
    services: [
      { id: '4567890123', name: 'Shopify', isIntegrated: false, logo: 'shopify' },
      { id: '5678901234', name: 'WooCommerce', isIntegrated: false, logo: 'woocommerce' },
      { id: '6789012345', name: 'Magento', isIntegrated: false, logo: 'magento' },
    ],
  },
  {
    id: '3456789012',
    name: 'Fullfilment',
    services: [
      { id: '7890123456', name: 'Shopify', isIntegrated: true, logo: 'shopify' },
      { id: '8901234567', name: 'WooCommerce', isIntegrated: true, logo: 'woocommerce' },
      { id: '9012345678', name: 'Magento', isIntegrated: true, logo: 'magento' },
    ],
  },
];

export default class IntegrationsStore {
  _integrations = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  get integrations() {
    return this._integrations;
  }

  async getIntegrations() {
    try {
      // REMOVE COMMENTS
      //   const res = await Agent.getIntegrations();
      //   runInAction(() => {
      //     this._integrations = res.data;
      //   });

      // REMOVE ALL CODE BELOW
      runInAction(() => {
        this._integrations = mockIntegrations;
      });

      return mockIntegrations; //res.data;
    } catch (err) {
      this.rootStore.toastrStore.error(LOAD_ERROR, null, err);
      throw err;
    }
  }
}
