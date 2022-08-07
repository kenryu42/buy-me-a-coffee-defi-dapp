import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useWeb3Context } from '../context'
import abi from '../utils/BuyMeACoffee.json'

type Memo = {
  from: string
  timestamp: ethers.BigNumber
  name: string
  message: string
}

export const MemoList = () => {
  const { web3Provider } = useWeb3Context()
  const [memos, setMemos] = useState<Memo[]>([])

  useEffect(() => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
    const signer = web3Provider?.getSigner()
    const buyMeACoffee = new ethers.Contract(contractAddress, abi.abi, signer)

    const getMemos = async () => {
      try {
        console.log('Getting memos from the blockchain...')
        const memosFromChain = await buyMeACoffee.getMemos()
        setMemos(memosFromChain)
        console.log('Fetched memos from the blockchain.')
      } catch (error) {
        console.log(error)
      }
    }

    const onNewMemo = (
      from: string,
      timestamp: ethers.BigNumber,
      name: string,
      message: string
    ) => {
      console.log('Memo received: ', from, timestamp.toString(), name, message)
      toast.info(`New memo from ${name}: ${message}`, {
        position: 'bottom-center',
        autoClose: 5000,
      })

      const newMemo = { from, timestamp, name, message } as Memo

      setMemos((prevState) => [...prevState, newMemo])
    }

    getMemos()

    // Listen for new memo events.
    buyMeACoffee.on('NewMemo', onNewMemo)

    return () => {
      console.log('Unsubscribing from NewMemo events...')
      buyMeACoffee.off('NewMemo', onNewMemo)
    }
  }, [web3Provider])

  return (
    <div className="mt-20 w-3/4 lg:w-1/3">
      {memos
        .slice(0)
        .reverse()
        .map((memo: Memo, idx: number) => {
          return (
            <div
              key={idx}
              className="m-2 rounded-lg border-2 border-gray-300 p-2"
            >
              <p className="font-bold">&quot;{memo.message}&quot;</p>
              <p>
                From: {memo.name} at{' '}
                {new Date(memo.timestamp.toNumber() * 1000).toLocaleDateString(
                  'en-US'
                )}
              </p>
            </div>
          )
        })}
    </div>
  )
}
