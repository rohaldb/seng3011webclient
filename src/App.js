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
import CompanyCard from './CompanyCard'


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
    accessToken: 'EAACEdEose0cBANf8eFFxjFgIHqalvD0lztnooosuuPzYvo49HZBfD2ntKksrUzv9aANcnr2tIIYpkYZBFIzMGTKmF6UupcVNMTrpPI22sn0lHyPfvsNRJCxMSNP1tJh1Cua13Xqg5s5lhKRsr3qrnGQyZBMeZCLM2usI18zuP0W3ZCJE4yBqbB9wmeEoohMQZD',
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
      'type': true,
      'name': true,
      'message': true,
      'created_time': true,
      'likes': true,
      'comments': true,
    },
    postID: '20531316728_10157104308481729',
    value: 0,
    newCategory: '',
    activeTab: 0
  }

  componentDidMount() {
    this.queryAPI()
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

    // pull out statistics from object
    const pageStatistics = _.keys(_.pickBy(this.state.pageStatistics, (v, k) => v === true)).join(",")
    const postStatistics = _.keys(_.pickBy(this.state.postStatistics, (v, k) => v === true)).join(",")

    const apiBase = searchPage ? `${companyName}?statistics=${pageStatistics}` : `post/${postID}?statistics=${postStatistics}`

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

        { responseJSON ? <CompanyCard responseJSON={responseJSON}/> : null }

      </Grid>
    )
  }
}

export default withStyles(styles)(App)


//{Object.keys(this.state).data}
