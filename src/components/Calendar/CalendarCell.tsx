import React, { useState } from 'react';
import {
  Col
} from 'react-bootstrap';

type CalendarCellProps = {
  dateValue: string,
  displayVal: string|number,
  muted: boolean,
  today: boolean,
  isSelected: boolean,
  onCellClick: Function 
};

const CalendarCell = (props: CalendarCellProps) => {
  let className = 'calendar__datesCell';

  if (props.muted) {
    className = `${className} calendar__datesCell--muted`;
  }

  if (props.isSelected) {
    className = `${className} calendar__datesCell--selected`;
  }

  if (props.today && !props.isSelected) {
    className = `${className} calendar__datesCell--today`;
  }

  const selectHandler = () => {
    if (!props.muted) {
      // setIsSelected(!isSelected);
      props.onCellClick(props.dateValue);
    }
  }

  return (
    <Col className={className} onClick={selectHandler}>
      { props.displayVal }
    </Col>
  );
};

export default CalendarCell;