'use client'

import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import tableStyles from '@core/styles/table.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const MenCareusel = () => {
    const router = useRouter()
    const [rowsData, setRowsData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/MenCareusel')
                const json = await res.json()
                if (json.success) {
                    setRowsData(json.data)
                } else {
                    console.error(json.error)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        await fetch(`/api/MenCareusel/${id}`, { method: "DELETE" });
        setRowsData(rowsData.filter((item) => item._id !== id));
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <div className='text-xl'>Men Careusel</div>
                <div>
                    <Button
                        component='label'
                        size='small'
                        variant='contained'
                        htmlFor='men-careusel-upload-image'
                        onClick={() => router.push('/careusel/menCareusel/form')}
                    >
                        New Item
                    </Button>
                </div>
            </div>
            <Card>
                <div className='overflow-x-auto'>
                    <table className={tableStyles.table}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Top Heading</th>
                                <th>Sub Heading</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsData.map((row) => (
                                <tr key={row._id}>
                                    <td>
                                        {row.image ? (
                                            <img src={row.image} alt="Carousel" className="w-16 h-16 object-cover rounded" />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>
                                        <Typography color='text.primary' className='font-medium'>
                                            {row.topHeading}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography>{row.subHeading}</Typography>
                                    </td>
                                    <td>
                                        <Typography>{row.description}</Typography>
                                    </td>
                                    <td>
                                        <Chip
                                            className='capitalize'
                                            variant='tonal'
                                            color='success'
                                            label={new Date(row.createdAt).toLocaleDateString()}
                                            size='small'
                                        />
                                    </td>
                                    <td>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" endIcon={<EditNoteIcon />} onClick={() => router.push(`/careusel/menCareusel/form?id=${row._id}`)}>
                                                Edit
                                            </Button>
                                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(row._id)}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default MenCareusel