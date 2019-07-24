import React, { Fragment } from "react";

function SectionTitle({ title }) {
  return (
    <Fragment>
      <hr />
      <h6 className='text-center'>{title}</h6>
      <hr />
    </Fragment>
  );
}

export default SectionTitle;