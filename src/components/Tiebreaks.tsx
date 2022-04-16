import * as React from 'react';
import {
    DndProvider,
    useDrag,
    useDrop
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    Box,
    Paper
} from '@mui/material';
import update from 'immutability-helper';
import useGlobalState from '@vighnesh153/use-global-state';

const DndCard = (props) => {
    const ref = React.useRef(null);
    const [draggableTiebreaks, setDraggableTiebreaks] = useGlobalState<boolean>('draggableTiebreaks');
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            props.moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            let id = props.id;
            let index = props.index;
            return { id, index };
        },
        canDrag: () => {
            return draggableTiebreaks;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <Paper
            ref={ref}
            sx={{
                textAlign: 'center',
                opacity: `${opacity}`,
                dataHandlerId: `${String(handlerId)}`
            }}
            elevation={4}
        >
            {props.text}
        </Paper>
    )
}

export const Tiebreaks = (props) => {
    const moveCard = React.useCallback((dragIndex, hoverIndex) => {
        props.setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, []);
    const renderCard = React.useCallback((card, index) => (
        <DndCard
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
        />
    ), []);
    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1 1 0',
                flexDirection: 'column',
                gap: '0.2em',
                marginBottom: '1em'
            }}
        >
            <DndProvider backend={HTML5Backend}>
                {props.cards.map((card, i) => renderCard(card, i))}
            </DndProvider>
        </Box>
    )
}