import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import _ from 'lodash'
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// Styles should go here CSS should go here
const styles = theme => ({
});

class CompanyInfo extends Component {

  // static propTypes = {
  //   // data: PropTypes.object.isRequired
  // }

  render () {
    const { data } = this.props

    return (
      <div>
        {data && data.name ?
        (
          <Typography variant="display1" >
            {data.name}
          </Typography>
        ): null}

        {_.map(_.keys(data), (key, i) =>
          key !== 'posts' && key !== 'name' ?
          (<Typography color="textSecondary" key={i}>
            {`${key}: ${data[key]}`}
          </Typography>)
          : null
        )}

        <p> POSTS GO HERE </p>
          {console.log(data.posts)}


          {Object.values(data.posts).map((item,index) =>
            <Typography color="textSecondary" key={index}>
              {`Post ${index}: message: ${item.message} `}
            </Typography>
          )}






      </div>
    )
  }
}

export default withStyles(styles)(CompanyInfo)

//
// {_.map(_.keys(data.posts), (key, i) =>
//   key !== 'posts' && key !== 'name' ?
//   (<Typography color="textSecondary" key={i}>
//     {`${key}: ${data.posts[key]}`}
//   </Typography>)
//   : null
// )}
