import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement, incrementByAmount, fetchPokemon} from '../store/counterSlice'
import styles from '../styles/Home.module.css'
import {useState} from 'react'

export default function Home() {
  const {count, pokemons, loading} = useSelector(state => state.counter)
  const dispatch = useDispatch()
  const [incByAmount, setIncByAmount] = useState(0)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{count}</h1>
      <button onClick={() => dispatch(fetchPokemon(1))}>FETCH POKEMON</button>
      <ul>
        {
          loading && <li>LOADING</li>
        }
        {
          pokemons &&
          pokemons.map(p => {
            return(
              <li key={p.id}>{p.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}
