import Head from 'next/head'
import { Container } from '@mui/material'
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>SC Todo App</title>
        <meta name="description" content="This app generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoForm/>
      <TodoList/>
    </Container>
  )
}