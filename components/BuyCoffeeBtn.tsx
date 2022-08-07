import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { useWeb3Context, useFormContext } from '../context'
import abi from '../utils/BuyMeACoffee.json'

export const BuyCoffeeBtn = () => {
  const { name, message, nameRef, messageRef, clearForm } = useFormContext()
  const { web3Provider } = useWeb3Context()
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
  const signer = web3Provider?.getSigner()
  const buyMeACoffee = new ethers.Contract(contractAddress, abi.abi, signer)

  const buyCoffee = async (amount: string, contract: ethers.Contract) => {
    try {
      console.log('buying coffee..')
      const coffeeTxn = await contract.buyCoffee(
        name ? name : 'anon',
        message ? message : 'Enjoy your coffee!',
        { value: ethers.utils.parseEther(amount) }
      )

      const id = toast.loading('Coffee is brewing... 🫘')
      await coffeeTxn.wait()
      toast.update(id, {
        render: 'Coffee purchased! 🎉',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })

      console.log('mined ', coffeeTxn.hash)

      console.log('coffee purchased!')

      // Clear the form fields.
      if (clearForm && nameRef?.current && messageRef?.current) {
        clearForm()
        nameRef.current.value = ''
        messageRef.current.value = ''
      }
    } catch (error) {
      console.log('buyCoffee error: ', error)
    }
  }

  return (
    <>
      <button
        className="m-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        type="button"
        onClick={() => buyCoffee('0.001', buyMeACoffee)}
      >
        Small Coffee for 0.001ETH
      </button>
      <button
        className="m-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        type="button"
        onClick={() => buyCoffee('0.005', buyMeACoffee)}
      >
        Large Coffee for 0.005ETH
      </button>
    </>
  )
}
