import React from 'react';
import CardStyles from '../../styles/components/Card.module.scss';
import { BsPlus } from 'react-icons/all';

interface EmptyGroupCardProps {
    onClick: () => void;
}

const EmptyGroupCard = React.forwardRef<HTMLDivElement, EmptyGroupCardProps>(( props, ref: any ) => {
    return (
        <div className={`${CardStyles.card} ${CardStyles.cardEmpty}`}
             onClick={props.onClick} ref={ref}
             style={{ fontSize: '4rem' }}>
            <BsPlus />
        </div>
    );
});

export default EmptyGroupCard;
