import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import _ from 'lodash'

// Styles should go here CSS should go here
const styles = theme => ({
})

class PostInfo extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render () {
    const { data } = this.props

    console.log(data)
    return (
      <div>
        {data && data.name ?
        (
          <Typography variant="display1" >
            Post {data.id}
          </Typography>
        ): null}

        {_.map(_.keys(data), (key, i) =>
          key !== 'id' ?
          (<Typography key={i}>
            <b>{key}: </b> {data[key]}
          </Typography>)
          : null
        )}

      </div>
    )
  }
}
PostInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostInfo)