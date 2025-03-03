const getJobs = async (req: Request, res: Response) => promise<void>{
    try {
        const jobs = await Jobs.find();
        res.json(jobs);
    } catch (error) {
        res.json({ message: error });
    }
    };

export { getJobs };