import type { NextPage } from 'next'
import {
  Metadata,
  Header,
  Web3Button,
  Form,
  BuyCoffeeBtn,
  MemoList,
} from '../components'
import { useWeb3Context } from '../context'

const name = 'Kenryu'
const url = 'https://github.com/kenryu42'

const Home: NextPage = () => {
  const { web3Provider, network } = useWeb3Context()

  return (
    <>
      <Metadata name={name} />
      <Header name={name} url={url} />
      <Web3Button />
      {web3Provider && network?.chainId === 5 ? (
        <>
          <Form />
          <BuyCoffeeBtn />
          <MemoList />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Home
