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

class CompanyInfo extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render () {
    const { data } = this.props
    const { classes } = this.props
    return (
      <div>
        {data && data.name ?
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
        <br></br>
        {data && data.posts ?
          (Object.values(data.posts).map((item,index) =>
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{`Post ${index}`}</Typography>
                <Typography className={classes.secondaryHeading}>{`${item.id}`}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {item.message && item.message !== 'undefined'?
                (
                  <Typography>
                    {`id: ${item.id}`}
                    <br></br>
                    {`time_posted: ${item.created_time}`}
                    <br></br>
                    {`likes: ${item.likes}`}
                    <br></br>
                    {`comments: ${item.comments}`}
                    <br></br><br></br>
                    {`${item.message}`}
                  </Typography>
                ):
                  <Typography>
                    {`id: ${item.id}`}
                    <br></br>
                    {`time posted: ${item.created_time}`}
                    <br></br>
                    {`likes: ${item.likes}`}
                    <br></br>
                    {`comments: ${item.comments}`}
                    <br></br><br></br>
                    {`${item.story}`}
                  </Typography>
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        ): null}
      </div>
    )
  }
}
CompanyInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompanyInfo)

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
