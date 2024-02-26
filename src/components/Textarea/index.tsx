import React from 'react'

type TextareaProps = {
  disabled?: boolean
  value?: string
  setText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({ disabled, value, setText }: TextareaProps) => {
  return (
    <div>
      <textarea onChange={(e) => setText!(e)} disabled={disabled} rows={6} cols={40} value={value} />
    </div>
  )
}


export default Textarea
