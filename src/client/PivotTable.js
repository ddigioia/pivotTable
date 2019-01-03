import React from 'react'
import uuid from 'uuid/v4'
import { Table } from 'react-bootstrap'

function PivotTable (props) {
  const { filter, traffic, ipAddress, isPopulated } = props

  if (!isPopulated) return <p>'Loading...'</p>

  const colName = filter === 'srcs' ? 'Outgoing Traffic' : 'Incoming Traffic'
  const key = filter === 'srcs' ? 'dest' : 'src'
  const data = traffic[filter] ? traffic[filter][ipAddress] : null

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th scope='col'>{ colName }</th>
          <th scope='col'>Bytes</th>
        </tr>
      </thead>
      <tbody>
        {
          data ? data.map(obj => {
            return (
              <tr key={uuid()}>
                <td>{ obj[key] }</td>
                <td>{ obj.bytes }</td>
              </tr>
            )
          }) : <tr><td colSpan='2'>No results</td></tr>
        }
      </tbody>
    </Table>
  )
}

export default PivotTable
