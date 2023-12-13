import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import List from '../List';
import './style.css';

import type {
  ListConfig
} from '../../types';

type BoardProps = {
  title: string,
  lists: Array<ListConfig>
};

const boardDefaultProps = {
  title: 'Untitled',
  lists: []
};

const Board = (props: BoardProps) => {
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
        { props.lists.map((list: ListConfig) => (
          <Col 
            xs={12} 
            sm={6} 
            lg={3} 
            key={`${list.id}-container`}
            data-testid="list-child"
          >
            <List listConfig={list} />
          </Col>
        )) }
      </Row>
    </Container>
  );
}

Board.defaultProps = boardDefaultProps;

export default Board;