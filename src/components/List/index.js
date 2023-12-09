import React from 'react';
import {
  Accordion,
  Badge,
} from 'react-bootstrap';

import './style.css';

const List = ({ title, items }) => {
  return (
    <div className="list">
      <Accordion>
        <Accordion.Item>
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

interface ListProps {
  title: string,
  items: Array<Object>
};

export default List;