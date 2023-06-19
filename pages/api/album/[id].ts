// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ZingMp3 } from 'zingmp3-api-full'
import { ZingMp3Response } from '../../types/ZingMP3Response.type'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ZingMp3Response>
) {
    const id  = req.query.id
    await ZingMp3.getDetailPlaylist(id as string).then((data: ZingMp3Response) => {
      res.json(data)
    })
    res.end()
}