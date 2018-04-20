import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import ResponseCard from './responseCard'
import moment from 'moment'


import 'typeface-roboto'

// Styles should go here CSS should go here
const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  jsonPane: {
    textAlign: 'left',
  }
});

class App extends Component {

  state = {
    accessToken: 'EAACEdEose0cBADKI26yFN2qNYEyJp5OLPjZAupar1gjY3SuwIeGZBXZCyoEVKlbV0tCZAs0Nc7S0O2UAfl8z41ChDQ1FL40APO49mL7ew0DIwcM3k7ZCqZBjMTdegpxZA2RHDQHDJ2F3xZAoGCObmwbILT4zbZAY42ZC5joWKLCJDInsOzkRfTkds5xIfmwZBywZCvcZD',
    companyName: 'facebook',
    pageStatistics: {
      'id': true,
      'name': true,
      'website': true,
      'description': true,
      'category': true,
      'fan_count': true,
      'posts': true,
    },
    postStatistics: {
      'id': true,
      'type': true,
      'message': true,
      'created_time': true,
      'likes': true,
      'comments': true,
    },
    postID: '20531316728_10157293947771729',
    value: 0,
    newCategory: '',
    activeTab: 0,
    start_date: "",
    end_date: ""
  }
  
  handleChange = (event, shouldReload = false) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    let newState
    if (target.type === 'checkbox') {
        const statisticType = this.state.activeTab === 0 ? "pageStatistics" : "postStatistics"
        newState = {
          [statisticType]: { ...this.state[statisticType], [name]: value}
        }
    } else {
        newState = { [name]: value }
    }
    //need to pass callback function to load API when set state is finished since it is asynch
    this.setState(
      newState,
      () => {
        if (shouldReload) {
          this.queryAPI()
        }
      }
    )
  }

  queryAPI() {
    const { accessToken, companyName, postID, activeTab } = this.state
    const searchPage = activeTab === 0 ? true : false

    //turn date to ISO
    const start_date = (new moment(this.state.start_date)).toISOString()
    const end_date = (new moment(this.state.end_date)).toISOString()

    // pull out statistics from object
    const pageStatistics = _.keys(_.pickBy(this.state.pageStatistics, (v, k) => v === true)).join(",")
    const postStatistics = _.keys(_.pickBy(this.state.postStatistics, (v, k) => v === true)).join(",")

    let apiBase = searchPage ? `${companyName}?statistics=${pageStatistics}` : `post/${postID}?statistics=${postStatistics}`

    if (start_date && end_date) 
      apiBase += `&start_date=${start_date}&end_date=${end_date}` 
    
    fetch(`https://unassigned-api.herokuapp.com/api/${apiBase}&access_token=${accessToken}`)
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data)
          this.setState({ responseJSON: data })
        })
      }
    })
    .catch(error => console.error(error))
  }

  updateTabs = (event, value) => this.setState({ activeTab: value })


  render () {
    const { responseJSON, pageStatistics, postStatistics, activeTab } = this.state
    const { classes } = this.props

    return (
      <Grid container className={classes.root} direction="row">
        <Grid item xs={12}>
          <Grid container justify="center" direction="column">
            <Grid item xs={12}>
              <Paper>
                <Tabs
                  value={this.state.activeTab}
                  onChange={this.updateTabs}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                  centered
                >
                  <Tab label="Query a Company" />
                  <Tab label="Query a Post" />
                </Tabs>
              </Paper>

              <TextField
                label="Access Token"
                name='accessToken'
                className={classes.textField}
                value={this.state.accessToken}
                onChange={this.handleChange}
                margin="normal"
              />

              {activeTab === 0 ?
                (
                  <div>
                    <TextField
                      label="Company Name"
                      name='companyName'
                      className={classes.textField}
                      value={this.state.companyName}
                      onChange={this.handleChange}
                      margin="normal"
                    />

                    <TextField
                      label="Start Date"
                      type="date"
                      name="start_date"
                      className={classes.textField}
                      value={this.state.start_date}
                      onChange={(e) => this.handleChange(e, false)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <TextField
                      label="End Date"
                      type="date"
                      name="end_date"
                      className={classes.textField}
                      onChange={(e) => this.handleChange(e, false)}
                      value={this.state.end_date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <br/>

                    {_.map(_.keys(pageStatistics), (stat, i) =>
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={pageStatistics[stat]}
                            name={stat}
                            onChange={(e) => this.handleChange(e, false)}
                          />
                        }
                        label={stat}
                      />
                    )}

                  </div>
                )
                :
                (
                  <div>
                    <TextField
                      label="Post ID"
                      name='postID'
                      className={classes.textField}
                      value={this.state.postID}
                      onChange={this.handleChange}
                      margin="normal"
                    />

                    <br/>

                    {_.map(_.keys(postStatistics), (stat, i) =>
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={postStatistics[stat]}
                            name={stat}
                            onChange={(e) => this.handleChange(e, false)}
                          />
                        }
                        label={stat}
                      />
                    )}

                  </div>
                )
              }
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
                onClick={() => this.queryAPI()}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>

        { responseJSON ? <ResponseCard responseJSON={responseJSON} activeTab={activeTab}/> : null }

      </Grid>
    )
  }
}

export default withStyles(styles)(App)

