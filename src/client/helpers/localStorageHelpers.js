/**
 * Gets and sets history to local storage
*/

export function saveStateToLocalStorage (data) {
  try {
    const history = JSON.stringify(data)
    window.localStorage.setItem('history', history)
  } catch (e) {
    console.log('Error: ', e)
  }
}

export function getStateFromLocalStorage () {
  try {
    const strState = window.localStorage.getItem('history')
    return strState && JSON.parse(strState)
  } catch (e) {
    console.log('Error: ', e)
  }
}
