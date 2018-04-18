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
    accessToken: 'EAACEdEose0cBAPmoEBCCGk8SV71GDEb00mMZBtYNEQA0TZBGoxLPaE9gknRDiiYZAwU84AE7vuuGeCcVWuc7XZAXgZCxOnsa7CT4rePwZCfFKTUj6tvhCUofxHHx22EtBgKbmGPECAAZCWXzEQHPug0Qgk72RFIVwGo1UM3K9LyaOuBIrFTrhdd23eIN100fPMZD',
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
    postStatistics: '',
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

  handleDelete = data => () => {
    const pageStatistics = [...this.state.pageStatistics]
    const chipToDelete = pageStatistics.indexOf(data)
    pageStatistics.splice(chipToDelete, 1)
    this.setState({ pageStatistics })
  }

  queryAPI() {
    const { accessToken, companyName, postStatistics, postID, activeTab } = this.state
    const searchPage = activeTab === 0 ? true : false

    // pull out pageStatistics from object
    const pageStatistics = _.map(this.state.pageStatistics, x => x.label)

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

  addCategory = () => {
    let pageStatistics = [...this.state.pageStatistics]
    
    //generate new key from 0 .. 10000
    let key = Math.floor((Math.random() * 10000) + 1)
    // ensure the keyis unique
    while (!_.isEmpty(_.filter(pageStatistics, stat => stat.key === key ))) {
      key = Math.floor((Math.random() * 10000) + 1)
    }
    
    pageStatistics.push({ key, label: this.state.newCategory })
    this.setState({ pageStatistics })

  }


  render () {
    const { responseJSON } = this.state
    const { classes } = this.props

    return (
      <Grid container alignItems="center" spacing={0} direction="column" className={classes.root}>
        <Grid item>
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


                {/* <TextField
                  label="Page Statistics"
                  name='pageStatistics'
                  className={classes.textField}
                  value={this.state.pageStatistics}
                  onChange={this.handleChange}
                  margin="normal"
                /> */}
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
