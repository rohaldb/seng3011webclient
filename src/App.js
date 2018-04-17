import React, { Component } from 'react'
import './App.css'
import JSONTree from 'react-json-tree'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

// Styles should go here CSS should go here
const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class App extends Component {

  state = {
    accessToken: 'EAACEdEose0cBAAXK5ZBl7hGS8ei8pYvkSRWNOsja90z2JemNRwjK8N3BXB4cfKlPGZAuP8ke6Yz9GFuKEDHdodRIWlPZCXk7ehx1swHFPSfgVeFuit6NZAZARh0MG03E682giriYo6Lov4vMroCVwzBOOrgLnLjCMk38Nq9QnXDnjpTAo1gQweq5nSHx3VC0ZD',
    companyName: 'facebook',
    pageStatistics: '',
    searchPage: true,
    postStatistics: '',
    postID: '20531316728_10157104308481729'
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
    const { accessToken, companyName, pageStatistics, postStatistics, postID, searchPage } = this.state

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

  render () {
    const { responseJSON } = this.state
    const { classes } = this.props

    return (
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={10}>
          <p>Access Token</p>
          <input
            type='text'
            name='accessToken'
            value={this.state.accessToken}
            onChange={this.handleChange}
          />

          <p>Searching Page? (alternative is posts)</p>
          <input
            type="checkbox"
            name="searchPage"
            checked={this.state.searchPage}
            onChange={(e) => this.handleChange(e, true)}
          />

          {this.state.searchPage ?
            (
              <div>
                <p>Company Name:</p>
                <input
                  type='text'
                  name='companyName'
                  value={this.state.companyName}
                  onChange={this.handleChange}
                />
                <p>Page Statistics:</p>
                <input
                  type='text'
                  name='pageStatistics'
                  value={this.state.pageStatistics}
                  onChange={this.handleChange}
                />
              </div>
            )
            :
            (
              <div>
                <p>Post ID:</p>
                <input
                  type='text'
                  name='postID'
                  value={this.state.postID}
                  onChange={this.handleChange}
                />
                <p>Post Statistics:</p>
                <input
                  type='text'
                  name='postStatistics'
                  value={this.state.postStatistics}
                  onChange={this.handleChange}
                />
              </div>
            )
          }
          <button onClick={() => this.queryAPI()}>Search</button>

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
