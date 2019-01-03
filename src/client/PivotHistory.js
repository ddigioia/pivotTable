import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import uuid from 'uuid/v4'

function PivotHistory (props) {
  const { history, onClick } = props

  if (history.length === 0) return <p>No recent searches.</p>

  function handleClick (e) {
    const ipAddress = e.target.getAttribute('address')
    const filter = e.target.getAttribute('filter')
    onClick({ ipAddress, filter })
  }

  return (
    <ListGroup>
      <p><b>History</b></p>
      {
        history.map(item => {
          const filter = item.filter === 'srcs' ? 'Outgoing Traffic' : 'Incoming Traffic'
          return (
            <ListGroupItem
              onClick={handleClick} key={uuid()}
              address={item.ipAddress}
              filter={item.filter}
            >
              <span><b>Ip Address: </b></span>
              { item.ipAddress }
              <br />
              <span><b>Filter: </b></span>
              { filter }
            </ListGroupItem>
          )
        })
      }
    </ListGroup>
  )
}

export default PivotHistory
