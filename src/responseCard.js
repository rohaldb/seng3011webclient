import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import CompanyInfo from './companyInfo'
import PostInfo from './postInfo'
import Typography from 'material-ui/Typography'
import _ from 'lodash'

// Styles should go here CSS should go here
const styles = theme => ({
  jsonPane: {
    textAlign: 'left',
  }
});

class ResponseCard extends Component {

  static propTypes = {
    responseJSON: PropTypes.object.isRequired,
    activeTab: PropTypes.number.isRequired
  }

  render () {

    const { responseJSON, classes, activeTab } = this.props
    const { data } = responseJSON

    return (
      <Grid item xs={12}>
        <Grid container justify="center" direction="column" className={classes.jsonPane}>
          <Card className={classes.card}>
            <CardContent>

            <p>METADATA</p>
              {_.map(_.keys(responseJSON), (key, i) =>
                key !== 'data' && key !== 'params' ?
                (<Typography color="textSecondary" key={i}>
                  {`${key}: ${responseJSON[key]}`}
                </Typography>)
                : null
              )}

              {_.map(_.keys(responseJSON.params), (key, i) =>
                (<Typography color="textSecondary" key={i}>
                  {`${key}: ${responseJSON.params[key]}`}
                </Typography>)
              )}



              { activeTab === 0 ?
                <CompanyInfo data={data} />
                :
                <PostInfo data={data} />
              }

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ResponseCard)
