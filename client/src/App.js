import logo from './logo.svg';
import LabeledInput from './components/molecules/labeledInput/LabeledInput';
import Form from './components/organisms/form/Form';
import './App.css';

function App() {
    return (
        <div className="App">
            <Form
                onClick={console.log('hit')}
                name={['name', 'last-name', 'age', 'city']}
                text={['Name', 'Last Name', 'Age', 'City']}
                ButtonText="BUTTON"
            />
        </div>
    );
}

export default App;
