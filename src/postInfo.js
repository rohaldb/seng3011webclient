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

  // static propTypes = {
  //   // data: PropTypes.object.isRequired
  // }

  render () {
    const { data } = this.props
    const { classes } = this.props
    return (
      <div>
      {console.log(data)}
        {data && data.name ?
        (
          <Typography variant="display1" >
            {data.name}
          </Typography>
        ): null}

        <br></br>
            <ExpansionPanel key={data.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{`Post`}</Typography>
                <Typography className={classes.secondaryHeading}>{`${data.id}`}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {_.map(_.keys(data), (key, i) =>
                  key !== 'id' ?
                  (<Typography color="inherit" key={i}>
                    {`${key}: ${data[key]}`}
                  </Typography>)
                  : null
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
        <br></br>

      </div>
    )
  }
}
PostInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostInfo)

// {Object.values(data.posts).map((item,index) =>
//   <Typography color="textSecondary" key={index}>
//     {`${item.message}`}
//
//
//   </Typography>
// )}

//
// {_.map(_.keys(data.posts), (key, i) =>
//   key !== 'posts' && key !== 'name' ?
//   (<Typography color="textSecondary" key={i}>
//     {`${key}: ${data.posts[key]}`}
//   </Typography>)
//   : null
// )}
