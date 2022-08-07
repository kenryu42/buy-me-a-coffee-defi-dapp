import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { toast } from 'react-toastify'
import { useEffect, useReducer, useCallback } from 'react'

import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from '../reducers'

let web3Modal: Web3Modal | null

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    theme: 'dark',
  })
}

export const useWeb3 = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState)
  const { provider, web3Provider, address, network } = state

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect()
        const web3Provider = new ethers.providers.Web3Provider(provider)
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
        const network = await web3Provider.getNetwork()
        const shortAddress =
          address.substring(0, 5) +
          '...' +
          address.substring(address.length - 4)

        toast.success(`${shortAddress} Connected`, {
          position: 'top-center',
        })
        dispatch({
          type: 'SET_WEB3_PROVIDER',
          provider,
          web3Provider,
          address,
          network,
        } as Web3Action)
      } catch (error) {
        console.log('Connect Error:', error)
      }
    } else {
      console.error('Web3Modal is not initialized')
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      toast.error('Disconnected.')
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      } as Web3Action)
    } else {
      console.error('Web3Modal is not initialized')
    }
  }, [provider])

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  useEffect(() => {
    if (web3Modal && network && network.chainId !== 5) {
      toast.error('Wrong network! Please switch to Goerli Testnet.', {
        position: 'top-center',
        autoClose: false,
      })
      if (typeof window !== 'undefined') {
        const changeNetwork = async () => {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
          })
        }

        changeNetwork()
      }
    }
  })

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          console.log(`Accounts changed: ${accounts}`)
          console.log(`Accounts type: ${typeof accounts}`)
          const shortAddress =
            accounts[0].substring(0, 5) +
            '...' +
            accounts[0].substring(accounts[0].length - 4)

          toast.success(`${shortAddress} Connected`, {
            position: 'top-center',
          })
        } else {
          disconnect()
        }
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        } as Web3Action)
      }

      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== 'undefined') {
          console.log(`Chain switched: ${_hexChainId}`)
          window.location.reload()
        } else {
          console.log('window is not defined')
        }
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return {
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
  } as Web3ProviderState
}
