import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Card, CardBody, Col } from 'reactstrap';
import { BASE_URL, AUTH, AUTH_LOGIN } from '../../common/constants/RouteConstants';
import Login from './Login';
import logo from '../../assets/logo.png';

function Auth(props) {
  return (
    <Container className='d-flex justify-content-center align-items-center my-a' style={{ height: '100vh' }}>
      <Col md='7' lg='5'>
        <Card className='border-0 mb-0'>
          <CardBody className='px-lg-5 py-lg-5'>
            <div className='text-center mb-5'>
              <img alt='...' className='navbar-brand-img' src={logo} style={{ height: '10vh', width: '10vh' }} />
            </div>

            <Switch>
              <Route exact path={`${BASE_URL}/${AUTH}`} component={Login} />
              <Route exact path={`${BASE_URL}/${AUTH}/${AUTH_LOGIN}`} component={Login} />
            </Switch>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
}

export default Auth;
