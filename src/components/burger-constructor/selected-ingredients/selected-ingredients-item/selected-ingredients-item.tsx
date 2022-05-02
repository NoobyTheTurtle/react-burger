import styles from "./selected-ingredients-item.module.css";
import type {Identifier, XYCoord} from 'dnd-core'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "../../../../services/types/hooks";
import {replaceIngredient} from "../../../../services/reducers/burger";
import {TConstructorIngredient} from "../../../../services/types/ingredient";

type TSelectedIngredientsItemProps = {
    ingredient: TConstructorIngredient,
    handleClose: () => void,
    index: number,
    id: string
}

const SelectedIngredientsItem: FC<TSelectedIngredientsItemProps> = ({ingredient, handleClose, index}) => {
    const dispatch = useDispatch()
    const ref = useRef<HTMLLIElement>(null)
    const [{handlerId}, dropRef] = useDrop<TSelectedIngredientsItemProps,
        void,
        { handlerId: Identifier | null }>({
        accept: 'replaceIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) return

            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            dispatch(replaceIngredient({dragIndex, hoverIndex}))
            item.index = hoverIndex
        },
    })

    const [{isDragging}, dragRef] = useDrag({
        type: 'replaceIngredient',
        item: () => ({id: ingredient.constructorId, index}),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    dragRef(dropRef(ref))

    return (
        <li ref={ref}
            className={`${styles.li} mt-4 mb-4 mr-2`}
            style={{opacity}}
            data-handler-id={handlerId}
        >
            <div className={styles.icon}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={handleClose}
            />
        </li>
    )
}

export default SelectedIngredientsItem