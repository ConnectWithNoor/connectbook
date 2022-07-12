import express from 'express';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.send('Auth Route')
    } catch (error) {
        console.error(error)
    }
})


export default router