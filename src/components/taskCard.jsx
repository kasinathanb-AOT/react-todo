import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Edit from '../assets/edit.svg';
import Delete from '../assets/delete.svg';
import Calendar from '../assets/calender.svg';
import redCalendar from '../assets/red-calendar.svg';

const TaskCard = ({ task, deleteTask, toggleStatus, editTask }) => {
  const { id, taskName, desc, dueDate, status } = task;

  

  const handleDelete = () => {
    deleteTask(id);
  };

  const handleToggleStatus = () => {
    toggleStatus(id);
  };

  const handleEdit = () => {
    editTask(id);
  };

  return (
    <Card className="my-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-content-center align-items-center mb-2 flex-wrap">
          <input
            type="checkbox"
            className={status === true ? 'mt-0 ms-0 me-3 custom-check checked' : ' mt-0 ms-0 me-3 custom-check'}
            checked={status}
            onChange={handleToggleStatus}
          />
          <div className="flex-grow-1 align-items-center flex-wrap">
            <Card.Title className="d-flex justify-content-between align-items-center flex-wrap">
              <div className='status-span'>
                {taskName}{' '}
                <span  className={status ? 'text-success' : 'text-warning'}></span>
              </div>
              <div className="d-flex gap-2 align-content-center align-items-center flex-wrap">
                <Button variant="link">
                  <img src={Edit} alt="Edit" onClick={handleEdit} />
                </Button>
                <Button variant="link">
                  <img src={Delete} alt="Delete" onClick={handleDelete} />
                </Button>
              </div>
            </Card.Title>
          </div>
        </div>
        <div className="ps-5 ">
          <Card.Text>{desc}</Card.Text>
          <div className=' d-flex'>
          
          
          <Card.Text className={new Date(dueDate) < new Date() ? "ext-muted date-ctn overDue" : " ext-muted date-ctn"}>
            <span>
            <img src={new Date(dueDate) < new Date() ? redCalendar : Calendar} alt="Calendar" />

            </span>
            by {dueDate}
          </Card.Text>
          </div>
          
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
