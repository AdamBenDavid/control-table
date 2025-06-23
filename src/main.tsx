import ReactDOM from 'react-dom';
import App from './App';
import {RtlProvider} from "./RtlProvider.tsx";

ReactDOM.render(
    <RtlProvider>
        <App/>
    </RtlProvider>,
    document.getElementById('root')
);
