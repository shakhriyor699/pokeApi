import React from 'react'

import styles from './PokemonInfo.module.scss'


const PokemonInfo = ({ data }) => {


  return (
    <>
      {
        (!data) ? '' : <div className={styles['poke']}>
          <h1 className={styles['poke__name']}>{data.name}</h1>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
          <div className={styles['poke__abilities']}>
            {
              data.abilities.map(poke => (
                <>
                  <div className={styles['poke__group']}>
                    <h3 className={styles['poke__abilities-name']}>{poke.ability.name}</h3>
                  </div>
                </>
              ))
            }


          </div>
          <div className={styles['poke__base-stats']}>
            {
              data.stats.map(poke => (
                <>
                  <h3 className={styles['poke__base-title']}>{poke.stat.name}: {poke.base_stat}</h3>
                </>
              ))
            }

          </div>
        </div>
      }
    </>

  )
}

export default PokemonInfo