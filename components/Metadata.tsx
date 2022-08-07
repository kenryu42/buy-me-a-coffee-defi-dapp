import Head from 'next/head'

interface Props {
  name: string
}

export const Metadata = ({ name }: Props) => {
  return (
    <Head>
      <title>Buy {name} A Coffee ☕️</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
