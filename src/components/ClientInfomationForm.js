import React from "react";
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { updateBookingFirstName, updateBookingLastName, updateBookingEmail, updateBookingPhone, updateBookingContent } from '../store/actions/index'

import { emailIsValid, phoneIsValid } from '../helper'

function ClientInfomationForm(props) {
  const inputStyles = {
    itemGrid: {
      textAlign: 'center', margin: 'auto'
    }
  }

  const { firstname, lastname, email, phone, content, submitError } = props.bookingInfo

  return (
    <Grid
      container
      justify="center"
      alignItems='center'
    >
      <Grid item xs={12} sm={6}>

        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            error={submitError && firstname === '' ? true : false}
            required
            id="last-name"
            label="名字"
            margin="normal"
            type='text'
            value={firstname}
            onChange={(e) => {
              const value = e.target.value
              props.updateFirstName(value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            required
            error={submitError && lastname === '' ? true : false}
            id="first-last"
            label="名前"
            margin="normal"
            type="text"
            value={lastname}
            onChange={(e) => {
              const value = e.target.value
              props.updateLastName(value)
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            required
            error={submitError && !emailIsValid(email) ? true : false}
            id="email-address"
            label="メール"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value
              props.updateEmail(value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            required
            error={submitError && !phoneIsValid(phone) ? true : false}
            id="phone-number"
            label="電話電話"
            margin="normal"
            type="tel"
            value={phone}
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
            value={content}
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