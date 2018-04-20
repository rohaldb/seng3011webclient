import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import _ from 'lodash'
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// Styles should go here CSS should go here
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

class PostInfo extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render () {
    const { data, classes } = this.props

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
          (<Typography color="inherit" key={i}>
            {`${key}: ${data[key]}`}
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