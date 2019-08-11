import React, { useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { resetSubmitForm } from '../store/actions/index'
import { connect } from 'react-redux'

function ThankYouPage(props) {

  useEffect(() => {
    // equivalent to didmount method
    // reset form data
    props.resetForm()
  })


  return (
    <Card style={{ padding: 20, margin: 20 }}>
      <Grid container>
        <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '3em' }}>
          <img
            src={require('../images/logo.png')}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant='h5'>ご予約ありがとうございました。</Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant='subtitle2' style={{ fontStyle: 'italic' }}>ご予約確認メールを送らさせていただきました、ご確認ください。</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    resetForm: () => dispatch(resetSubmitForm())
  }
}

export default connect(null, mapDispatchToProps)(ThankYouPage)