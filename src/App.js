import React, { Component } from 'react'
import './App.css'
import JSONTree from 'react-json-tree'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
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
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {

  state = {
    accessToken: 'EAACEdEose0cBAPmoEBCCGk8SV71GDEb00mMZBtYNEQA0TZBGoxLPaE9gknRDiiYZAwU84AE7vuuGeCcVWuc7XZAXgZCxOnsa7CT4rePwZCfFKTUj6tvhCUofxHHx22EtBgKbmGPECAAZCWXzEQHPug0Qgk72RFIVwGo1UM3K9LyaOuBIrFTrhdd23eIN100fPMZD',
    companyName: 'facebook',
    pageStatistics: '',
    postStatistics: '',
    postID: '20531316728_10157104308481729',
    value: 0,
    activeTab: 0
  }

  componentDidMount() {
    this.queryAPI()
  }

  handleChange = (event, shouldReload = false) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    //need to pass callback function to load API when set state is finished since it is asynch
    this.setState(
      { [name]: value },
      () => {
        if (shouldReload) {
          this.queryAPI()
        }
      }
    )
  }

  queryAPI() {
    const { accessToken, companyName, pageStatistics, postStatistics, postID, activeTab } = this.state
    const searchPage = activeTab === 0 ? true : false

    const apiBase = searchPage ? `${companyName}?statistics=${pageStatistics}` : `post/${postID}?statistics=${postStatistics}`

    fetch(`https://unassigned-api.herokuapp.com/api/${apiBase}&access_token=${accessToken}`)
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          this.setState({ responseJSON: data })
        })
      }
    })
    .catch(error => console.error(error))
  }

  updateTabs = (event, value) => {
    this.setState({ activeTab: value })
  }

  render () {
    const { responseJSON } = this.state
    const { classes } = this.props

    return (
      <Grid container alignItems="center" spacing={0} direction="column" className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.root}>
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
          
          {this.state.activeTab === 0 ?
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
                  label="Page Statistics"
                  name='pageStatistics'
                  className={classes.textField}
                  value={this.state.pageStatistics}
                  onChange={this.handleChange}
                  margin="normal"
                />
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

                <TextField
                  label="Post Statistics"
                  name='postStatistics'
                  className={classes.textField}
                  value={this.state.postStatistics}
                  onChange={this.handleChange}
                  margin="normal"
                />

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


          {responseJSON ?
            <JSONTree data={responseJSON} shouldExpandNode={(keyName, data) => keyName.includes("posts") ? false : true}/>
            : null
          }
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App)
