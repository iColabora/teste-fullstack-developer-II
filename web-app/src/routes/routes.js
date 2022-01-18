import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Index from '../components/forms/forms'
import Form from '../components/builder/Builder'
import Reply from '../components/reply/Reply'

export default function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/new/:id" element={<Form />} />
            <Route path="/reply/:id" element={<Reply />} />
        </Routes>
    )
}