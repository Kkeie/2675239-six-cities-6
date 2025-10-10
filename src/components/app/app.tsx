import MainScreen from '../../pages/main-screen/main-screen';
import type {Place} from '../../types';

type AppProps = {
  placesCount: number;
  places: Place[];
}

function App(props: AppProps): JSX.Element {
  return (
    <MainScreen placesCount={props.placesCount} places={props.places} />
  );
}

export default App;
