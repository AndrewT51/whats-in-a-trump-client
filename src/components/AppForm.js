import './AppForm.css'
import 'react-awesome-button/dist/styles.css'
import React, { Component } from 'react'
import { AwesomeButton } from 'react-awesome-button'
import  Autocomplete from 'react-autocomplete';
import axios from 'axios'

const inputProps = {
  className: 'form-input',
  placeholder: 'Pick a topic...'
}

const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  width: '220px',
  padding: '2px 0',
  fontSize: '70%',
  position: 'fixed',
  overflow: 'auto',
  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
}

class AppForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      items: [],
      quotes: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.filteredList = this.filteredList.bind(this)
  }

  async componentDidMount() {
    let {data: tags} = await axios.get('http://localhost:7832/tags')
    if (tags && tags.tags.length) {
      this.setState({
        items: tags.tags
      })
    }
  }

  async handleSearch () {
    if (this.state.value === '') return
    this.setState({value: ''})
    try {
      let {data} = await axios.get(`http://localhost:7832/quote/${this.state.value}`)
      this.setState({quotes: data})
      this.props.setCurrentQuote(data)
    } catch (e) {
      this.props.setCurrentQuote({
        quote: null
      })
    }
  }

  async handleRandom () {
    let {data} = await axios.get('http://localhost:7832/random')
    this.props.setCurrentQuote(data)
  }

  renderItem (item, isHighlighted) {
    return (
      <div key={item}>{item}</div>
    )
  }

  renderMenu (items, value, style) {
    console.log('style:', style)
    return (
      <div
        style={{...style, ...menuStyle, color: 'black', backgroundColor: 'white'}}
        children={items}
      />
    )
  }

  handleChange (evt) {
    this.setState({value: evt.target.value})
    // send request to find matching items
    // then set the list to be equal to the result
  }

  filteredList () {
    const { items } = this.state
    return items.filter(item =>
      item.toLowerCase().includes(this.state.value.toLowerCase())
    )
  }

  handleSelect (str) {
    this.setState({ value: str})
  }

  render() {
    return (
      <div className="form-container">
        <div className="form-button-pair">
          <AwesomeButton
            type="facebook"
            action={this.handleSearch}
          >
            Search
          </AwesomeButton>
          <AwesomeButton
            type="facebook"
            action={this.handleRandom}
          >
            Random Tweet
          </AwesomeButton>
        </div>
        <Autocomplete
          inputProps={inputProps}
          items={this.filteredList()}
          getItemValue={ item => item}
          renderItem={this.renderItem}
          renderMenu={this.renderMenu}
          onChange={this.handleChange}
          value={this.state.value}
          onSelect={this.handleSelect}
        />
      </div>
    )
  }
}

export default AppForm

