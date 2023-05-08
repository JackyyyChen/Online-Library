const Localhost = 'http://127.0.0.1:8000'
function fetchFunc (url, method, data ) {
  const URL = Localhost + url
  const option = {
    credentials: 'include',
    method: method,
    headers: {
      'Content-type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest',
      // Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
    },
    body: JSON.stringify(data)
    //  body:   ? JSON.stringify(data) : undefined
  }
  return fetch(URL,option)  // 将option作为第二个参数传递

    // .catch(error => console.log(error));

}

window.fetchFunc = fetchFunc
export default fetchFunc