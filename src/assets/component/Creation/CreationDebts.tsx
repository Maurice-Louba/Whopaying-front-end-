

const CreationDebts = () => {
  return (
    <div>
        <div className='max-w-[1050px] mx-auto'>
            <div className='flex items-center justify-center'>
                <div className=' bg-green-100 rounded-2xl flex items-center justify-center   my-4 h-[50px] w-[150px]'>
                <p className="text-green-600 ">Create a Debts</p>
                </div>

            </div>
            <div className="w-full px-6"> 
            <div className=" flex items-center justify-center w-full px-8 h-[100px] rounded-2xl shadow-2xs">
                    <select className="border-green-400 rounded-2xl w-[350px] h-[50px] border ">
                        <option className="mx-2 text-green-500 focus:ring-green-700 hover:border-green-500">Select a group</option>
                            <option>Group1</option>
                            <option>Group1</option>
                            <option>Group1</option>
                            <option>Group1</option>

                       
                    </select>
            </div>
            </div>

        </div>
      
    </div>
  )
}

export default CreationDebts
