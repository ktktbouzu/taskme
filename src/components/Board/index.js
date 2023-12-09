import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import './style.css';

const Board = (props) => {
  return (
    <Container className="board">
      <Row>
        <Col>
          <h1>{ props.title }</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {/** Calendar */}
        </Col>
      </Row>
      <Row>
        {/** Boards goes here */}
      </Row>
    </Container>
  );
}

interface BoardProps {
  title: string
}

export default Board;