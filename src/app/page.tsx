"use client"
 
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import {TypewriterEffect} from "../components/ui/typewriter-effect";
import { Boxes } from "@/components/ui/background-boxes";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Modal, ModalContent, ModalBody, ModalFooter, ModalTrigger, ModalProvider } from "@/components/ui/animated-modal";
import {firestore} from '../../firebase'
import { collection, getDocs, query } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { Box, Stack, TextField, Typography } from "@mui/material";


function Landing() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemUnit, setItemUnit] = useState('')
  const [searchedItemName, setSearchedItemName] = useState('')



  const updatePantry = async () =>{
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(
        {
          name: doc.id,
          quantity: doc.data().quantity,
          unit: doc.data().unit

        })      
    });
    setPantry(pantryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {name: itemName, quantity: quantity + 1, unit:itemUnit})   
    }else{
        await setDoc(docRef, {name: itemName, quantity:1, unit: itemUnit})
      }
      await updatePantry()
    }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity === 1){
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef, {name: itemName, quantity: quantity - 1, unit: itemUnit})
      }
    }
    await updatePantry()
  }

  const getItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {name: itemName, quantity: quantity, unit: itemUnit})
    }
    await updatePantry()
  }

  useEffect(()=>{
    const height = window.innerHeight
    updatePantry()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const words = [
    {
      text: "Manage",
    },
    {
      text: "your"
    },
    {
      text: "Pantry",
      className: "text-blue-500 dark:text-blue-500",
    },
  
  ];
  return (
    
    <div className="rounded-md relative flex flex-col items-center justify-center">
      <title>Pantry Tracker</title>
      
        <div className="max-w-2xl mx-auto p-4 relative z-10">
          <div className="flex flex-col items-center justify-center h-[40rem] relative z-10">
            <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
              Your automated Pantry assistant
            </p>
            <TypewriterEffect words={words} />
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
                <Modal>
                  <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                      See Entries
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                      🧺
                    </div>
                  </ModalTrigger>
                  <ModalBody>
                    <ModalContent>
                      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                        Your {" "}
                        <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                          Pantry
                        </span>{" "}
                        items here
                      </h4>
                      <Stack width={500} height={400} spacing={2} overflow={'auto'}>
                        {
                          pantry.map(({name, quantity, unit})=> (
                            <Box key={name} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant="h6">{name.charAt(0).toUpperCase()+name.slice(1)}</Typography>
                            <Typography variant="h6">{quantity}</Typography>
                            <Typography variant="h6">{unit}</Typography>
                            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm" 
                              onClick={()=>{
                                removeItem(name)
                              }}>
                                Remove Item
                              </button>
                            </Box>
                          ))
                        }
                      </Stack>
                    </ModalContent>
                    <ModalFooter className="gap-4">
                      <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28" onClick={()=>{}}>
                        Collapse
                      </button>
                      <Modal>
                        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                            Add another Item
                          </span>
                          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                            ➕
                          </div>
                        </ModalTrigger>
                        <ModalBody>
                          <ModalContent>
                            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                              Add to your {" "}
                              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                Pantry
                              </span>{" "}

                            </h4>
                            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                              <TextField variant="outlined" fullWidth placeholder="ItemName here" value={itemName} onChange={(e)=> {setItemName(e.target.value)}}/>
                              <TextField variant="outlined" fullWidth placeholder="Unit here" value={itemUnit} onChange={(e)=> {setItemUnit(e.target.value)}}/>
                              <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm" 
                              onClick={()=>{
                                addItem(itemName)
                                setItemName('')
                                setItemUnit('')
                                handleClose()
                              }}>
                                Add item
                              </button>
                            </div>
                          </ModalContent>
                        </ModalBody>
                      </Modal>
                      
                    </ModalFooter>
                  </ModalBody>
                </Modal>
                <Modal>
                  <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                      Search
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                      🔍
                    </div>
                  </ModalTrigger>
                  <ModalBody>
                    <ModalContent>
                      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                        Search your {" "}
                        <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                          Pantry
                        </span>{" "}
                        items
                      </h4>
                      <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                              <Box width={500}display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'} alignItems={'center'} gap={2}>
                              <TextField variant="outlined" fullWidth placeholder="Search by ItemName here" value={searchedItemName} onChange={(e)=> {setSearchedItemName(e.target.value)}}/>
                              <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm" 
                              onClick={()=>{
                                //temp = searchedItemName
                              }}>
                              Search
                              </button>
                              </Box>
                            </div>
                            <Stack width={500} height={400} spacing={2} overflow={'auto'}>
                            {
                            
                              pantry.map(({name, quantity, unit})=> (
                                (searchedItemName === name)&&(<Box key={name} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant="h6">{name.charAt(0).toUpperCase()+name.slice(1)}</Typography>
                                <Typography variant="h6">{quantity}</Typography>
                                <Typography variant="h6">{unit}</Typography>
                                <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm" 
                                  onClick={()=>{
                                    removeItem(name)
                                  }}>
                                    Remove Item
                                  </button>
                                </Box>)
                              )) 
                            }
                      </Stack>
                    </ModalContent>
                  </ModalBody>
                </Modal>
          </div>
          </div>
        </div>
      <BackgroundBeams/>
      {/* <Boxes/> */}
    </div>
   );
  }
  
  export default Landing

