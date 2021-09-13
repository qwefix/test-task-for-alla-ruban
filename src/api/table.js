import * as axios from 'axios'

const tableAPI = () => axios.get(
    'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
    .then(res => res.data)
export default tableAPI
