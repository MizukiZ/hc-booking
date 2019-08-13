import React, { useState, Fragment } from "react";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, WeekView, Appointments, Toolbar, DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { updateBookingDateTime } from '../store/actions/index'
import moment from 'moment'


function DateAndTime({ options, updateDateTime, bookingInfo, appointments }) {

  let [currentDate, currentDateChange] = useState(new Date())
  let [dateIsSelected, dateIsSelectedChange] = useState(false)

  // crete array of appointment datetimes (moment object)
  const appointmentDateArray = appointments ? appointments.map((a) => { return { start_at: moment(moment(a.start_at).utcOffset(0).format("YYYY-M-DD HH:mm")), end_at: moment(moment(a.end_at).utcOffset(0).format("YYYY-M-DD HH:mm")) } }
  ) : []


  const originalscheduleData = generateSchedule(appointmentDateArray)
  let [scheduleData, updatescheduleData] = useState(generateSchedule(appointmentDateArray))

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
            updateDateTime({ start_at: apData.startDate, end_at: apData.endDate })
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
      <Grid container>
        <Grid item xs={12}>
          <Typography color='error' align='center' variant='subtitle2' style={{ minHeight: 25, fontWeight: 'bold' }}>{bookingInfo.submitError && !dateIsSelected ? 'ご希望をお１つお選びください' : ''}</Typography>
        </Grid>

        <Grid className="mobileToggle" item xs={12} style={{ textAlign: 'right' }}>
          <div style={{ height: "20px", width: "60px", background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', fontSize: '12px', textAlign: "center", color: "#fff", padding: "5px", fontWeight: 'bold', display: "inline-block", marginRight: "5px", borderRadius: '4px' }}> 予約可能</div>
          <div style={{ height: "20px", width: "60px", background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', fontSize: '12px', textAlign: "center", color: "#fff", padding: "5px", fontWeight: 'bold', display: "inline-block", borderRadius: '4px' }}> 予約不可</div>
        </Grid>
      </Grid>
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
    </Fragment >
  );
}

function generateSchedule(appointmentArrayMomentObjects) {
  let dynamicSchedule = []
  const tomorrow = moment().add(1, 'day').format("YYYY-MM-DD")
  const startTime = "10:00"
  const endTime = 19
  const duration = 2
  const interval = 15

  let startDatetime = new Date(tomorrow + "T" + startTime)
  for (let i = 1; i < 25; i++) {
    let isOverrap = false;
    const startDate = moment(startDatetime).format("YYYY-M-DD HH:mm")

    appointmentArrayMomentObjects.forEach((appointment) => {
      const appointmentStart = appointment.start_at
      const appointmentEnd = appointment.end_at
      const bookingStart = moment(startDate)
      const bookingEnd = moment(startDate).add(2, "hours")

      if ((appointmentStart >= bookingStart && appointmentStart <= bookingEnd) || (appointmentEnd >= bookingStart && appointmentEnd <= bookingEnd)) {

        isOverrap = true
      }
    })

    if (startDatetime.getHours() + duration >= 19) {
      // next day with set start time
      startDatetime.setDate(startDatetime.getDate() + 1)
      const nextDateStr = moment(startDatetime).format("YYYY-MM-DD")
      startDatetime = new Date(nextDateStr + "T" + startTime)
      continue
    } else if (isOverrap) {
      startDatetime.setHours(startDatetime.getHours() + duration)
      startDatetime.setMinutes(startDatetime.getMinutes() + interval)
    } else {
      const endDate = moment(startDatetime.setHours(startDatetime.getHours() + duration)).format("YYYY-M-DD HH:mm")
      let scheduleObj = {
        startDate,
        endDate,
        title: "ご予約可能です",
        available: true
      }

      // add interval minutes for next session
      startDatetime.setMinutes(startDatetime.getMinutes() + interval)
      dynamicSchedule.push(scheduleObj)
    }
  }

  appointmentArrayMomentObjects.forEach((appointment) => {
    const startDate = appointment.start_at.format("YYYY-M-DD HH:mm")
    const endDate = moment(appointment.end_at).format("YYYY-M-DD HH:mm")
    let scheduleObj = {
      startDate,
      endDate,
      title: "ご予約不可です",
      available: false
    }
    dynamicSchedule.push(scheduleObj)
  })

  return dynamicSchedule
}

const mapStateToProps = function (state) {
  return {
    bookingInfo: state.bookingInfo,
    appointments: state.appointments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDateTime: (datetime) => dispatch(updateBookingDateTime(datetime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateAndTime)