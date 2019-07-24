import React, { useState, Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography'


const styles = {
  unSelected: {
    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
    color: '#fff'
  },
  selected: {
    boxShadow: '1px 1px 15px 1px #000000'
  }
};


function OptionCard({ options }) {

  // create selecttedOption valiable and change event
  let [selectedOption, setSelectedOption] = useState(null)

  const optionCards = options.map((option) => {
    return (
      <Grid item key={option.id}>
        <Card style={{
          ...styles.unSelected,
          ...(option.title == selectedOption ? styles.selected : {})
        }}>
          <CardActionArea
            onClick={() => {
              setSelectedOption(option.title)
            }}
          >
            <CardHeader title={option.title} align='center' />
            <CardContent>
              <Typography align='center'>
                {`$${option.price}/${option.minutes}分`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>)
  })

  return (
    <Fragment>
      <Typography color='error' align='center' variant='subtitle2' style={{ minHeight: 25 }}>{!selectedOption ? '１つお選びください' : ''}</Typography>
      <Grid container
        spacing={2}
        justify="center"
        alignItems="center"
      >
        {optionCards}
      </Grid>
    </Fragment>
  );
}

export default OptionCard;