const Book = require('../models/Book')

const getAllBooks = (req, res, next) => {

    // try{
    //     const books = await Book.find()
    //     res.jsons(books)

    // }catch(error){
    //     console.log(err)
    // }

    Book.find()
        .then(books => res.json(books))
        // .catch(err => res.log(err))
        .catch(next)
}

const createBook = (req, res, next) => {
    // if(!req.body.title){                       // provide error message 
    //     return res.status(400).json({error: "title is missing"})
    // }
    // const book = {
    //     id : books.length + 1,                 //add a book with title and author name to the previous list of book
    //     title: req.body.title,
    //     author: req.body.author || 'Anonymous'
    // }
    // books.push(book)
    // res.status(201).json(book)

    Book.create(req.body)
        .then((book) => res.status(201).json(book))
        .catch(err => next(err))
}

const deleteAllBooks = ((res, req, next) => {
    Book.deleteMany()
        .then(reply => res.json(reply))
        // .catch(err => console.log(err))
        .catch(next)
})

//booki id 

const getABook = (req, res, next) => {
    // const book_id = Number(req.params.book_id)
    // const book= books.find((b) =>b.id ===book_id)
    // res.json(book)

    Book.findById(req.params.book_id)
        .then((book) => {
            if (!book) {
                let err = new Error('book not found')
                res.status(404).json({ error: 'book not found' })
            }
            res.json(book)
        })
        // .catch(err => console.log(err))
        .catch(next)

}

const updateABook = (req, res, next) => {
    // const updated_books = books.map((b)=>{
    // if(b.id == req.params.book_id){
    //     b.title = req.body.title
    //     b.author = req.body.author
    // }
    // return b
    // })
    // res.json(updated_books)

    Book.findByIdAndUpdate(
        req.params.book_id,
        { $set: req.body },
        { new: true }
    ).then(updated => res.json(updated))
        // .catch(err => console.log(err))
        .catch(next)
}

const deleteABOOK = (req, res, next) => {
    // const updated_books = books.filter((b) => {
    // if (b.id !=req.params.book_id) return b
    // })
    // res.json(updated_books)

    Book.findByIdAndDelete(req.params.book_id)
        .then(reply => res.json(reply))
        // .then(reply => res.status(204).end())
        // .catch(err => console.log(err))
        .catch(next)
}

module.exports = {
    getAllBooks,
    createBook,
    deleteAllBooks,
    getABook,
    updateABook,
    deleteABOOK
}