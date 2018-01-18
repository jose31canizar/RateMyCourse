import React, { Component } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import './Layout.styl'

class Layout extends Component {
  render() {
    return (
      <div className='layout'>
        <NavBar/>
          {this.props.children}
      </div>
    );
  }
}

export default Layout;
