import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import ActionBar from '../../../components/actionBar/ActionBar';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import IntegrationListRow from './IntegrationListRow';

function Integrations(props) {
  const { IntegrationsStore } = props;

  const integrations = IntegrationsStore.integrations;

  useEffect(() => {
    IntegrationsStore.getIntegrations();
  }, [IntegrationsStore]);

  return (
    <Fragment>
      <ActionBar label='Integrations' />
      <Row>
        <Col>
          <ul className='list-unstyled'>
            {integrations.map((department) => (
              <IntegrationListRow key={department.id} department={department} />
            ))}
          </ul>
        </Col>
      </Row>
    </Fragment>
  );
}

Integrations.propTypes = {
  IntegrationsStore: PropTypes.object.isRequired,
};

export default inject((root) => ({
  IntegrationsStore: root.RootStore.integrationsStore,
}))(observer(Integrations));
