import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePIN = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPINField = () => {
    const {pin} = this.state
    return (
      <>
        <label htmlFor="pin">PIN</label>
        <input
          type="password"
          id="pin"
          value={pin}
          onChange={this.onChangePIN}
          placeholder="Enter PIN"
        />
      </>
    )
  }

  renderUserIdField = () => {
    const {userId} = this.state
    return (
      <>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={this.onChangeUserId}
          placeholder="Enter User Id"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    console.log(errorMsg, showSubmitError)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1>Welcome Back!</h1>
          <div>{this.renderUserIdField()}</div>
          <div>{this.renderPINField()}</div>
          <button type="submit">Login</button>
          {showSubmitError && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
