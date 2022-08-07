interface Props {
  name: string
  url: string
}

export const Header = ({ name, url }: Props) => {
  return (
    <h1 className="m-10 text-3xl font-bold md:text-6xl">
      Buy{' '}
      <a
        className="underline decoration-sky-500 hover:text-sky-500"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}{' '}
      </a>
      a Coffee ☕️
    </h1>
  )
}
