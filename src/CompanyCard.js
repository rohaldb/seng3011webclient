import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
// import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel'
import Button from 'material-ui/Button'

// Styles should go here CSS should go here
const styles = theme => ({
  jsonPane: {
    textAlign: 'left',
  }
});

class CompanyCard extends Component {

  static propTypes = {
    responseJSON: PropTypes.object.isRequired,
  }

  render () {

    const { responseJSON, classes } = this.props

    return (
      <Grid item xs={12}>
        <Grid container justify="center" direction="column" className={classes.jsonPane}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Company Name:
              </Typography>
              <Typography variant="headline" component="h2">
                {responseJSON ? responseJSON.data.name + ' (' + responseJSON.data.category + ')': null}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {responseJSON ? 'id: ' + responseJSON.data.id : null}
                <br/>
                {responseJSON ? 'website: ' + responseJSON.data.website : null}
                <br/>
                {responseJSON ? 'fan_count: ' + responseJSON.data.fan_count : null}
              </Typography>
              <Typography component="p">
                <br/>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Posts</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(CompanyCard)
