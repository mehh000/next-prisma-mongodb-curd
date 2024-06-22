'use client'
import CreateForm from '@/components/CreateForm'
import React, { useEffect, useState } from 'react'
import { readItem } from './actions/readAction'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const Home = () => {
  const [items, setItems] = useState([])
  const [refrash, setRefrash] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const getAllData = async () => {
      const itemData = await readItem()
      setItems(itemData)
    }
    getAllData()
  }, [refrash])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(items.length / itemsPerPage)

  return (
    <div className="max-w-full min-h-screen mx-auto md:max-w-4xl">
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-4 px-5">
        <h2>Store Management</h2>

        <div className="flex flex-col w-full gap-4 md:flex-row md:justify-between">
          <div className="h-full p-4 bg-gray-200 rounded-md">
            <CreateForm setRefrash={setRefrash} refrash={refrash} />
          </div>
          <div className="w-full p-4 bg-gray-300 rounded-md">
            <h3>Display List</h3>
            {Array.isArray(paginatedItems) && paginatedItems.map((item, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 p-2 my-5 border border-gray-50">
                <div>{item.itemName}</div>
                <div>{item.price}</div>
                <div>{item.quentity}</div>
                <div>{item.totalAmount}</div>
                <div className="flex items-center gap-5">
                  <Link href={`/update/${item.id}`}><FaRegEdit color='green' size={20} /></Link>
                  <Link href={`/remove/${item.id}`}><FaTrashAlt color='red' size={20} /></Link>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </PaginationPrevious>
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        active={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PaginationNext>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
