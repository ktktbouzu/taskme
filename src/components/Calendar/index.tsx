import React, { useState } from 'react';
import moment from 'moment';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import './style.css';

const getDates = (year: number, month: number) => {
  const stringDate = `${year}-${month}-01`;
  const dateStart = moment(stringDate);
  const endOfMonth = moment(dateStart).endOf('month');
  const prevMonth = moment(dateStart).subtract(1, 'months').endOf('month');
  console.log(prevMonth.format('YYYY-MM-DD'));

  const currMonthDates = Array.from(
    { length: endOfMonth.date() }, 
    (elem, index) => ({ type: 'curr', value: index + 1 }) 
  );

  const prevPadding = Array.from(
    { length: dateStart.day() }, 
    (elem, index) => ({
      type: 'prev',
      value: prevMonth.date() - (dateStart.day() - (index + 1))
    })
  );

  const nextPadding = Array.from(
    { length: 6 - endOfMonth.day()  }, 
    (elem, index) => ({
      type: 'next',
      value: index + 1
    })
  );

  return [
    ...prevPadding,
    ...currMonthDates,
    ...nextPadding
  ];
};

const getToday = () => {
  const today = moment();

  return {
    year: today.year(),
    month: today.month() + 1,
    date: today.date(),
  };
}

const Calendar = () => {
  const [ currDate, setCurrDate ] = useState(getToday());

  const days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];

  const dates = getDates(currDate.year, currDate.month);
  console.log(dates);
  return (
    <Container fluid className="calendar">
      <Row>
        <Col className="calendar__headerYear">
          <h4>{ currDate.year }</h4>
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
        { dates.map((dateConfig, index) => {
            let className = 'calendar__datesCell';

            if (dateConfig.type === 'prev' || dateConfig.type === 'next') {
              className = `${className} calendar__datesCell--muted`;
            }

            return (
              <Col className={className} key={index}>
                { dateConfig.value }
              </Col>
            )
        }) }
        
      </Row>
    </Container>    
  )
};

export default Calendar;