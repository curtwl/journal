import axios from 'axios'
import Header from './components/Header'
import Form from './components/Form'
import Posts from './components/Posts'

const App = () => {
  const journalEntries = new Array(5).fill(0)
  return (
    <div>
      <Header />
      <Form />
      <Posts journalEntries={journalEntries} />
    </div>
  );
}

export default App
