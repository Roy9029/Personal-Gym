// pages/api/import-exercises.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const url = 'https://magicloops.dev/api/loop/1cf374eb-2b41-4d51-9ea2-983c775fa8cb/run'

  try {
    const apiRes = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ muscle: 'triceps' }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!apiRes.ok) {
      console.error('MagicLoops error status:', apiRes.status)
      return res.status(500).json({ error: 'Error fetching data from API' })
    }

    const { exercises } = await apiRes.json()

    if (!Array.isArray(exercises)) {
      return res.status(400).json({ error: 'Expected an array in "exercises"' })
    }

    let count = 0
    for (const ex of exercises) {
      await prisma.exercises.create({
        data: {
          name: ex.name || null,
          description: ex.description || null,
          steps: ex.steps || [],
          equipment: ex.equipment || null,
          image: ex.image || null,
          gif: ex.gif || null,
          video: ex.video || null,
          alternatives: ex.alternatives || [],
          target: ex.target || {},
        },
      })
      count++
    }

    return res.status(200).json({ success: true, count })
  } catch (error) {
    console.error('Internal error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
