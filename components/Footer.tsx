import Image from 'next/image'

export const Footer = () => {
  return (
    <footer
      className="
        flex
        flex-col
        items-center
        justify-center
        border-t-2
        border-stone-500
        p-6
        tracking-wider
        "
    >
      <p className="mb-8 text-center font-mono">
        Created by{' '}
        <a
          href="https://twitter.com/kenryu42"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          @kenryu42
        </a>{' '}
        for Alchemy&apos;s{' '}
        <a
          href="https://docs.alchemy.com/alchemy/road-to-web3/welcome-to-the-road-to-web3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          Road to Web3
        </a>{' '}
        lesson two!
      </p>
      <a
        href="https://goerli.etherscan.io/address/0x2032bb8369B61146181F1Fde69626969467D1A92#code"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/etherscan-logo.svg"
          alt="etherscan-logo"
          width={100}
          height={30}
        />
      </a>
    </footer>
  )
}
