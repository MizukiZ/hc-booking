import React, { useState, Fragment } from "react";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, WeekView, Appointments, Toolbar, DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { updateBookingDateTime } from '../store/actions/index'


function DateAndTime({ options, updateDateTime, bookingInfo }) {
  let [currentDate, currentDateChange] = useState(new Date())
  let [dateIsSelected, dateIsSelectedChange] = useState(false)

  const originalscheduleData = [
    // hold original schduleData
    { startDate: '2019-7-21 10:00', endDate: '2019-7-21 12:00', title: 'Taken', available: false },
    { startDate: '2019-7-26 10:00', endDate: '2019-7-26 12:00', title: 'Available', available: true },
    { startDate: '2019-7-26 13:00', endDate: '2019-7-26 15:00', title: 'Available', available: true },
    { startDate: '2019-7-26 15:00', endDate: '2019-7-26 17:00', title: 'Available', available: true }
  ]
  let [scheduleData, updatescheduleData] = useState([
    // date which is generated based on the appointments and admin avilavility
    { startDate: '2019-7-21 10:00', endDate: '2019-7-21 12:00', title: 'Taken', available: false },
    { startDate: '2019-7-26 10:00', endDate: '2019-7-26 12:00', title: 'Available', available: true },
    { startDate: '2019-7-26 13:00', endDate: '2019-7-26 15:00', title: 'Available', available: true },
    { startDate: '2019-7-26 15:00', endDate: '2019-7-26 17:00', title: 'Available', available: true }
  ])

  const Appointment = ({
    children, style, ...restProps
  }) => {
    let bgColor = 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)'
    let boxShadow = ''
    if (!children[1].props.data.available) {
      // if the appointment is taken, change the bg color to red
      bgColor = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    }
    if (children[1].props.data.selected) {
      // if selected, add boxshadow
      boxShadow = '1px 1px 8px 1px #000000'
    }
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          background: bgColor,
          boxShadow: boxShadow
        }}
        onClick={() => {
          if (!children[1].props.data.selected && children[1].props.data.available) {
            // click event for appointment comp

            let apData = children[1].props.data
            // update redux value
            updateDateTime(apData.startDate)
            // remove chosen schedule from scheduleData
            let filterdscheduleData = originalscheduleData.filter((ap) => {
              return JSON.stringify(ap) !== JSON.stringify(apData)
            })

            // bring back the chosen schdule with selected true attr
            apData["selected"] = true
            const finalizedscheduleData = [...filterdscheduleData, apData]
            // update schedule data
            updatescheduleData(finalizedscheduleData)
            dateIsSelectedChange(true)
          }
        }}
      >
        {children}
      </Appointments.Appointment>
    )
  };

  return (
    <Fragment>
      <Typography color='error' align='center' variant='subtitle2' style={{ minHeight: 25, fontWeight: 'bold' }}>{bookingInfo.submitError && !dateIsSelected ? 'ご希望をお１つお選びください' : ''}</Typography>
      <Scheduler
        data={scheduleData}
        height={600}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={(date) => {
            currentDateChange(date)
          }}
        />
        <WeekView
          // detemine which days to show (zero based. 0-Sunday 6-Saturday)
          excludedDays={[4, 6]}
          // set start time from admin setting
          startDayHour={10}
          // set end time from admin setting
          endDayHour={19}
        />
        <Toolbar />
        <DateNavigator />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Fragment>
  );
}

const mapStateToProps = function (state) {
  return {
    bookingInfo: state.bookingInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDateTime: (datetime) => dispatch(updateBookingDateTime(datetime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateAndTime)