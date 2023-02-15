import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Post {
  _id: number,
  title: string,
  description: string,
  author: string,
}

interface HomeProps {
  posts: Post[]
}

export async function getServerSideProps() {
  const res = await fetch('https://botkv4rtz.vercel.app/api/posts')
  const data = await res.json()

  return { props: { posts: data } }
}


const Home = ({posts}: HomeProps) => {
  return (
    <div className={styles.grid}>
      {posts.map((el: Post) => (
        <a
        key={el._id}
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            {el.title}
          </h2>
          <p className={inter.className}>
            {el.description}
          </p>
          <p className={inter.className}>Автор: {el.author}</p>
        </a>
      ))}
    </div>
  )
}

export default Home