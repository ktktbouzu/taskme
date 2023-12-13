import React from 'react';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import './style.css';

type TaskCardProps = {
  title: string,
  id: string | number,
  taskDate: string,
  listId: string | number
};

const taskCardDefaultProps = {
  title: 'Untitled',
  taskDate: '2024-01-01'
};

const TaskCard = (props: TaskCardProps) => {
  const [{ opacity }, drag ] = useDrag(
    () => ({
      type: 'CARD',
      item: { ...props },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    })
  );

  const isOld = moment().unix() >= moment(props.taskDate).add(5, 'days').unix();
  let addClass = '';

  if (isOld) {
    addClass = `${addClass} taskCard--old`;
  };

  return (
    <Card className={`taskCard${addClass}`} data-testid="taskcard" ref={drag} style={{ opacity }}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{props.title}</Card.Title>
        <div className="taskCard__footer">
          <span>{props.taskDate}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

TaskCard.defaultProps = taskCardDefaultProps;

export default TaskCard;