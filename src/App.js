import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import JSONTree from 'react-json-tree'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
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
  chip: {
    margin: theme.spacing.unit / 2,
  }
})

class App extends Component {

  state = {
    accessToken: 'EAACEdEose0cBADZAniu5Ou11v7nlZB5wZA0JyRMTbVGVIZBZANS2kPPHFVct3VrZChkVzRKfPQV2L2LyCIFXAEUCb9To5GtRPmeoPAkK29tvpchv9Q8Xi1Hr9jcdGejuZB4C2PrQlfUMkgMhlMjhurDJoSvDbHKU3KBgDVmZBMHWevFdwBXEUUNldCqal7ZAyhPgZD',
    companyName: 'facebook',
    pageStatistics: [
      { key: 0, label: 'id' },
      { key: 1, label: 'name' },
      { key: 2, label: 'website' },
      { key: 3, label: 'description' },
      { key: 4, label: 'category' },
      { key: 5, label: 'fan_count' },
      { key: 6, label: 'posts' },
    ],
    postStatistics: [
      { key: 0, label: 'type' },
      { key: 1, label: 'name' },
      { key: 2, label: 'message' },
      { key: 3, label: 'created_time' },
      { key: 4, label: 'likes' },
      { key: 5, label: 'comments' },
    ],
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
    const { accessToken, companyName, postID, activeTab } = this.state
    const searchPage = activeTab === 0 ? true : false

    // pull out statistics from object
    const pageStatistics = _.map(this.state.pageStatistics, x => x.label).join(",")
    const postStatistics = _.map(this.state.postStatistics, x => x.label).join(",")

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

  updateTabs = (event, value) => {
    this.setState({ activeTab: value })
  }

  handleDelete = (data, pageStatistics = true) => () => {
    let statistics = [...pageStatistics ? this.state.pageStatistics : this.state.postStatistics]

    const chipToDelete = statistics.indexOf(data)
    statistics.splice(chipToDelete, 1)

    const statKey = pageStatistics ? "pageStatistics" : "postStatistics"
    this.setState({ [statKey]: statistics })
  }

  addCategory = (pageStatistics = true) => {
    let statistics = [...pageStatistics ? this.state.pageStatistics : this.state.postStatistics]

    //generate new key from 0 .. 10000
    let key = Math.floor((Math.random() * 10000) + 1)
    // ensure the keyis unique
    while (!this.uniqueKey(statistics, key)) {
      key = Math.floor((Math.random() * 10000) + 1)
    }

    statistics.push({ key, label: this.state.newCategory })

    const statKey = pageStatistics ? "pageStatistics" : "postStatistics"
    this.setState({ [statKey]: statistics, newCategory: '' })
  }

  //checks whether the given statistics array contains an elem with the given key
  uniqueKey = (statistics, key) =>
    _.isEmpty(_.filter(statistics, stat => stat.key === key ))



  render () {
    const { responseJSON } = this.state
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

                    <br/>

                    <TextField
                      label="Add Category"
                      name="newCategory"
                      className={classes.textField}
                      value={this.state.newCategory}
                      onChange={this.handleChange}
                      margin="normal"
                    />

                    <Button
                      variant="raised"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      onClick={() => this.addCategory()}>
                      Add Category
                    </Button>

                    {this.state.pageStatistics.map(data =>
                        <Chip
                          key={data.key}
                          label={data.label}
                          onDelete={this.handleDelete(data)}
                          className={classes.chip}
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

                    <TextField
                      label="Add Category"
                      name="newCategory"
                      className={classes.textField}
                      value={this.state.newCategory}
                      onChange={this.handleChange}
                      margin="normal"
                    />

                    <Button
                      variant="raised"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      onClick={() => this.addCategory(false)}>
                      Add Category
                    </Button>

                    {this.state.postStatistics.map(data =>
                        <Chip
                          key={data.key}
                          label={data.label}
                          onDelete={this.handleDelete(data, false)}
                          className={classes.chip}
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


              {responseJSON ?
                <JSONTree data={responseJSON} shouldExpandNode={(keyName, data) => keyName.includes("posts") ? false : true}/>
                : null
              }

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App)
