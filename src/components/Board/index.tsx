import React from 'react';
import {
  Container,
  Row,
  Col,
  Modal
} from 'react-bootstrap';

import List from '../List';
import Calendar from '../Calendar';
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
    <>
      <Container fluid className="board">
        <Row>
          <Col className="board__header">
            <h1>{props.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {/** Calendar */}
          </Col>
        </Row>
        <Row>
          {props.lists.map((list: ListConfig) => (
            <Col
              xs={12}
              sm={6}
              lg={3}
              key={`${list.id}-container`}
              data-testid="list-child"
            >
              <List listConfig={list} />
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar />
        </Modal.Body>
      </Modal>
    </>
  );
}

Board.defaultProps = boardDefaultProps;

export default Board;