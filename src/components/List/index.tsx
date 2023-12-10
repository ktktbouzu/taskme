import React from 'react';
import {
  Accordion,
  Badge,
} from 'react-bootstrap';

import './style.css';

type ListProps = {
  title: string,
  items: Array<Object>
};

const listDefaultProps = {
  title: 'Untitled',
  items: []
};

const List = (props: ListProps) => {
  const { title, items } = props;

  return (
    <div className="list">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="list__title">{ title }</span>
            { (items && items.length) && (
                <Badge pill bg="secondary" className="list__countPill">
                  { items.length }
                </Badge>
              ) 
            }
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
};

List.defaultProps = listDefaultProps;

export default List;