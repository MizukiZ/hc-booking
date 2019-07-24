import React, { Fragment } from "react";
import Typography from '@material-ui/core/Typography'

function SectionTitle({ title }) {
  return (
    <Fragment>
      <hr style={{ marginTop: 20 }} />
      <Typography align='center' variant='subtitle1' style={{ fontWeight: "bold" }}>{title}</Typography>
      <hr style={{ marginButton: 20 }} />
    </Fragment>
  );
}

export default SectionTitle;