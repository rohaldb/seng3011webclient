import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import Select from 'react-select';
import Companies from './companies.json';
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

class App extends Component {

  state = {
    accessToken: 'EAACEdEose0cBABmNDdEv7s4Uh8I8vLX1m4zZBWbouZChH8NuSaZAUQ5HM92rnX7ZAZBw8eWudcpIuIJmZA4VCbeN6cKjwxh7hvkaKyDjzE1GVN0wPPenEJf9nZBvL64oxZAItFQXpo2pZBeUiAq9UixrVKSXwBr4NM20GWzjcj66kjyKglIU248up6H8ucmgsqzgZD',
    companyName: 'facebook',
    fullCompanyName: 'Facebook',
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
    end_date: "",
    dialogOpen: false,
    loading: false,
    selectedOption: '',
    // companiesList: Companies
    // companiesList: [{ value: 'Facebook', label: 'facebook' }, { value: 'Woolworths', label: 'woolworths' }, { value: 'Google', label: 'google' }],
    companiesList: [
        {"label": "3PL-3P LEARNING LIMITED", "value": "3plearning"},
        {"label": "AGL-AGL ENERGY LIMITED", "value": "182118848546753"},
        {"label": "AIZ-AIR NEW ZEALAND LIMITED", "value": "airnewzealand"},
        {"label": "AMP-AMP LIMITED", "value": "379344338814828"},
        {"label": "AST-AUSNET SERVICES LIMITED", "value": "512280309135240"},
        {"label": "ANZ-AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED", "value": "208091002641679"},
        {"label": "AOG-AVEO GROUP", "value": "AveoRetirement"},
        {"label": "BLX-BEACON LIGHTING GROUP LIMITED", "value": "BeaconLighting"},
        {"label": "BAL-BELLAMY'S AUSTRALIA LIMITED", "value": "116365719228"},
        {"label": "BHP-BHP BILLITON LIMITED", "value": "BHPQLDNSW"},
        {"label": "BBG-BILLABONG INTERNATIONAL LIMITED", "value": "Billabong"},
        {"label": "BKL-BLACKMORES LIMITED", "value": "110734276784"},
        {"label": "CTX-CALTEX AUSTRALIA LIMITED", "value": "177082569311397"},
        {"label": "CZZ-CAPILANO HONEY LIMITED", "value": "CapilanoHoney"},
        {"label": "CCL-COCA-COLA AMATIL LIMITED", "value": "40796308305"},
        {"label": "CBA-COMMONWEALTH BANK OF AUSTRALIA", "value": "120184674661521"},
        {"label": "CPU-COMPUTERSHARE LIMITED", "value": "191290497560822"},
        {"label": "DTL-DATA#3 LIMITE", "value": "Data3Limited"},
        {"label": "DXS-DEXUS", "value": "156410154898673"},
        {"label": "DMP-DOMINO'S PIZZA ENTERPRISES LIMITED", "value": "53320451411"},
        {"label": "FXJ-FAIRFAX MEDIA LIMITED", "value": "1511376765749432"},
        {"label": "GPX-GRAPHEX MINING LIMITED", "value": "graphexmininglimited"},
        {"label": "HVN-HARVEY NORMAN HOLDINGS LIMITED", "value": "177019836023"},
        {"label": "HCS-HYUNDAI CAPITAL SERVICES, INC", "value": "HyundaiAustralia"},
        {"label": "IPL-INCITEC PIVOT LIMITED", "value": "102228960384996"},
        {"label": "ISU-ISELECT LIMITED", "value": "iselect"},
        {"label": "JAY-JAYRIDE GROUP LIMITED", "value": "Jayride"},
        {"label": "JBH-JB HI-FI LIMITED", "value": "JBHiFi"},
        {"label": "KGN-KOGAN.COM LTD", "value": "Kogan"},
        {"label": "MQG-MACQUARIE GROUP LIMITED", "value": "249952428450142"},
        {"label": "MPL-MEDIBANK PRIVATE LIMITED", "value": "337166469633637"},
        {"label": "NAN-NANOSONICS LIMITED", "value": "394160947626328"},
        {"label": "NAB-NATIONAL AUSTRALIA BANK LIMITED", "value": "174238599281322"},
        {"label": "NVT-NAVITAS LIMITED", "value": "294395941429"},
        {"label": "NCK-NICK SCALI LIMITED", "value": "NickScaliFurniture"},
        {"label": "OZL-OZ MINERALS LIMITED", "value": "1489754491319366"},
        {"label": "PVA-PSIVIDA CORP", "value": "pSividaCorp"},
        {"label": "QAN-QANTAS AIRWAYS LIMITED", "value": "8662337685"},
        {"label": "QBE-QBE INSURANCE GROUP LIMITED", "value": "1562214844057141"},
        {"label": "RCL-READCLOUD LIMITED", "value": "readcloud"},
        {"label": "RNT-RENT.COM.AU LIMITED", "value": "rent.com.au"},
        {"label": "RMD-RESMED INC", "value": "579199552279600"},
        {"label": "RIO-RIO TINTO LIMITED", "value": "1452904361600284"},
        {"label": "STO-SANTOS LIMITED", "value": "379599458837842"},
        {"label": "SEK-SEEK LIMITED", "value": "8286673812"},
        {"label": "SRS-SPICERS LIMITED", "value": "spicersaus"},
        {"label": "SDF-STEADFAST GROUP LIMITED", "value": "1834735733421103"},
        {"label": "SUN-SUNCORP GROUP LIMITED", "value": "507120152671521"},
        {"label": "SYD-SYDNEY AIRPORT", "value": "296830467022294"},
        {"label": "TGR-TASSAL GROUP LIMITED", "value": "177765718926129"},
        {"label": "TNE-TECHNOLOGY ONE LIMITED", "value": "759547527498506"},
        {"label": "TLS-TELSTRA CORPORATION LIMITED", "value": "9322764314"},
        {"label": "A2M-THE A2 MILK COMPANY LIMITED", "value": "93657569770"},
        {"label": "TRS-THE REJECT SHOP LIMITED", "value": "rejectshop"},
        {"label": "TPM-TPG TELECOM LIMITED", "value": "TPGTelecom"},
        {"label": "WEB-WEBJET LIMITED", "value": "172590862796993"},
        {"label": "WFD-WESTFIELD CORPORATION", "value": "Westfield"},
        {"label": "WBC-WESTPAC BANKING CORPORATION", "value": "102801482742"},
        {"label": "WPL-WOODSIDE PETROLEUM LIMITED", "value": "woodsideenergy"},
        {"label": "WOW-WOOLWORTHS GROUP LIMITED", "value": "147632815308858"},
        {"label": "WOR-WORLEYPARSONS LIMITED", "value": "111461155538235"},
        {"label": "XRO-XERO LIMITED", "value": "119615178068730"},
        {"label": "AMD-Advanced Micro Devices, Inc", "value": "AMDAUNZ"},
        {"label": "GOOG-Alphabet Google Inc", "value": "google"},
        {"label": "GOOGL-Alphabet Google Inc", "value": "google"},
        {"label": "AAPL-Apple Inc", "value": "apple"},
        {"label": "BIDU-Baidu, Inc", "value": "Baiduers"},
        {"label": "CSCO-Cisco Systems, Inc", "value": "Cisco"},
        {"label": "COST-Costco Wholesale Corporation", "value": "costco"},
        {"label": "FB-Facebook, Inc", "value": "facebook"},
        {"label": "INTC-Intel Corporation", "value": "intel"},
        {"label": "JBLU-JetBlue Airways Corporation", "value": "jetblue"},
        {"label": "MSFT-Microsoft Corporation", "value": "microsoft"},
        {"label": "NVDA-NVIDIA Corporation", "value": "nvidia"},
        {"label": "QCOM-QUALCOMM Incorporated", "value": "Qualcomm"},
        {"label": "TXN-Texas Instruments Incorporated", "value": "TIEurope"},
        {"label": "XOMA-XOMA Corporation", "value": "exxonmobil"},
        {"label": "ACN-Accenture plc", "value": "accenture"},
        {"label": "DVMT-Dell Technologies Inc", "value": "Dell"},
        {"label": "HPE-Hewlett Paclabelrd Enterprise Company", "value": "HewlettPaclabelrdEnterprise"},
        {"label": "IBM-International Business Machines Corporation", "value": "IBMAustralia"},
        {"label": "NKE-Nike, Inc", "value": "nike"},
        {"label": "ORCL-Oracle Corporation", "value": "Oracle"},
        {"label": "RMD-ResMed Inc", "value": "579199552279600"},
        {"label": "RDS.A-Royal Dutch Shell PLC", "value": "shell"},
        {"label": "RDS.B-Royal Dutch Shell PLC", "value": "shell"},
        {"label": "SAP-SAP SE", "value": "sapanz"},
        {"label": "SKM-SK Telecom Co., Ltd", "value": "sktworld"},
        {"label": "TTM-Tata Motors Ltd", "value": "TataMotorsGroup"},
        {"label": "TWTR-Twitter, Inc", "value": "twitterinc"}]
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
          this.state.companyName = selectedOption.value
          // this.state.fullCompanyName = selectedOption.value
      } else {
          this.state.companyName = 'facebook'
      }
  }

  handleChange = (event, shouldReload = false) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    let newState
    if (target.type === 'checkbox') {
        console.log("in checkbox")
        const statisticType = this.state.activeTab === 0 ? "pageStatistics" : "postStatistics"
        newState = {
          [statisticType]: { ...this.state[statisticType], [name]: value}
        }
    } else {
        console.log("in name")
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
    // companyName = this.companyName.label
    console.log(companyName)
    //turn date to ISO
    const start_date = (new moment(this.state.start_date)).seconds(0).milliseconds(0).toISOString()
    const end_date = (new moment(this.state.end_date)).seconds(0).milliseconds(0).toISOString()

    // pull out statistics from object
    const pageStatistics = _.keys(_.pickBy(this.state.pageStatistics, (v, k) => v === true)).join(",")
    const postStatistics = _.keys(_.pickBy(this.state.postStatistics, (v, k) => v === true)).join(",")

    let apiBase = searchPage ? `${companyName}?statistics=${pageStatistics}` : `post/${postID}?statistics=${postStatistics}`

    if (start_date && end_date)
      apiBase += `&start_date=${start_date.match(/(\d{4})-(\d{2})-(\d{2})/)[0]}&end_date=${end_date.match(/(\d{4})-(\d{2})-(\d{2})/)[0]}`

    this.setState({ loading: true })
    fetch(`https://unassigned-api.herokuapp.com/api/v3/${apiBase}&access_token=${accessToken}`) /* TODO: remove v3 later */
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
                        With the ongoing Cambridge Analytica scandal, Facebook have been under intense scrutiny to increase security and protect user privacy. As a consequence of this, they have now retracted the ability to acquire a permanent access_token. Instead, users must frequently generate temporary access_tokens in order to use the Graph API.
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

                        <Select
                            label="Company Name"
                            name="companyName"
                            // value={this.state.companyName.label}
                            fullCompanyName
                            value={this.state.companyName.label}
                            onChange={this.handleChangeSelect}
                            options={this.state.companiesList}
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
