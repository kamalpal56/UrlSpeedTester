import { useState } from 'react'
import PageSpeedChecker from './components/PageSpeedChecker';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        {/* <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1> */}
  <PageSpeedChecker/>
    </>
  )
}

export default App
