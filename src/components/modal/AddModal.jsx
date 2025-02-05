import React, { useState } from 'react'
import Modal from '../ui/Modal'

function AddModal(isOpen, setIsOpen, handleClose) {
   
  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => handleClose}>
        <h2>Add a new item</h2>
        <form>
          <label>
            Item Name:
            <input type="text" />
          </label>
          <label>
            Quantity:
            <input type="number" />
          </label>
          <button type="submit">Add</button>
        </form>
        <button onClick={() => {}}>Cancel</button>
      </Modal>
    </div>
  )
}

export default AddModal
