import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {
  Grid,
  Row,
  Col,
  PageHeader
} from 'react-bootstrap'
import PivotTable from './PivotTable'
import PivotForm from './PivotForm'
import PivotHistory from './PivotHistory'
import transformData from './helpers/transformData'
import { saveStateToLocalStorage, getStateFromLocalStorage } from './helpers/localStorageHelpers'

class App extends Component {
  signal = axios.CancelToken.source()

  constructor (props) {
    super(props)
    const history = getStateFromLocalStorage()
    const prevState = history ? history[0] : null

    this.state = {
      traffic: {
        dests: {},
        srcs: {},
        ips: []
      },
      isLoading: false,
      isPopulated: false,
      filter: prevState ? prevState.filter : 'srcs',
      ipAddress: prevState ? prevState.ipAddress : '',
      history: history ? history : []
    }
  }

  async fetchTrafficData () {
    try {
      this.setState({ isLoading: true })
      const res = await axios.get('/traffic', {
        cancelToken: this.signal.token
      })
      const traffic = transformData(res.data)

      this.setState({
        traffic,
        isLoading: false,
        isPopulated: true,
        ipAddress: this.state.ipAddress ? this.state.ipAddress : traffic.ips[0]
      })
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log(err.message)
      } else {
        this.setState({ isLoading: false })
      }
    }
  }

  componentDidMount () {
    this.fetchTrafficData()
  }

  componentWillUnmount () {
    this.signal.cancel('Traffic fetch being canceled.')
  }

  handleChange (e) {
    const { name, value } = e.target
    const { ipAddress, filter } = this.state
    const newHistoryItem = { ...{ ipAddress, filter }, ...{ [name]: value } }

    this.saveHistory(newHistoryItem)
  }

  handleClick (newHistoryItem) {
    this.saveHistory(newHistoryItem)
  }

  saveHistory (newHistoryItem) {

    const { history } = this.state
    const newHistory = [...history]
    newHistory.unshift(newHistoryItem)

    if (newHistory.length > 5) newHistory.pop()

    this.setState({
      ...newHistoryItem,
      ...{ history: newHistory }
    }, () => saveStateToLocalStorage(newHistory))
  }

  render () {
    const { ipAddress, traffic, filter, isPopulated, history } = this.state
    return (
      <div>
        <PageHeader>
          Pivot Table <small>for IP traffic</small>
        </PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col xs={ 12 } md={ 3 }>
              <PivotForm
                ipAddress={ ipAddress }
                traffic={ traffic }
                onChange={ e => this.handleChange(e) }
                filter={ filter }
              />
              <PivotHistory
                history={ history }
                onClick={ item => this.handleClick(item) }
              />
            </Col>
            <Col xs={ 12 } md={ 9 }>
              <PivotTable
                ipAddress={ ipAddress }
                traffic={ traffic }
                filter={ filter }
                isPopulated={ isPopulated }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))