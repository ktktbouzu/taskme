import React from 'react';
import {
  Accordion,
  Badge,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { has } from 'lodash';

import TaskCard from '../TaskCard';

import type { 
  TaskCardConfig 
} from '../../types';
import type {
  RootState
} from '../../store';

import './style.css';

type ListProps = {
  title: string,
  items: Array<TaskCardConfig>
};

type ListWrapperProps = {
  title: string,
  listId: string,
}

const listDefaultProps = {
  title: 'Untitled',
  items: []
};

const listWrapperProps = {
  title: 'Untitled',
  listId: ''
}

const ListComponent = (props: ListProps) => {
  const { title, items } = props;

  return (
    <div className="list">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="list__title">{ title }</span>
            { !!items.length && (
                <Badge pill bg="secondary" className="list__countPill">
                  { items.length }
                </Badge>
              ) 
            }
          </Accordion.Header>
          <Accordion.Body>
            { items.map((task: TaskCardConfig) => (
              <TaskCard 
                title={task.title} 
                key={task.id} 
                taskDate={task.taskDate}
              />
            )) }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

const List = (props: ListWrapperProps) => {
  const { title, listId } = props;

  let taskItems: Array<TaskCardConfig> = [];
  const taskLists = useSelector((state: RootState) => (
    state.taskCards.listCards
  ));
  
  if (has(taskLists, listId) && taskLists[listId]) {
    taskItems = taskLists[listId];
  }

  return (
    <ListComponent
      title={title}
      items={taskItems}
    />
  );
};

List.defaultProps = listWrapperProps;
ListComponent.defaultProps = listDefaultProps;


export { ListComponent };
export default List;