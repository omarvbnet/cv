import { getXataClient } from '../../utils/xata.codegen'

const handler = async (req, res) => {

    try {
        const xata = getXataClient()

        const record = await xata.db.experiance.create({
            Public_id: req.body.Public_id,
            Job_Title_Ex: req.body.Job_Title_Ex,
            City_town_Ex: req.body.City_town_Ex,
            Employer_Ex: req.body.Employer_Ex,
            Start_date_ex: req.body.Start_date_ex,
            End_Date_Ex: req.body.End_date_Ed,
            Achievement_one_Ex: req.body.Achievement_one_Ex,  

        })

        return res.status(201).json(record)

    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }










}
export default handler
