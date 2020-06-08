import React from 'react';
import { hot } from 'react-hot-loader/root';
import Topbar from './Topbar/Topbar';

require('./Entry.scss');
import 'normalize.css';

class Entry extends React.Component {
    render() {
        return (
            <>
                {/* Custom Topbar */}
                <Topbar />

                <p>Hello World</p>
            </>
        );
    }
}

export default hot(Entry);
