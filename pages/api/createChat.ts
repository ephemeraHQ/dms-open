import { Request, Response } from 'express'
import db from '../../utils/db'

const handler = async (req: Request, res: Response): Promise<void> => {

  const { user_one_address }: { user_one_address: string } = req.body

  const doc = await db.collection('Chat').add({
    user_one_address,
    user_one_has_left: false,
  })

  res.status(200).json({ document_id: doc.id })
}

export default handler;
