import conn from './db'

export default async function handler(req, res) {
  
    
    const result = await conn.query('select * from charities;')
    
    res.status(200).json({ data: result.rows })
  
}