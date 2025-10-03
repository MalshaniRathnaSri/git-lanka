'use client'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const MenCareuselForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [imgSrc, setImgSrc] = useState('/images/uploader/image-uploader.jpg')
  const [fileInput, setFileInput] = useState(null)
  const [topHeading, setTopHeading] = useState('')
  const [subHeading, setSubHeading] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const res = await fetch(`/api/MenCareusel/${id}`)
          const data = await res.json()
          if (data.success) {
            setTopHeading(data.data.topHeading || '')
            setSubHeading(data.data.subHeading || '')
            setDescription(data.data.description || '')
            if (data.data.image) {
              setImgSrc(data.data.image) 
            }
          }
        } catch (err) {
          console.error(err)
        }
      }
      fetchItem()
    }
  }, [id])

   const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileInput(file)
      const reader = new FileReader()
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputReset = () => {
    setFileInput(null)
    setImgSrc('/images/uploader/image-uploader.jpg')
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

    try {
      const formData = new FormData()
      if (fileInput) {
        formData.append('file', fileInput)
      }

      formData.append('topHeading', topHeading)
      formData.append('subHeading', subHeading)
      formData.append('description', description)

      const res = await fetch(
        id ? `/api/MenCareusel/${id}` : '/api/MenCareusel',
        {
          method: id ? 'PUT' : 'POST',
          body: formData
        }
      )

      const data = await res.json()

      if (data.success) {
        alert(id ? 'Updated successfully!' : 'Saved successfully!')
        router.push('/careusel/menCareusel') 
      } else {
        alert('Error: ' + data.error)
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader title={id ? 'Edit Men Careusel' : 'Create Men Careusel'} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <div className='flex max-sm:flex-col items-center gap-6'>
                <Grid item xs={4} sm={3} md={3}>
                  <img className="rounded w-full h-auto" src={imgSrc} alt="Men Careusel" />
                </Grid>
                <div className='flex flex-grow flex-col gap-4'>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button component='label' size='small' variant='contained' htmlFor='men-careusel-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        accept='image/png, image/jpeg'
                        onChange={handleFileInputChange}
                        id='men-careusel-upload-image'
                      />
                    </Button>
                    <Button size='small' variant='outlined' color='error' onClick={handleFileInputReset}>
                      Reset
                    </Button>
                  </div>
                  <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Top Heading'
                placeholder='Write Top Heading Here....'
                value={topHeading}
                onChange={(e) => setTopHeading(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-file-list-3-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Sub Heading'
                placeholder='Write Sub Heading Here....'
                value={subHeading}
                onChange={(e) => setSubHeading(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-draft-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                rows={4}
                multiline
                label='Description'
                placeholder='Write Description Here....'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-file-copy-2-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit'disabled={loading} >
                {loading ? 'Saving...' : id ? 'Update' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default MenCareuselForm