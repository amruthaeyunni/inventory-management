'use client'

require('dotenv').config();

import {useState, useEffect} from "react";
import {firestore} from "@/firebase";
import {Box, Typography, Stack, Modal, TextField, Button} from '@mui/material'
import {collection, query, deleteDoc, doc, getDoc, setDoc, getDocs,} from "firebase/firestore";


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchItem, setSearchItem] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      const data = doc.data()
      if (doc.id.toLowerCase().includes(searchItem.toLowerCase())) {
        inventoryList.push({
          name: doc.id,
          ...doc.data(),
        })
      }
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity+1})
    }
    else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {quantity: quantity-1})
      }
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [searchItem])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      gap={2}
      bgcolor="#A7C7E7"
    >
      <Box 
        width="1000px" 
        height="100px" 
        bgcolor="#6495ED" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        borderRadius={10}
      >
        <Typography variant="h2" color="#333">
          PANTRY ITEMS
        </Typography>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #0047AB"
          borderRadius={3}
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">ADD ITEM</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
            <Button  
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box 
        width="800px" 
        display="flex" 
        marginBottom="5px" 
        justifyContent="center" 
        alignItems="center"
        direction="row">
      <TextField
        label="Search Items"
        variant="outlined"
        width="800px"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        sx={{marginBottom: 2, paddingRight: 10, width: 500}}
      />
      <Button 
        variant="contained" 
        onClick={() => {
          handleOpen()
        }}
      >
        Add New Item
      </Button>
      </Box>
      <Box border="1px solid white">
      <Box 
        width="800px" 
        height="100px" 
        display="flex" 
        alignItems="center" 
        bgcolor="#87CEEB"
      >
        <Typography variant="h2" color="#333" paddingRight={15} paddingLeft={3}>
          Item        
        </Typography>
        <Typography variant="h2" color="#333" paddingRight={12}>
          Quantity
        </Typography>
        <Typography variant="h2" color="#333" paddingRight={8}>
          +
        </Typography>
        <Typography variant="h2" color="#333">
          -
        </Typography>
      </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {inventory.map(({name, quantity}) => (
              <Box 
                key={name}
                width="100%"
                minHeight="150px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bgcolor="#f0f0f0"
                padding={5}
                borderRadius={1}
              >
                <Typography variant="h3" color="#333" textAlign="center">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h3" color="#333" textAlign="center">
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained"
                    onClick={() => {
                      addItem(name)
                    }}
                  >
                    Add
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={() => {
                      removeItem(name)
                    }}
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  )
}

