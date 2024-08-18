import React from 'react'

function PopupMsg({message,status="true"}) {
    if(message==="")
        return 
  return (
    
    <div className={`fixed bottom-12 right-4 p-4 bg-gray-300 ${status?"bg-green-400":" bg-red-400"} text-black rounded shadow-lg transition-opacity duration-2000 opacity-100`}>
         {message}
        </div>
  )
}

export default PopupMsg
