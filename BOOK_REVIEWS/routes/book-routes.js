const express = require('express')
const Book = require('../models/Book')

const router = express.Router()

const bookController = require("../controllers/book_controllers")
const reviewController = require("../controllers/review_controller")
const { verifyAdmin } = require('../middlewares/auth')

router.route('/')
    .get(bookController.getAllBooks)

    .post(verifyAdmin,bookController.createBook)

    .put((req,res) =>{
        res.status(405).json({error: "PUT request is not allowed"})
    })

    .delete(verifyAdmin, bookController.deleteAllBooks)



//classwork implement these routes book_id

router.route('/:book_id')
    .get(bookController.getABook)

    .post((req, res) =>{
        res.status(405).json({error: "POST request is not allowed"})

    })

    .put(bookController.updateABook)


    .delete(bookController.deleteABOOK)


    //REVIEWS

    router.route('/:book_id/reviews')
    .get(reviewController.getAllReviews)

    .post(reviewController.createReview)

    .put((req,res) =>{
        res.status(405).json({error: "PUT request is not allowed"})
    })

    .delete(reviewController.deleteAllReviews)


    //REVIEWS_ID

    router.route('/:book_id/reviews/:review_id')

    .get(reviewController.getReviewById)


    // POST hudaina 

    // .post((req, res) =>{
    //     res.status(405).json({error: "POST request is not allowed"})

    // })

    .put(reviewController.updateReviewById)

    .delete(reviewController.deleteReviewById)


module.exports = router
