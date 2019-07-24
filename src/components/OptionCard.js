import React, { useState } from "react";
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
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
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
    <Grid container
      spacing={2}
      justify="center"
      alignItems="center"
    >
      {optionCards}
    </Grid>
  );
}

export default OptionCard;