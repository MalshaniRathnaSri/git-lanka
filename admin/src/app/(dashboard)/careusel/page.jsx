'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const HeroPage = () => {
  const [count, setCount] = useState(0)

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          🚀 Welcome to the Hero Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          This page is wrapped by your RootLayout, so it also shows Navbar, Footer, Sidebar, etc.
        </Typography>

        <Button variant="contained" onClick={() => setCount(count + 1)}>
          Click Me ({count})
        </Button>
      </CardContent>
    </Card>
  )
}

export default HeroPage
