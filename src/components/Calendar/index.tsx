import React, { useState } from 'react';
import moment from 'moment';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { has } from 'lodash';

import CalendarCell from './CalendarCell';

import './style.css';

type DateConfig = {
  type: string,
  value: string,
  displayVal: string|number
};

const getDates = (year: number, month: number) => {
  const dateStart = moment().year(year).month(month - 1).date(1);
  const endOfMonth = moment(dateStart).endOf('month');
  const prevMonth = moment(dateStart).subtract(1, 'months').endOf('month');
  const nextMonth = moment(dateStart).add(1, 'months');

  const currMonthDates = Array.from(
    { length: endOfMonth.date() }, 
    (elem, index) => ({ 
      type: 'curr', 
      value: `${dateStart.year()}-${dateStart.month() + 1}-${index+1}`,
      displayVal: index + 1
    }) 
  );

  const prevPadding = Array.from(
    { length: dateStart.day() }, 
    (elem, index) =>  {
      const dateVal = prevMonth.date() - (dateStart.day() - (index + 1));
      
      return {
        type: 'prev',
        value: `${prevMonth.year()}-${prevMonth.month() + 1}-${dateVal}`,
        displayVal: dateVal
      };
    }
  );

  const nextPadding = Array.from(
    { length: 6 - endOfMonth.day()  }, 
    (elem, index) => ({
      type: 'next',
      value: `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
      displayVal: index + 1
    })
  );

  return [
    ...prevPadding,
    ...currMonthDates,
    ...nextPadding
  ];
};

const getDateObj = (dateString: string) => {
  const dateObj = moment(dateString);

  return {
    year: dateObj.year(),
    month: dateObj.month() + 1,
    monthString: dateObj.format('MMMM'),
    date: dateObj.date(),
  };
}

const Calendar = () => {
  const [ currDate, setCurrDate ] = useState(moment().format('YYYY-MM-DD'));
  const [ selected, setSelected ] = useState({});
  const [ today ] = useState(moment().format('YYYY-MM-DD'));

  const days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];
  
  const currDateObj = getDateObj(currDate);
  const dates = getDates(currDateObj.year, currDateObj.month);
  
  const getPrevious = () => {
    setCurrDate(moment(currDate).subtract(1, 'month').format('YYYY-MM-DD'));
  }

  const getNext = () => {
    setCurrDate(moment(currDate).add(1, 'month').format('YYYY-MM-DD'));
  }

  const onCellClick = (value: any) => {
    let currSelected:Record<string, boolean> = { ...selected };

    if (has(currSelected, value)) {
      delete currSelected[value];
    } else {
      currSelected =  { ...currSelected, [value]: true };      
    }

    setSelected(currSelected);
  }
  
  return (
    <Container fluid className="calendar">
      <Row>
        <Col className="calendar__headerYear">
          <button onClick={getPrevious}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h4>{ `${currDateObj.monthString} ${currDateObj.year}` }</h4>
          <button onClick={getNext}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </Col>
      </Row>
      <Row>
        { days.map((day) => (
          <Col className="calendar__headerCol" key={day}>
            <span>{ day }</span>
          </Col>
        )) }
      </Row>
      <Row className="calendar__datesRow">
        { dates.map((dateConfig:DateConfig, index: number) => {
          return (
            <CalendarCell 
              muted={!!(dateConfig.type === 'prev' || dateConfig.type === 'next')} 
              key={index}
              displayVal={dateConfig.displayVal}
              dateValue={dateConfig.value}
              today={dateConfig.value === today}
              isSelected={has(selected, dateConfig.value)}
              onCellClick={onCellClick}
            />
          );
        }) 
        }
        
      </Row>
    </Container>    
  )
};

export default Calendar;