import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div>
      <nav>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="webiste logo"
        />
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <div>
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
