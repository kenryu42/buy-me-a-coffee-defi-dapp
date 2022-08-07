import { useFormContext } from '../context'

export const Form = () => {
  const { nameRef, messageRef, onNameChange, onMessageChange } =
    useFormContext()

  if (!onNameChange || !onMessageChange) {
    return <></>
  }

  return (
    <form className="m-6">
      <div className="mb-4">
        <label className="text-lg font-medium tracking-widest">Name</label>

        <input
          id="name"
          ref={nameRef}
          type="text"
          className="m-1 w-full rounded-lg border border-gray-300 p-2"
          placeholder="Anon"
          onChange={onNameChange}
        />
      </div>
      <div>
        <label className="text-lg font-medium tracking-wider">
          Send Kenryu a message
        </label>

        <textarea
          rows={4}
          placeholder="Enjoy your coffee!"
          id="message"
          ref={messageRef}
          className="m-1 w-full rounded-lg border border-gray-300 p-2"
          onChange={onMessageChange}
          required
        ></textarea>
      </div>
    </form>
  )
}
