import React from 'react';

const Modal = ({ setModalOn, setChoice, src, attribute_1, attribute_2, attribute_3, attribute_4}) => {

    const handleOKClick = () => {
        setChoice(true)
        setModalOn(false)
    }

    const handleCancelClick = () => {
        setChoice(false)
        setModalOn(false)
    }

    return (
        <> 
        <div className=" bg-zinc-400 opacity-90 fixed inset-0 z-10">
            <div className="flex h-screen justify-center items-center ">

                <div className="flex-col justify-center  bg-white py-12 px-24 border-4 border-indigo-600 rounded-xl z-20 ">

                    <img className="h-[200px] z-20" src={src} /> 
                    <div> 
                        {attribute_1?.length > 0 &&
                            <label className="mt-4 flex items-center">
                            <p className="mr-2">Taille : </p>
                            <select className="form-select ml-2 block w-20 border-2">
                                {attribute_1.map(item => {
                                    return (
                                        <option key={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                          </label>
                        } 
                    </div>
                    <div>
                        {attribute_2?.length > 0 && 
                        <div className='flex'> 
                            <p> Couleur :  </p>
                            {attribute_2.map(item => {
                                return (
                                    <button key={item.id} className='w-5 m-1' style={{backgroundColor: item.color, border: '1px solid black'}}> </button>
                                )
                            })}

                        </div>
                        } 
                    </div>
                    <div> 
                        {attribute_3?.length > 0 &&
                            <label className="mt-4 flex items-center">
                            <p className="mr-2">Taille : </p>
                            <select className="form-select ml-2 block w-25 border-2">
                                {attribute_3.map(item => {
                                    return (
                                        <option key={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                          </label>
                        } 
                    </div>
                    <div>
                        {attribute_4?.length > 0 && 
                            <label className="mt-4 flex items-center">
                                <p className="mr-2">Forme : </p>
                                <select className="form-select ml-2 block w-25 border-2">
                                    {attribute_4.map(item => {
                                        return (
                                            <option key={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                          </label>
                        } 
                    </div>
                    <div className="flex">
                        <button onClick={handleOKClick} className=" rounded px-4 py-2"> Ajouter au panier </button>
                        <button onClick={handleCancelClick} className="rounded px-4 py-2 ml-4"> X </button>
                    </div>

                </div>
            </div>
        </div>
        </>
  
    );
};

export default Modal;