import './App.css';
import Layout from './components/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import Doctors from './containers/Doctors/Doctors';
import Medicines from './containers/Medicine/Medicines';
import Patients from './containers/Patients/Patients';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import Counter from './containers/Counter/Counter';

function App() {
  const store = configureStore();
  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/doctors" component={Doctors} />
              <Route exact path="/medicines" component={Medicines} />
              <Route exact path="/patients" component={Patients} />
              <Route exact path="/counter" component={Counter} />
            </Switch>
          </Layout>
        </SnackbarProvider>
      </Provider>
    </>
  );
}

export default App;
