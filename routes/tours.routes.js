import express from 'express'
import { filterTours, getMonthlyPlan, getToursStats, getAllTours, aliasTopTours, getTourById, createTour, modifyTourById, deleteTourById, getTourByComparative } from '../controllers/tours.controller.js'

const tourRouter = express.Router()

tourRouter.route('/top-5-cheap')
    .get(aliasTopTours, getAllTours)

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter
    .route('/tour-stats')
    .get(getToursStats)

tourRouter
    .route('/monthly-plan/:year')
    .get(getMonthlyPlan)

tourRouter
    .route('/filter')
    .get(filterTours)
    
tourRouter
    .route('/:id')
    .get(getTourById)
    .put(modifyTourById)
    .delete(deleteTourById)

// tourRouter
//     .route("/compare")
//     .get(getTourByComparative);

export { tourRouter }