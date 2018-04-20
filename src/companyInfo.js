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
  }
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

        {_.map(_.keys(data), (key, i) =>
          key !== 'posts' ?
          (<Typography color="textSecondary" key={i}>
            <b>{key}: </b> {data[key]}
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
                    <b>id: </b> {item.id}
                    <br></br>
                    <b>time_posted: </b>{item.created_time}
                    <br></br>
                    <b>likes: </b> {item.likes}
                    <br></br>
                    <b>comments: </b>{item.comments}
                    <br></br><br></br>
                    {`${item.message}`}
                  </Typography>
                ):
                  <Typography>
                    <b>id: </b> {item.id}
                    <br></br>
                    <b>time posted: </b> {item.created_time}
                    <br></br>
                    <b>likes: </b> {item.likes}
                    <br></br>
                    <b>comments: </b> {item.comments}
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
