import React from "react";
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { updateBookingFirstName, updateBookingLastName, updateBookingEmail, updateBookingPhone, updateBookingContent } from '../store/actions/index'

function ClientInfomationForm(props) {
  console.log(props)
  const inputStyles = {
    itemGrid: {
      textAlign: 'center', margin: 'auto'
    }
  }

  return (
    <Grid
      container
      justify="center"
      alignItems='center'
    >
      <Grid item xs={12} sm={6}>

        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="last-name"
            label="名字"
            margin="normal"
            type='text'
            value={props.bookingInfo.firstname}
            onChange={(e) => {
              const value = e.target.value
              props.updateFirstName(value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="first-last"
            label="名前"
            margin="normal"
            type="text"
            value={props.bookingInfo.lastname}
            onChange={(e) => {
              const value = e.target.value
              props.updateLastName(value)
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="email-address"
            label="メール"
            margin="normal"
            type="email"
            value={props.bookingInfo.email}
            onChange={(e) => {
              const value = e.target.value
              props.updateEmail(value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="phone-number"
            label="電話電話"
            margin="normal"
            type="tel"
            value={props.bookingInfo.phone}
            onChange={(e) => {
              const value = e.target.value
              props.updatePhone(value)
            }}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="content"
            multiline
            rows="8"
            placeholder="ご相談されたい内容を簡単にご記入ください。"
            label="相談内容"
            margin="normal"
            variant="outlined"
            type='text'
            value={props.bookingInfo.content}
            onChange={(e) => {
              const value = e.target.value
              props.updateContent(value)
            }}
            fullWidth
          />
        </Grid>
      </Grid>

    </Grid>
  );
}

const mapStateToProps = function (state) {
  return {
    bookingInfo: state.bookingInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFirstName: (firstname) => dispatch(updateBookingFirstName(firstname)),
    updateLastName: (lastname) => dispatch(updateBookingLastName(lastname)),
    updateEmail: (email) => dispatch(updateBookingEmail(email)),
    updatePhone: (phone) => dispatch(updateBookingPhone(phone)),
    updateContent: (content) => dispatch(updateBookingContent(content))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfomationForm);