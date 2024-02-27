import React from 'react'

type TextareaProps = {
  disabled?: boolean
  value?: string
  setText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

const Textarea = ({ disabled, value, setText, placeholder }: TextareaProps) => {
  return (
    <>
      <textarea placeholder={placeholder} onChange={(e) => setText!(e)} disabled={disabled} rows={6} cols={40} value={value} />
    </>
  )
}


export default Textarea
