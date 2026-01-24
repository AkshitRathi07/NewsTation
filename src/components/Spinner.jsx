import React, { Component } from 'react'
import loading from './loading.gif'
export class spinner extends Component {
  render() {
    return (
      <div className="text-center text-sm">
        <img className="my-3" size={24} height={50} src={loading} alt="loading"/>
      </div>
    )
  }
}

export default spinner
