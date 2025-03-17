const getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs = await Jobs.find();
        res.json(jobs);
    } catch (error) {
        res.json({ message: error });
    }
    };

export default getJobs;