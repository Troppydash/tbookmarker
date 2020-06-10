import React from 'react';
import { hot } from 'react-hot-loader/root';
import Topbar from './Topbar/Topbar';

require('./Entry.scss');
import 'normalize.css';
import {
    loadMostRecentBookmarkBlob, saveBookmarkBlob
} from '../services/bookmarksBlobLoader';
import { exampleSchema } from '../schemas/bookmarkSchemas';
import moment from 'moment';

class Entry extends React.Component {
    state = {
        bookmarks: []
    }

    render() {
        return (
            <>
                {/* Custom Topbar */}
                <Topbar />

                <p>{JSON.stringify(this.state.bookmarks)}</p>
                <button onClick={async () => {
                    const bookmarks = await loadMostRecentBookmarkBlob();
                    this.setState({
                        bookmarks
                    })
                }}>Fetch</button>
                <button onClick={async () => {
                    const testSchema = exampleSchema;
                    exampleSchema.createdAt = +moment().format('YYYYMMDDHHmmss');
                    console.log(testSchema);
                    const succ = await saveBookmarkBlob(testSchema);
                    alert(succ);
                }}>Save</button>
            </>
        );
    }
}

export default hot(Entry);
