import React from 'react';
import {
  Accordion,
  Badge,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd'
import { has } from 'lodash';

import TaskCard from '../TaskCard';
import { transferTask } from '../../reducers/taskCards';

import type { 
  TaskCardConfig,
  ListConfig
} from '../../types';
import type {
  RootState,
  AppDispatch
} from '../../store';

import './style.css';

type ListProps = {
  listConfig: ListConfig
};

const onDropEvent = (listConfig: ListConfig, dispatch: AppDispatch) => {
  return (item: { id: string | number, listId: string | number, listIndex: number }) => {
    console.log(item);
    const refData = {
      listId: listConfig.id,
      fromListId: item.listId,
      listIndex: item.listIndex,
      cardId: item.id
    };

    console.log(refData);

    dispatch(transferTask(refData));
  }
};

const List = (props: ListProps) => {
  const { listConfig } = props;
  let taskItems: Array<TaskCardConfig> = [];

  /**
   * Hooks --start
   */
  const taskLists = useSelector((state: RootState) => (
    state.taskCards.listCards
  ));
  const dispatch = useDispatch();
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: '',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: onDropEvent(listConfig, dispatch)
  }));
  /**
   * Hooks --end
   */

  if (has(taskLists, listConfig.id) && taskLists[listConfig.id]) {
    taskItems = taskLists[listConfig.id];
  }

  return (
    <div className="list">
      <Accordion defaultActiveKey="0" ref={drop}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="list__title">{ listConfig.name }</span>
            { !!taskItems.length && (
                <Badge pill bg="secondary" className="list__countPill">
                  { taskItems.length }
                </Badge>
              ) 
            }
          </Accordion.Header>
          <Accordion.Body>
            <div className={`list__cardWrapper ${isOver ? 'list__cardWrapper--over' : ''}`}>
              { taskItems.map((task: TaskCardConfig, index: number) => (
                <TaskCard 
                  {...task}
                  key={task.id}
                  listId={listConfig.id}
                />
              )) }
              { (!taskItems.length && !isOver ) && (
                <p>No Tasks</p>
              ) }
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default List;