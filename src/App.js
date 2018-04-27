import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import Select from 'react-select';
import Companies from './companies.js';
import ResponseCard from './responseCard'
import moment from 'moment'
import Typography from 'material-ui/Typography'
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress'

import 'typeface-roboto'

// Styles should go here CSS should go here
const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: '100px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  jsonPane: {
    textAlign: 'left',
  },
  margin: {
    margin: theme.spacing.unit * 4
  }
});

const prod = process.env.NODE_ENV === 'production'

class App extends Component {

  state = {
    accessToken: prod ? '' : 'EAACEdEose0cBAKhPDpK7r8yQEeIGKJZC3Msg22UbsvrsfCYj1NzWevtqis8uyw3tjGzMecJQNL2IYuSxFaRnpfA72X7VbTbT2o2L5hKFHqchxzuUDwYKjGoqYeyCDpFp0yt7Yt1g59HrugfL6zFlZBkQFa4LUMVvDevftcL2oAqj4UoCzGnyhJqEgdD0wZD',
    companyName: prod ? '' : 'facebook',

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
    postID: prod ? '' : '20531316728_10157293947771729',
    value: 0,
    newCategory: '',
    activeTab: 0,
    start_date: "",
    end_date: "",
    dialogOpen: false,
    loading: false,
    selectedOption: '',
    companiesList: Companies
  }


  disableButton = () => {
    if (this.state.activeTab === 0) {
      return _.filter(this.state.pageStatistics).length > 0 ? false : true
    } else {
      return _.filter(this.state.postStatistics).length > 0 ? false : true
    }
  }

  handleChangeSelect = (selectedOption) => {
      this.setState({ selectedOption });
      if (selectedOption.label) {
          this.setState({ companyName: selectedOption.value })
      } else {
          this.setState({ companyName: '' })
      }
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
      if (companyName) {
          //turn date to ISO
          const start_date = (new moment(this.state.start_date)).seconds(0).milliseconds(0).toISOString()
          const end_date = (new moment(this.state.end_date)).seconds(0).milliseconds(0).toISOString()

          // pull out statistics from object
          const pageStatistics = _.keys(_.pickBy(this.state.pageStatistics, (v, k) => v === true)).join(",")
          const postStatistics = _.keys(_.pickBy(this.state.postStatistics, (v, k) => v === true)).join(",")

          let apiBase = searchPage ? `${companyName}?statistics=${pageStatistics}` : `post/${postID}?statistics=${postStatistics}`

          var regExp = /(\d{4})-(\d{2})-(\d{2})/

          if (start_date && end_date && (parseInt(end_date.replace(regExp, "$1$2$3"),10) > parseInt(start_date.replace(regExp, "$1$2$3"),10))){
              apiBase += `&start_date=${start_date.match(regExp)[0]}&end_date=${end_date.match(regExp)[0]}`
              //console.log(apiBase)
          }else{
              //pls someone handle the fact that both dates werent entered or that end_Date > start_date i.e. invalid dates/date range
          }


          this.setState({ loading: true })
          fetch(`https://unassigned-api.herokuapp.com/api/${apiBase}&access_token=${accessToken}`)
          .then((response) => {
              if (response.ok) {
                  response.json().then(data => {
                      console.log(data)
                      this.setState({ responseJSON: data, loading: false })
                  })
              }
          })
          .catch(error => console.error(error))
      }
  }

  updateTabs = (event, value) => {
    if (value !== this.state.activeTab) { // Different tab
      this.setState({activeTab: value, responseJSON: null});
    }
  };


  render () {
    const { responseJSON, pageStatistics, postStatistics, activeTab, dialogOpen, loading, selectedOption } = this.state
    const { classes } = this.props

    return (
      <Grid container className={classes.root} direction="column">
        <Grid item xs={12}>
          <Grid container justify="center" direction="row">
            <Grid item xs={8}>

              <Typography variant="display2" gutterBottom color="secondary" className={classes.margin}>
                Team Unnasigned API Web Client
              </Typography>

              <Typography gutterBottom variant="body1" color="primary" paragraph>
                This application serves as an interface to our Facebook company information API.
              </Typography>
              <Typography gutterBottom variant="body1" color="primary" paragraph>
                Before continuing, please <a href="https://documenter.getpostman.com/view/3928503/RVtyoBYu" rel="noopener noreferrer" target="_blank">visit the documentation</a> and ensure you have a <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer">valid access token.</a>
              </Typography>
              <Button size="medium" variant="raised" color="secondary" onClick={() => this.setState({ dialogOpen: true })}>
                Why do I have to manually enter an access token?
              </Button>

              <Dialog
                  open={dialogOpen}
                  onClose={() => this.setState({ dialogOpen: false })}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Why access tokens need to be manually entered"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Following the recent Cambridge Analytica scandal, Facebook has prevented new users from generating permanent API keys. As a temporary solution, we request that you generate a user access token thorugh the <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer">tool explorer</a> and use it to run the client.
                    </DialogContentText>
                  </DialogContent>
                </Dialog>

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

              <form onSubmit={(e) => {
                e.preventDefault()
                this.queryAPI()
              }}>

                <TextField
                  label="Access Token"
                  name='accessToken'
                  className={classes.textField}
                  value={this.state.accessToken}
                  onChange={this.handleChange}
                  margin="normal"
                  required
                  style={{width: '600px'}}
                />

                {activeTab === 0 ?
                  (
                    <div>
                      <Grid container justify="center" direction="row">
                        <Grid item xs={6} style={{padding: '20px'}}>
                          <Select
                              placeholder="Company Name"
                              name="companyName"
                              value={this.state.companyName.label}
                              onChange={this.handleChangeSelect}
                              options={this.state.companiesList}
                          />
                        </Grid>
                      </Grid>

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
                        required
                        style={{width: '300px'}}
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
                  type="sumbit"
                  variant="raised"
                  color="primary"
                  className={classes.button}
                  disabled={this.disableButton()}
                  >
                  Search
                </Button>

              </form>

              { loading ? <CircularProgress className={classes.margin} size={70} color="secondary" /> :
                responseJSON ? <ResponseCard responseJSON={responseJSON} activeTab={activeTab}/> : null }

            </Grid>
          </Grid>
        </Grid>


      </Grid>
    )
  }
}

export default withStyles(styles)(App)
