import React from 'react';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import './style.css';

type TaskCardProps = {
  title: string,
  taskDate: string
};

const taskCardDefaultProps = {
  title: 'Untitled',
  taskDate: '2024-01-01'
};

const TaskCard = (props: TaskCardProps) => {
  const isOld = moment().unix() >= moment(props.taskDate).add(5, 'days').unix();
  let addClass = '';

  if (isOld) {  
    addClass = `${addClass} taskCard--old`;
  };
  

  return (
    <Card className={`taskCard ${addClass}`} data-testid="taskcard">
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{ props.title }</Card.Title>
        <div className="taskCard__footer">
          <span>{ props.taskDate }</span>
        </div>
      </Card.Body>
    </Card>
  );
};

TaskCard.defaultProps = taskCardDefaultProps;

export default TaskCard;