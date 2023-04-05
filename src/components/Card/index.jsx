import React from 'react'

import styles from './Card.module.scss'

const Card = ({ item, pokeInfo }) => {
 
  return (
    <div onClick={() => pokeInfo(item)} className={styles['card']}>
      <h2 className={styles['card__id']}>{item.id}</h2>
      <img className={styles['card__image']} src={item.sprites.front_default} alt="" />
      <p className={styles['card__name']}>{item.name}</p>
    </div>
  )
}

export default Card