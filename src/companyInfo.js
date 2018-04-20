import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import _ from 'lodash'

// Styles should go here CSS should go here
const styles = theme => ({
});

class CompanyInfo extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render () {
    const { data } = this.props

    return (
      <div>
        {data.name ?
        (
          <Typography variant="display1" >
            {data.name}
          </Typography>
        ): null}

        {_.map(_.keys(data), (key, i) =>
          key !== 'posts' && key !== 'name' ?
          (<Typography color="textSecondary" key={i}>
            {`${key}: ${data[key]}`}
          </Typography>)
          : null
        )}

        <p> POSTS GO HERE </p>

      </div>
    )
  }
}

export default withStyles(styles)(CompanyInfo)
