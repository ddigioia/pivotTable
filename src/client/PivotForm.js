import React from 'react'
import uuid from 'uuid/v4'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

function PivotForm (props) {
  const { ipAddress, traffic, onChange, filter } = props

  return (
    <FormGroup controlId='formControlsSelect'>
      <ControlLabel>Select IP Address</ControlLabel>
      <FormControl
        name='ipAddress'
        componentClass='select'
        placeholder='select'
        onChange={onChange}
        value={ipAddress}
      >
        {
          traffic.ips.map(ip => {
            return (
              <option value={ip} key={ip}>{ ip }</option>
            )
          })
        }
      </FormControl>
      <ControlLabel>Select Filter</ControlLabel>
      <FormControl
        name='filter'
        componentClass='select'
        placeholder='select'
        onChange={onChange}
        value={filter}
      >
        <option value='srcs' key={uuid()}>Outgoing Traffic</option>
        <option value='dests' key={uuid()}>Incoming Traffic</option>
      </FormControl>
    </FormGroup>
  )
}

export default PivotForm
