import TourService from "../services/tours.service.js";
import AuthService from "../services/auth.service.js";
import { Tour } from "../models/tour.model.js"; 

const tourService = new TourService();
const authService = new AuthService();

export const getAllTours = async (req, res) => {
    try {
        const allTours = await Tour.find();

        res.status(200).json({
            status: "success",
            results: allTours.length,
            data: { allTours }
        });
    }
    catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
}

export const createTour = async (req, res) => {
    try {
        const connectedUserData = authService.verifyToken(req, res);
        if(connectedUserData === null || authService.checkRole(data, "admin") || as.checkRole(data, "moderator")) 
            res.status(400).send("Accès refusé : vous n'êtes ni admin ni modo !");

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

export const getTourById = async (req, res) => {
    try {
        const tour = await Tour.find({id: req.params.id});

        if(tour.length > 0) {
            res.status(200).json({
                status: "success",
                data: { tour }
            });
        } else {
            res.status(404).json({
                status: "notfound"
            });
        }
    }
    catch {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

export const getTourByComparative = async (req, res) => {
    try {
        const query = {...req.query}
        console.log(query)
        const tour = null;
        console.log(query.sort === "lt")
        if(query.sort === "lt") {
            tour = await Tour.findOne().where('maxGroupSize').lt(query.maxGroupSize);
            console.log("finished")
        } else if (query.sort === "gt") {
            tour = await Tour.findOne().where('maxGroupSize').gt(query.maxGroupSize);
        }
    }
    catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
}

export const modifyTourById = (req, res) => {
    const connectedUserData = authService.verifyToken(req, res);
    if(connectedUserData === null || as.checkRole(data, "moderator") || as.checkRole(data, "admin")) 
        res.status(400).send("Accès refusé car vous n'êtes ni admin ni modo");

    const valid = tourService.changeTourPut(req.params.id, req.body);

    if(valid) {
        res.status(204).json({
            status: "success"
        });
    } else {
        res.status(500).json({
            status: "error"
        });
    }
}

export const deleteTourById = (req, res) => {
    const connectedUserData = authService.verifyToken(req, res);
    if(connectedUserData === null || authService.checkRole(data, "admin") || as.checkRole(data, "moderator")) 
        res.status(400).send("Accès refusé : vous n'êtes ni admin ni modo !");

    const valid = tourService.deleteTourFromFile(req.params.id);

    if(valid) {
        res.status(204).json({
            status: "success"
        });
    } else {
        res.status(500).json({
            status: "error"
        });
    }
}

// ci-dessous correction yacoubi
export const getToursStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    //_id: null,
                    _id: { $toUpper: '$difficulty' },
                    num: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $sort: {
                    avgPrice: 1 //ascending
                }
            }
        ])
        res.status(200).json({
            status: "success",
            data:
                stats
        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }

}

export const getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates',
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numToursStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numToursStarts: -1 }
            }
        ])

        res.status(200).json({
            status: "success",
            data: { plan }

        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
}

export const aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

export const filterTours = async (req, res) => {
    try {

        const queryString = req.query
        console.log(queryString)

        const queryOptions = {};
        if (queryString.limit) queryOptions.limit = parseInt(queryString.limit) || 0
        if (queryString.sort) queryOptions.sort = queryString.sort || ''; // Set sort field if provided
        if (queryString.fields) queryOptions.fields = queryString.fields.split(',').join(' ') || ''; // Set fields to include if provided
        console.log("queryOptions", queryOptions)

        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryString[el]);

        const tours = await Tour.find(queryString).sort(queryOptions.sort).limit(queryOptions.limit);
        return res.status(200).send({ message: "success!", data: tours })
    } catch (error) {
        return res.status(500).send({ message: "Error Occured!", error: error.message })
    }
}

