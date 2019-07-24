import React, { Fragment } from "react";
import Typography from '@material-ui/core/Typography'

function SectionTitle({ title }) {
  return (
    <Fragment>
      <hr />
      <Typography align='center' variant='subtitle1'>{title}</Typography>
      <hr />
    </Fragment>
  );
}

export default SectionTitle;