import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import CompanyInfo from './companyInfo'
import PostInfo from './postInfo'
import Typography from 'material-ui/Typography'
import _ from 'lodash'

// Styles should go here CSS should go here
const styles = theme => ({
  jsonPane: {
    textAlign: 'left',
  },
  card: {
    margin: theme.spacing.unit
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
            <CardHeader
            title="Metadata"
            />
            <CardContent>
              {_.map(_.keys(responseJSON), (key, i) =>
                key !== 'data' && key !== 'params' ?
                (<Typography color="textSecondary" key={i}>
                  <b>{key}: </b> {responseJSON[key]}
                </Typography>)
                : null
              )}
              <Typography color="textSecondary" >
                <b>Statistics:</b> {responseJSON.params.statistics}
              </Typography>
              <Typography color="textSecondary" noWrap>
                <b>Access Token:</b> {responseJSON.params.access_token}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardHeader
            title="Data"
            />
            <CardContent>

              { activeTab === 0 ?
                <b><CompanyInfo data={data} /></b>
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
