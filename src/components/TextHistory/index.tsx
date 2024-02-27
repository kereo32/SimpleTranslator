
type TextHistoryProps = {
  textHistory: { originalText: string; translatedText: string }[]
}

const TextHistory = ({ textHistory }: TextHistoryProps) => {
  return (
    <div className='textHistory'>
      {textHistory.map((entry, index) => (
        <div key={index}>
          <p className='original'>Original: {entry.originalText}</p>
          <p className='translated'>Translated: {entry.translatedText}</p>
        </div>
      ))}
    </div>
  )
}


export default TextHistory