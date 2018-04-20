import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
// import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel'
import Button from 'material-ui/Button'
import _ from 'lodash'

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
    const { data } = responseJSON

    return (
      <Grid item xs={12}>
        <Grid container justify="center" direction="column" className={classes.jsonPane}>
          <Card className={classes.card}>
            <CardContent>
              { data.name ?
              (
                <Typography variant="headline" color="textSecondary">
                  Company Name: {data.name}
                </Typography>
              ): null
              }

              {_.map(_.keys(data), (key, i) =>
                key !== 'posts' && key !== 'name' ?
                (<Typography color="textSecondary" key={i}>
                  {`${key}: ${data[key]}`}
                </Typography>)
                : null
              )}

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
