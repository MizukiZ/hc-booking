import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function ClientInfomationForm() {

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
            fullWidth
          />
        </Grid>
        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="first-last"
            label="名前"
            margin="normal"
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="email-address"
            label="メール"
            margin="normal"
            type="email"
            fullWidth
          />
        </Grid>
        <Grid item xs={9} style={inputStyles.itemGrid}>
          <TextField
            id="phone-number"
            label="電話電話"
            margin="normal"
            type="tel"
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
            fullWidth
          />
        </Grid>
      </Grid>

    </Grid>
  );
}

export default ClientInfomationForm;