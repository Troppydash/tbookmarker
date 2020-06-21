import React from 'react';
import { BookmarkGroup } from '../../schemas/bookmarkSchemas';
import CardStyles from '../../styles/components/Card.module.scss';
import Styles from './GroupCard.module.scss';

interface GroupCardProps {
    group: BookmarkGroup,
    onClick: ( groupID: string ) => void;
}

const GroupCard = ( props: GroupCardProps ) => {

    const amountOfBranches = () => {

        if ( !props.group.branches ) {
            return null;
        }

        return props.group.branches.length;
    };

    const amountOfCommits = () => {

        if ( !props.group.branches ) {
            return null;
        }

        let n = 0;
        props.group.branches.forEach( b => {
            n += b.commits.length || 0;
        } );

        return n;
    };

    const amountOfBookmarks = () => {

        if ( !props.group.branches ) {
            return null;
        }

        let n = 0;
        props.group.branches.forEach( b => {
            let j = 0;
            b.commits.forEach( c => {
                j += c.bookmarks.length || 0;
            } );
            n += j;
        } );

        return n;
    };

    return (
        <div className={CardStyles.card} onClick={() => props.onClick( props.group.uuid )}>
            <div className={CardStyles.cardHeader}>
                <span>{props.group.name}</span>
            </div>
            <div className={CardStyles.cardBody}>
                <table className={Styles.table}>
                    <tbody>
                    <tr>
                        <td>
                            Branches:
                        </td>
                        <td>
                            {amountOfBranches() || 'none'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Commits:
                        </td>
                        <td>
                            {amountOfCommits() || 'none'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Bookmarks:
                        </td>
                        <td>
                            {amountOfBookmarks() || 'none'}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GroupCard;
