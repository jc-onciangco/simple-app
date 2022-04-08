import Head from 'next/head'
import {useRouter} from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const appComponents = [
    {
        id:0,
        name: 'calculator'
    },
    {
        id:1,
        name: 'todo'
    }
]
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {
          appComponents.map(app => {
            return(
              <li key={app.id} className="link">
                <Link  href={`/${app.name}`}>
                  <a>
                    {app.name}
                  </a>
                </Link>
              </li>
            )
          })
        }
      </ul>
      <style jsx>
        {`
        
          ul {
            list-style: none;
          }

          .link {
            background-color: skyblue;
            padding: 1rem 3rem;
            text-transform: uppercase;
            font-weight: 900;
            font-size: 2rem;
            color: white;
            border-radius: 1rem;
            margin: 0 0 1rem 0;
            text-align: center;
            transition: all 1s linear;
          }

          .link:hover {
            cursor: pointer;
            filter: contrast(1.5);
          }
        
        `}
      </style>
    </div>
  )
}
