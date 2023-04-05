import React, { useEffect, useState } from 'react'
import styles from './Main.module.scss'
import Card from '../Card'
import PokemonInfo from '../PokemonInfo'
import { useDispatch, useSelector } from 'react-redux'
import { loadPokeData } from '../../features/pokemonSlice/pokemonSlice'
import { loadAbout } from '../../features/pokeInfoSlice/pokeInfoSlice'

const countData = [10, 20, 50]
const Main = () => {
  const dispatch = useDispatch()
  const { pokeData, pokeInfo, loading } = useSelector(state => state.pokemon)
  const { aboutPoke } = useSelector(state => state.poke)
  const [countPoke, setCountPoke] = useState(20)
  const [pokeDex, setPokeDex] = useState()
  const [fetching, setFetching] = useState(false)
  const [search, setSearch] = useState('')


  useEffect(() => {
    dispatch(loadPokeData(countPoke))
  }, [countPoke, fetching])


  useEffect(() => {
    if (fetching) {
      setCountPoke(prevState => prevState + 10)
      dispatch(loadPokeData(countPoke))
    }
  }, [fetching]);


  useEffect(() => {
    dispatch(loadAbout(pokeInfo))
  }, [pokeInfo])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, []);



  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && countPoke < 500) {
      setFetching(true)
    }
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) > 100) {
      setFetching(false)
    }
  }
  const handeBtnClick = (e) => {
    setCountPoke(+e.target.id)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className={styles['search__block']}>
        <input value={search} onChange={handleSearch} type="text" placeholder='Поиск...' className={styles['search__input']} />
      </div>
      <div className={styles['wrapper']}>
        <h2>Выберите количество отображаемых покемонов</h2>
        <div className={styles['btn-group']}>
          {
            countData.map((item, i) => (
              <button id={item} key={i} onClick={handeBtnClick}>{item}</button>
            ))
          }
        </div>
        {loading && <h2>Загрузка...</h2>}
        <div className={styles['content']}>
          <div className={styles['content__left']}>
            {
              aboutPoke.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => (
                <Card search={search} key={item.id} item={item} pokeInfo={setPokeDex} />
              ))
            }
          </div>
          <div className={styles['content__right']}>
            <PokemonInfo data={pokeDex} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Main