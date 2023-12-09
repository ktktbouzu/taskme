import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import List from '../List';
import './style.css';

const Board = (props) => {
  return (
    <Container fluid className="board">
      <Row>
        <Col className="board__header">
          <h1>{ props.title }</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {/** Calendar */}
        </Col>
      </Row>
      <Row>
        {/* To Dos */}
        <Col xs={12} sm={6} lg={3}>
          <List title="To Dos" />
        </Col>
        {/* In Progress */}
        <Col xs={12} sm={6} lg={3}>
          <List title="In Progress" />
        </Col>
        {/* Done */}
        <Col xs={12} sm={6} lg={3}>
          <List title="Done" />
        </Col>
        {/* Delete */}
        <Col xs={12} sm={6} lg={3}>
          <List title="Deleted" />
        </Col>
      </Row>
    </Container>
  );
}

interface BoardProps {
  title: string
}

export default Board;