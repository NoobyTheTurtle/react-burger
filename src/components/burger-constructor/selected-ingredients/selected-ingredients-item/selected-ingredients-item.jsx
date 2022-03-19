import styles from "./selected-ingredients-item.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {constructorIngredient} from "../../../../utils/prop-types";
import PropTypes from "prop-types";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {replaceIngredient} from "../../../../services/reducers/burger";

const SelectedIngredientsItem = ({ingredient, handleClose, index}) => {
    const dispatch = useDispatch()
    const ref = useRef()
    const [{handlerId}, dropRef] = useDrop({
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
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
                handleClose={handleClose(ingredient.constructorId)}
            />
        </li>
    )
}

SelectedIngredientsItem.propTypes = {
    ingredient: constructorIngredient.isRequired,
    handleClose: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

export default SelectedIngredientsItem